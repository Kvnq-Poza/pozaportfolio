import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import highlightjs from "markdown-it-highlightjs";
import anchor from "markdown-it-anchor";
import multimdTable from "markdown-it-multimd-table";
import container from "markdown-it-container";
import { buttonVariants } from "@/components/ui/button";

const postsDirectory = path.join(process.cwd(), "blog-posts");

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
})
  .use(highlightjs)
  .use(anchor, {
    permalink: anchor.permalink.headerLink(),
  })
  .use(multimdTable, {
    multiline: true,
    rowspan: true,
    headerless: false,
  })
  .use(container as any, "callout", {
    validate: function (params: string) {
      return params.trim().match(/^callout\s+(.*)$/);
    },
    render: function (tokens: any[], idx: number) {
      const m = tokens[idx].info.trim().match(/^callout\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        const title = m && m[1] ? m[1] : "";
        return `<div class="callout-block not-prose p-6 rounded-2xl bg-primary/5 border-2 border-primary/20 my-8 shadow-sm">
          ${
            title
              ? `<div class="callout-title text-primary font-bold text-lg mb-3 flex items-center gap-2">${md.utils.escapeHtml(
                  title
                )}</div>`
              : ""
          }
          <div class="callout-content text-muted-foreground leading-relaxed">
        `;
      } else {
        return "</div></div>\n";
      }
    },
  });

// Images: lazy-load everything, and promote an image that sits alone in a
// paragraph to a <figure>. Its markdown title becomes the caption:
//   ![Alt text](/blog/my-post/shot.png "Caption shown under the image")
md.core.ruler.push("figures", (state) => {
  const tokens = state.tokens;
  for (let i = 1; i < tokens.length - 1; i++) {
    const inline = tokens[i];
    if (
      inline.type !== "inline" ||
      tokens[i - 1].type !== "paragraph_open" ||
      tokens[i + 1].type !== "paragraph_close"
    ) {
      continue;
    }
    const children = (inline.children || []).filter(
      (t) => !(t.type === "text" && t.content.trim() === "")
    );
    if (children.length !== 1 || children[0].type !== "image") continue;

    tokens[i - 1].tag = "figure";
    tokens[i - 1].attrJoin("class", "md-figure");
    tokens[i + 1].tag = "figure";
    children[0].meta = { ...(children[0].meta || {}), figure: true };
  }
});

md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const caption = token.attrGet("title");
  token.attrSet("alt", self.renderInlineAsText(token.children || [], options, env));
  token.attrSet("loading", "lazy");
  token.attrSet("decoding", "async");

  if (token.meta?.figure && caption) {
    // The caption replaces the title tooltip
    token.attrs = (token.attrs || []).filter(([name]) => name !== "title");
    return `<img${self.renderAttrs(token)}><figcaption>${md.utils.escapeHtml(
      caption
    )}</figcaption>`;
  }
  return `<img${self.renderAttrs(token)}>`;
};

// The post page renders the title as the only <h1>; demote markdown `#` headings to <h2>
md.core.ruler.push("demote_h1", (state) => {
  for (const token of state.tokens) {
    if (
      (token.type === "heading_open" || token.type === "heading_close") &&
      token.tag === "h1"
    ) {
      token.tag = "h2";
    }
  }
});

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  // Optional frontmatter `updated: "YYYY-MM-DD"` feeds dateModified / og:modified_time
  updated?: string;
  // Optional frontmatter `cover` (a path under /public) and `coverAlt`
  cover?: string;
  coverAlt?: string;
  // Optional frontmatter `draft: true` keeps a post out of production entirely
  draft?: boolean;
  // Optional frontmatter `noindex: true` keeps a published post out of search
  // results and the sitemap (for thin posts like intros)
  noindex?: boolean;
  // Derived: true when the post is a draft or dated in the future
  scheduled: boolean;
  contentHtml?: string;
}

// Posts go live on their `date`, in Lagos time. The blog routes, feed and
// sitemap revalidate hourly, so a scheduled post appears without a redeploy.

function todayInLagos() {
  // en-CA formats as YYYY-MM-DD, which compares correctly as a string
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(
    new Date()
  );
}

// Scheduled posts are visible in `npm run dev` so drafts can be previewed
const showScheduled = process.env.NODE_ENV !== "production";

function toPostData(slug: string, data: Record<string, any>): PostData {
  // gray-matter turns an unquoted YAML date into a Date
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date);
  return {
    ...(data as { title: string; excerpt: string }),
    slug,
    date,
    tags: data.tags || [],
    scheduled: Boolean(data.draft) || date > todayInLagos(),
  };
}

function readAllPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(
        path.join(postsDirectory, fileName),
        "utf8"
      );
      return toPostData(slug, matter(fileContents).data);
    })
    .filter((post) => showScheduled || !post.scheduled);
}

export function getSortedPostsData(): PostData[] {
  return readAllPosts().sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  return readAllPosts().map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
}

// Throws for a missing post, and for a scheduled one in production, so
// callers' existing not-found handling covers both
export async function getPostData(slug: string): Promise<PostData> {
  if (!/^[\w-]+$/.test(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const post = toPostData(slug, matterResult.data);
  if (post.scheduled && !showScheduled) {
    throw new Error(`Post not published yet: ${slug}`);
  }

  let contentHtml = md.render(matterResult.content);

  // Convert button:Text syntax to styled buttons
  const buttonClasses = buttonVariants({ variant: "outline" });
  contentHtml = contentHtml.replace(
    /<a href="([^"]+)">button:([^<]+)<\/a>/g,
    `<a href="$1" class="md-button ${buttonClasses}">$2</a>`
  );

  // Convert link:Text syntax to explicitly styled links
  contentHtml = contentHtml.replace(
    /<a href="([^"]+)">link:([^<]+)<\/a>/g,
    '<a href="$1" class="md-link">$2</a>'
  );

  // Style standalone links in paragraphs as buttons (only if they're the only content)
  contentHtml = contentHtml.replace(
    /<p><a href="([^"]+)"(?: title="[^"]*")?>((?:(?!<a|<\/a>).)+)<\/a><\/p>/g,
    (match, url, text) => {
      // Check if this is already a button or link marker
      if (
        text.includes('class="md-button"') ||
        text.includes('class="md-link"')
      ) {
        return match;
      }
      // Convert standalone links to buttons
      return `<p class="button-wrapper"><a href="${url}" class="md-button-auto ${buttonClasses}">${text}</a></p>`;
    }
  );

  // Wrap custom buttons/links in button-wrapper if they are standalone in a paragraph
  contentHtml = contentHtml.replace(
    /<p>(<a href="[^"]+" class="(?:md-button|md-link)">[^<]+<\/a>)<\/p>/g,
    '<p class="button-wrapper">$1</p>'
  );

  return { ...post, contentHtml };
}
