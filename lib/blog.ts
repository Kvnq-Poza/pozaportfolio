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

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  contentHtml?: string;
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      tags: matterResult.data.tags || [],
      ...(matterResult.data as {
        title: string;
        date: string;
        excerpt: string;
      }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const matterResult = matter(fileContents);

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

  return {
    slug,
    contentHtml,
    tags: matterResult.data.tags || [],
    ...(matterResult.data as { title: string; date: string; excerpt: string }),
  };
}
