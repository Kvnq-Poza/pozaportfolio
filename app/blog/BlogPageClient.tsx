"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  ArrowRight,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostData } from "@/lib/blog";
import { SEARCH_TAGS } from "@/lib/constants";

const POSTS_PER_PAGE = 6;

export default function BlogPageClient({
  allPostsData,
}: {
  allPostsData: PostData[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Get all unique tags and shuffle them once for the session
  const shuffledTags = useMemo(() => {
    const tags = new Set<string>();
    allPostsData.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort(() => 0.5 - Math.random());
  }, [allPostsData]);

  // Select a subset of tags to display, ensuring the selected tag is included
  const displayedTags = useMemo(() => {
    let tags = shuffledTags.slice(0, SEARCH_TAGS);
    if (selectedTag && !tags.includes(selectedTag)) {
      // Replace the last tag with the selected one to maintain the limit
      tags = [...tags.slice(0, Math.max(0, SEARCH_TAGS - 1)), selectedTag];
    }
    return tags.sort();
  }, [shuffledTags, selectedTag]);

  // Keep allTags for filtering logic if needed, or just use allPostsData directly
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allPostsData.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allPostsData]);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return allPostsData.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [allPostsData, searchQuery, selectedTag]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-16 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of code, design, and technology.
          </p>
        </header>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between bg-card/30 p-4 rounded-2xl border border-primary/5 backdrop-blur-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10 bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {displayedTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10"
                }`}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTag && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedTag(null)}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        {paginatedPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {paginatedPosts.map(({ slug, date, title, excerpt, tags }) => (
              <Link href={`/blog/${slug}`} key={slug} className="group flex">
                <Card className="flex flex-col w-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-primary/5 bg-card/50 backdrop-blur-sm group-hover:border-primary/20">
                  <CardHeader className="flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <div className="h-1 w-8 bg-primary/20 rounded-full group-hover:w-12 group-hover:bg-primary/50 transition-all duration-300" />
                    </div>
                    <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wider text-primary/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <CardDescription className="text-base mt-4 line-clamp-3 text-muted-foreground/90 leading-relaxed">
                      {excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all duration-300">
                      Read Article{" "}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/5 text-primary mb-4">
              <Search className="h-8 w-8 opacity-20" />
            </div>
            <h3 className="text-2xl font-bold">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
            >
              Reset all filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-full border-primary/10 hover:bg-primary/5"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 p-0 rounded-full ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-full border-primary/10 hover:bg-primary/5"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
