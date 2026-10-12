import { getPostData, getAllPostSlugs, getSortedPostsData } from "@/lib/blog";
import { CalendarDays, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { POZA_DATA, SITE } from "@/lib/constants";
import {
  absoluteUrl,
  breadcrumbSchema,
  graph,
  PERSON_ID,
  WEBSITE_ID,
} from "@/lib/seo";

export async function generateStaticParams() {
  return getAllPostSlugs().map((p) => p.params);
}

// Scheduled posts aren't in generateStaticParams yet; they render on first
// request once their date passes (getPostData throws, so notFound, until then)
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const postData = await getPostData(slug);
    const path = `/blog/${slug}`;
    return {
      title: postData.title,
      description: postData.excerpt,
      keywords: postData.tags,
      authors: [{ name: POZA_DATA.name, url: SITE.url }],
      alternates: { canonical: path },
      ...(postData.noindex && { robots: { index: false, follow: true } }),
      openGraph: {
        type: "article",
        url: path,
        title: postData.title,
        description: postData.excerpt,
        publishedTime: postData.date,
        modifiedTime: postData.updated || postData.date,
        authors: [SITE.url],
        tags: postData.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: postData.title,
        description: postData.excerpt,
      },
    };
  } catch (e) {
    return {
      title: "Post Not Found",
    };
  }
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let postData;
  try {
    postData = await getPostData(slug);
  } catch (e) {
    notFound();
  }

  const allPosts = getSortedPostsData();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.tags.some((t) => postData.tags.includes(t)))
    .slice(0, 2);

  const postUrl = absoluteUrl(`/blog/${slug}`);
  const wordCount = (postData.contentHtml || "")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <JsonLd
        data={graph(
          {
            "@type": "BlogPosting",
            "@id": `${postUrl}#article`,
            mainEntityOfPage: postUrl,
            url: postUrl,
            headline: postData.title,
            description: postData.excerpt,
            image: postData.cover
              ? [absoluteUrl(postData.cover), `${postUrl}/opengraph-image`]
              : `${postUrl}/opengraph-image`,
            datePublished: postData.date,
            dateModified: postData.updated || postData.date,
            keywords: postData.tags.join(", "),
            wordCount,
            inLanguage: "en",
            author: { "@id": PERSON_ID, name: POZA_DATA.name, url: SITE.url },
            publisher: { "@id": PERSON_ID },
            isPartOf: { "@id": WEBSITE_ID },
          },
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: postData.title, path: `/blog/${slug}` },
          ])
        )}
      />
      <article className="container mx-auto px-4 max-w-3xl">
        <Button
          asChild
          variant="ghost"
          className="mb-12 group -ml-4 text-muted-foreground hover:text-primary transition-all duration-300"
        >
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </Button>

        <header className="space-y-6 mb-16">
          <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground flex-wrap">
            <div className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              {postData.scheduled ? "Scheduled" : "Article"}
            </div>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <CalendarDays className="h-4 w-4" />
            <time dateTime={postData.date}>
              {new Date(postData.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] bg-clip-text bg-gradient-to-b from-foreground to-foreground/80">
            {postData.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium italic border-l-4 border-primary/20 pl-4 sm:pl-6 py-2">
            {postData.excerpt}
          </p>
          {postData.cover && (
            <img
              src={postData.cover}
              alt={postData.coverAlt || ""}
              className="w-full aspect-video object-cover rounded-2xl border border-primary/10 shadow-lg"
              fetchPriority="high"
            />
          )}
        </header>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* ===== BUTTONS & LINKS ===== */
          
          /* Explicit button syntax: [button:Text](url) */
          .prose .md-button, .prose .md-button-auto {
            text-decoration: none !important;
            transition: all 0.2s ease !important;
          }
          
          .prose .md-button:hover, .prose .md-button-auto:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }

          .prose .md-button:active, .prose .md-button-auto:active {
            transform: translateY(0);
          }

          .prose .button-wrapper {
            margin: 1.75rem 0;
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          /* Explicit link syntax: [link:Text](url) */
          .prose .md-link {
            color: hsl(var(--primary)) !important;
            font-weight: 600;
            text-decoration: underline !important;
            text-underline-offset: 4px;
            border-bottom: 2px solid hsl(var(--primary) / 0.4);
            transition: all 0.2s ease;
            padding-bottom: 2px;
            position: relative;
          }

          .prose .md-link::before {
            content: "→";
            margin-right: 0.25rem;
            transition: transform 0.2s ease;
            display: inline-block;
          }

          .prose .md-link:hover {
            color: hsl(var(--primary) / 0.8) !important;
            border-bottom-color: hsl(var(--primary));
          }

          .prose .md-link:hover::before {
            transform: translateX(3px);
          }

          /* Regular inline links */
          .prose a:not(.md-button):not(.md-button-auto):not(.md-link) {
            color: hsl(var(--primary));
            font-weight: 600;
            text-decoration: underline;
            text-decoration-color: hsl(var(--primary) / 0.3);
            text-underline-offset: 3px;
            transition: all 0.2s ease;
          }

          .prose a:not(.md-button):not(.md-button-auto):not(.md-link):hover {
            color: hsl(var(--primary) / 0.8);
            text-decoration-color: hsl(var(--primary));
            text-decoration-thickness: 2px;
          }

          @media (max-width: 640px) {
            .prose .md-button,
            .prose .md-button-auto {
              width: 100%;
              padding: 0.75rem 1.5rem;
            }
            
            .prose .button-wrapper {
              flex-direction: column;
            }
          }

          /* ===== HEADINGS ===== */
          .prose h1 a, .prose h2 a, .prose h3 a, .prose h4 a, .prose h5 a, .prose h6 a {
            text-decoration: none !important;
          }

          .prose h1 {
            font-size: 2.25rem;
            font-weight: 800;
            line-height: 1.2;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            color: hsl(var(--foreground));
            letter-spacing: -0.025em;
            padding-bottom: 0.75rem;
            border-bottom: 3px solid hsl(var(--primary) / 0.2);
          }

          .prose h2 {
            font-size: 1.875rem;
            font-weight: 800;
            line-height: 1.3;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            color: hsl(var(--foreground));
            letter-spacing: -0.02em;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid hsl(var(--primary) / 0.15);
          }

          .prose h3 {
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 1.4;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: hsl(var(--foreground));
            letter-spacing: -0.015em;
          }

          .prose h4 {
            font-size: 1.25rem;
            font-weight: 700;
            line-height: 1.5;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
            color: hsl(var(--foreground));
          }

          .prose h5 {
            font-size: 1.125rem;
            font-weight: 600;
            line-height: 1.5;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: hsl(var(--foreground));
          }

          .prose h6 {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.5;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: hsl(var(--muted-foreground));
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          @media (max-width: 640px) {
            .prose h1 { font-size: 1.875rem; margin-top: 2rem; }
            .prose h2 { font-size: 1.5rem; margin-top: 2rem; }
            .prose h3 { font-size: 1.25rem; margin-top: 1.5rem; }
            .prose h4 { font-size: 1.125rem; margin-top: 1.25rem; }
          }

          /* ===== PARAGRAPHS ===== */
          .prose p {
            margin-top: 1.25rem;
            margin-bottom: 1.25rem;
            line-height: 1.75;
            color: hsl(var(--muted-foreground) / 0.9);
          }

          /* ===== CALLOUTS ===== */
          .callout-block {
            background: hsl(var(--primary) / 0.05);
            border: 2px solid hsl(var(--primary) / 0.2);
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 2rem 0;
          }
          
          .callout-title {
            color: hsl(var(--primary));
            font-weight: 700;
            font-size: 1.125rem;
            margin-bottom: 0.75rem;
          }
          
          .callout-content {
            color: hsl(var(--muted-foreground));
            line-height: 1.75;
          }

          /* ===== LISTS ===== */
          .prose ul, .prose ol {
            margin: 1.5rem 0;
            padding-left: 1.75rem;
          }

          .prose ul {
            list-style-type: none;
          }

          .prose ul > li {
            position: relative;
            padding-left: 0.5rem;
            margin: 0.75rem 0;
            line-height: 1.75;
          }

          .prose ul > li::before {
            content: "▸";
            position: absolute;
            left: -1.25rem;
            color: hsl(var(--primary));
            font-weight: 700;
            font-size: 1.1em;
          }

          .prose ol {
            list-style-type: none;
            counter-reset: item;
          }

          .prose ol > li {
            position: relative;
            padding-left: 0.5rem;
            margin: 0.75rem 0;
            line-height: 1.75;
            counter-increment: item;
          }

          .prose ol > li::before {
            content: counter(item) ".";
            position: absolute;
            left: -1.75rem;
            color: hsl(var(--primary));
            font-weight: 700;
            font-size: 0.95em;
          }

          /* ===== TABLES ===== */
          .prose table {
            border-collapse: collapse;
            width: 100%;
            margin: 2rem 0;
            font-size: 0.95rem;
            display: block;
            overflow-x: auto;
          }

          .prose th {
            border: 1px solid hsl(var(--primary) / 0.2);
            background: hsl(var(--primary) / 0.08);
            padding: 0.875rem;
            text-align: left;
            font-weight: 700;
            white-space: nowrap;
          }

          .prose td {
            border: 1px solid hsl(var(--primary) / 0.1);
            padding: 0.875rem;
          }

          @media (max-width: 768px) {
            .prose table {
              font-size: 0.875rem;
            }
            .prose th, .prose td {
              padding: 0.625rem 0.5rem;
              min-width: 100px;
            }
          }

          /* ===== CODE ===== */
          .prose code {
            color: hsl(var(--primary));
            background: hsl(var(--primary) / 0.1);
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.875em;
            font-weight: 500;
            border: 1px solid hsl(var(--primary) / 0.2);
          }

          .prose pre {
            background: hsl(var(--muted) / 0.5);
            border: 1px solid hsl(var(--primary) / 0.15);
            border-radius: 1rem;
            padding: 1.5rem;
            overflow-x: auto;
            margin: 2rem 0;
          }

          .prose pre code {
            background: transparent;
            padding: 0;
            border: none;
            font-size: 0.875rem;
          }

          /* ===== BLOCKQUOTES ===== */
          .prose blockquote {
            border-left: 4px solid hsl(var(--primary));
            background: hsl(var(--primary) / 0.05);
            padding: 1.25rem 1.5rem;
            margin: 2rem 0;
            border-radius: 0 1rem 1rem 0;
            font-style: italic;
          }

          .prose blockquote p {
            margin: 0.5rem 0;
          }

          /* ===== IMAGES ===== */
          .prose img {
            border-radius: 1rem;
            box-shadow: 0 10px 40px -10px hsl(var(--foreground) / 0.2);
            margin: 2rem auto;
            max-width: 100%;
            height: auto;
          }

          /* Standalone markdown images render as <figure>; the title is the caption */
          .prose .md-figure {
            margin: 2.5rem 0;
          }

          .prose .md-figure img {
            margin: 0 auto;
          }

          /* An image inside running text (an icon or badge) stays inline at text size */
          .prose p img {
            display: inline-block;
            height: 1.25em;
            width: auto;
            margin: 0 0.15em;
            vertical-align: -0.25em;
            border-radius: 0.25rem;
            box-shadow: none;
          }

          .prose figcaption {
            margin-top: 0.875rem;
            text-align: center;
            font-size: 0.875rem;
            line-height: 1.5;
            color: hsl(var(--muted-foreground));
          }

                    /* ===== HORIZONTAL RULE ===== */
          .prose hr {
            border: none;
            border-top: 2px solid hsl(var(--primary) / 0.1);
            margin: 3rem 0;
          }

          /* ===== STRONG & EM ===== */
          .prose strong {
            color: hsl(var(--foreground));
            font-weight: 700;
          }

          .prose em {
            font-style: italic;
          }
        `,
          }}
        />

        <div
          className="prose prose-lg dark:prose-invert max-w-none overflow-hidden"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
        />

        {relatedPosts.length > 0 && (
          <section className="mt-24 pt-12 border-t border-primary/10">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="group"
                >
                  <Card className="h-full transition-all duration-300 hover:border-primary/20 hover:shadow-lg bg-card/50">
                    <CardHeader>
                      <div className="text-xs text-muted-foreground mb-2">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
