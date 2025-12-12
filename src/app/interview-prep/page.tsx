"use client";

import Link from "next/link";
import { Lightbulb, ShieldCheck, Users, ArrowRight, Target } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Badge, Button } from "@/components/ui";

const TRACKS = [
  {
    title: "By Subject",
    description: "Structured pathways for data structures, algorithms, system design, and core CS.",
    href: "/interview-prep/subjects",
    tag: "Foundations",
  },
  {
    title: "By Company",
    description: "Company-specific prep for top product and engineering orgs with real patterns.",
    href: "/interview-prep/companies",
    tag: "Targeted",
  },
  {
    title: "Mock Interviews",
    description: "Live interviewer sessions with scorecards, feedback, and recordings.",
    href: "/dashboard/interview-prep",
    tag: "Practice",
  },
];

export default function InterviewPrepPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Interview Prep"
        title="Crack interviews with senior-engineer guidance"
        description="Outcome-focused prep with targeted drills, mock interviews, and system design coaching. Aligned to what top companies actually ask."
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="/signup">Start prepping</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses/4">View DSA path</Link>
            </Button>
          </>
        }
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="grid md:grid-cols-3 gap-6">
          {TRACKS.map((track) => (
            <Card key={track.title} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-dark-900">{track.title}</h3>
                <Badge variant="secondary">{track.tag}</Badge>
              </div>
              <p className="text-sm text-dark-600">{track.description}</p>
              <Button size="sm" variant="ghost" className="px-0" asChild>
                <Link href={track.href}>
                  Explore <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-6 lg:p-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">Enterprise-level rigor</Badge>
            <h2 className="text-2xl font-semibold text-dark-900">What makes our prep different</h2>
            <ul className="space-y-3 text-dark-600">
              <li className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary-600 mt-0.5" />
                Pattern-based drills that mirror real interviews, not generic problem sets.
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary-600 mt-0.5" />
                System design blueprints with trade-offs, SLAs, and failure handling.
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary-600 mt-0.5" />
                Mock interviews with senior engineers and actionable scorecards.
              </li>
              <li className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary-600 mt-0.5" />
                Company-specific patterns for product giants, startups, and fintech.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <Card className="p-5 border-dashed border-primary-200 bg-primary-50/50">
              <h3 className="text-lg font-semibold text-dark-900">Ready to practice?</h3>
              <p className="text-sm text-dark-600">
                Jump into a mock interview or pick a targeted drill set. Everything is tracked in your dashboard.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button asChild>
                  <Link href="/dashboard/interview-prep">Open dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/courses/5">System design path</Link>
                </Button>
              </div>
            </Card>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
