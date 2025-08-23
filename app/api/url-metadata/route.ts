import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Validate URL
    new URL(url);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MetadataBot/1.0)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract metadata
    const metadata = {
      title: extractTitle($),
      description: extractDescription($),
      image: extractImage($, url),
      favicon: extractFavicon($, url),
      url: url,
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Error fetching URL metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch URL metadata" },
      { status: 500 }
    );
  }
}

function extractTitle($: cheerio.Root): string {
  // Try Open Graph title first
  let title = $('meta[property="og:title"]').attr("content");

  // Try Twitter title
  if (!title) {
    title = $('meta[name="twitter:title"]').attr("content");
  }

  // Fall back to HTML title
  if (!title) {
    title = $("title").text();
  }

  return title?.trim() || "";
}

function extractDescription($: cheerio.Root): string {
  // Try Open Graph description first
  let description = $('meta[property="og:description"]').attr("content");

  // Try Twitter description
  if (!description) {
    description = $('meta[name="twitter:description"]').attr("content");
  }

  // Try standard meta description
  if (!description) {
    description = $('meta[name="description"]').attr("content");
  }

  return description?.trim() || "";
}

function extractImage($: cheerio.Root, baseUrl: string): string {
  // Try Open Graph image first
  let image = $('meta[property="og:image"]').attr("content");

  // Try Twitter image
  if (!image) {
    image = $('meta[name="twitter:image"]').attr("content");
  }

  // Try to find a suitable image in the page
  if (!image) {
    const imgSrc = $("img").first().attr("src");
    if (imgSrc) {
      image = imgSrc;
    }
  }

  // Convert relative URLs to absolute
  if (image && !image.startsWith("http")) {
    try {
      const base = new URL(baseUrl);
      if (image.startsWith("//")) {
        image = base.protocol + image;
      } else if (image.startsWith("/")) {
        image = base.origin + image;
      } else {
        image = new URL(image, baseUrl).href;
      }
    } catch (e) {
      // If URL construction fails, return empty string
      image = "";
    }
  }

  return image || "";
}

function extractFavicon($: cheerio.Root, baseUrl: string): string {
  // Try different favicon selectors
  const faviconSelectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="apple-touch-icon-precomposed"]',
  ];

  let favicon = "";

  for (const selector of faviconSelectors) {
    const href = $(selector).attr("href");
    if (href) {
      favicon = href;
      break;
    }
  }

  // Fallback to default favicon.ico
  if (!favicon) {
    favicon = "/favicon.ico";
  }

  // Convert relative URLs to absolute
  if (favicon && !favicon.startsWith("http")) {
    try {
      const base = new URL(baseUrl);
      if (favicon.startsWith("//")) {
        favicon = base.protocol + favicon;
      } else if (favicon.startsWith("/")) {
        favicon = base.origin + favicon;
      } else {
        favicon = new URL(favicon, baseUrl).href;
      }
    } catch (e) {
      // If URL construction fails, use default
      favicon = new URL(baseUrl).origin + "/favicon.ico";
    }
  }

  return favicon;
}
