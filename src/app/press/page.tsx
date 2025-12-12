"use client";

import Link from "next/link";
import { Newspaper, Download, Mail, Image, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Badge } from "@/components/ui";

export default function PressPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Press"
        title="Press resources and media"
        description="Download our press kit, brand assets, and find the right contacts for media inquiries."
        actions={
          <Button size="lg" asChild>
            <Link href="mailto:press@codesekho.com">Contact press</Link>
          </Button>
        }
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
              <Newspaper className="h-4 w-4" /> Press kit
            </div>
            <p className="text-lg font-semibold text-dark-900">Logos, product shots, bios</p>
            <p className="text-sm text-dark-600">High-res assets and guidelines for use in articles and coverage.</p>
            <Button size="sm" variant="outline" asChild>
              <Link href="#">Download kit</Link>
            </Button>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
              <Mail className="h-4 w-4" /> Media inquiries
            </div>
            <p className="text-lg font-semibold text-dark-900">Interviews or quotes</p>
            <p className="text-sm text-dark-600">Reach our communications team for commentary or data requests.</p>
            <Button size="sm" asChild>
              <Link href="mailto:press@codesekho.com">Email press</Link>
            </Button>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}

