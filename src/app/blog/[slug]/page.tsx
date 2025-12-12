"use client";

import { useParams, notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Badge } from "@/components/ui";
import { BLOG_POSTS } from "@/lib/data/blog";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) notFound();

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title={post.title}
        description={post.summary}
        actions={
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to blog
            </Link>
          </Button>
        }
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm text-dark-500">
            <Badge variant="secondary" className="w-fit">{post.author}</Badge>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
          <p className="text-dark-700 leading-relaxed">
            This is a placeholder article. Replace with your CMS content or markdown. Use this template to
            ensure typography, spacing, and layouts align with the rest of the site. Keep paragraphs short and
            scannable, add subheadings, code snippets, and callouts as needed.
          </p>
          <p className="text-dark-700 leading-relaxed">
            For production, wire this page to your CMS or markdown loader, keeping the layout and metadata intact
            for SEO and social cards.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}

