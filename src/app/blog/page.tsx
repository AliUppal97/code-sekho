"use client";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Badge, Button } from "@/components/ui";
import { BLOG_POSTS } from "@/lib/data/blog";

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Insights on engineering, learning, and careers"
        description="Actionable guides and playbooks from our instructors and mentors."
        align="center"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Card key={post.slug} className="p-5 space-y-3">
              <Badge variant="secondary" className="w-fit">{post.author}</Badge>
              <h3 className="text-lg font-semibold text-dark-900">{post.title}</h3>
              <p className="text-sm text-dark-600">{post.summary}</p>
              <div className="flex items-center gap-3 text-xs text-dark-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>
              <Button size="sm" variant="ghost" className="px-0" asChild>
                <Link href={`/blog/${post.slug}`}>Read post</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}


