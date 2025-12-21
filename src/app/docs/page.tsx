"use client";

import Link from "next/link";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Input, Badge } from "@/components/ui";

const DOC_SECTIONS = [
  { title: "Getting started", description: "Set up your account, enroll in courses, and sync devices.", href: "#" },
  { title: "Dashboard", description: "Track progress, schedule mocks, and manage notifications.", href: "#" },
  { title: "Billing", description: "Manage plans, invoices, and payment methods.", href: "/account/billing" },
  { title: "Integrations", description: "Connect calendars, code repos, and SSO (coming soon).", href: "#" },
];

export default function DocsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Docs"
        title="Product documentation"
        description="Everything you need to get productive with CodeSekho. Clear, concise, and kept up to date."
        actions={
          <div className="flex flex-wrap gap-3">
            <Input placeholder="Search docs (coming soon)" className="bg-white w-64" />
            <Button variant="outline" asChild>
              <Link href="/help">Open help center</Link>
            </Button>
          </div>
        }
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {DOC_SECTIONS.map((section) => (
            <Card key={section.title} className="p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{section.title}</Badge>
              </div>
              <p className="text-sm text-dark-600">{section.description}</p>
              <Button size="sm" variant="ghost" className="px-0" asChild>
                <Link href={section.href}>
                  View guide <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}




