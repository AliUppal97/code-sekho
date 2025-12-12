"use client";

import Link from "next/link";
import { LifeBuoy, MessageCircle, BookOpen, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Badge, Input } from "@/components/ui";

const HELP_TOPICS = [
  { title: "Account & access", href: "#", description: "Login issues, SSO, device management." },
  { title: "Courses & progress", href: "#", description: "Enrollments, certificates, progress tracking." },
  { title: "Billing & payments", href: "/account/billing", description: "Invoices, payment methods, refunds." },
  { title: "Interview prep", href: "/interview-prep", description: "Mocks, drills, scoring, and feedback." },
];

export default function HelpCenterPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Help Center"
        title="How can we help?"
        description="Search guides or reach our support team. Average first response time: under 24 hours."
        actions={
          <div className="flex flex-wrap gap-3">
            <Input placeholder="Search help (coming soon)" className="bg-white w-64" />
            <Button asChild>
              <Link href="/contact">Contact support</Link>
            </Button>
          </div>
        }
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          {HELP_TOPICS.map((topic) => (
            <Card key={topic.title} className="p-5 space-y-2">
              <Badge variant="secondary">{topic.title}</Badge>
              <p className="text-sm text-dark-600">{topic.description}</p>
              <Button size="sm" variant="ghost" className="px-0" asChild>
                <Link href={topic.href}>
                  View articles <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}


