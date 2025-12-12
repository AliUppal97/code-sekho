"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Badge, Button } from "@/components/ui";
import { INTERVIEW_SUBJECTS } from "@/lib/constants";

export default function InterviewSubjectsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Interview Prep"
        title="Master core subjects with targeted prep"
        description="Deep dives, drills, and labs for each subject area so you can tackle interviews with confidence."
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {INTERVIEW_SUBJECTS.map((subject) => (
            <Card key={subject.id} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={subject.color.replace("bg-", "text-")}>
                    {subject.courseCount} courses
                  </Badge>
                  <Badge variant="secondary">{subject.name}</Badge>
                </div>
              </div>
              <p className="text-sm text-dark-600">
                Focused drills, curated problem sets, and system walkthroughs for {subject.name}.
              </p>
              <div className="flex items-center gap-3">
                <Button size="sm" asChild>
                  <Link href={`/dashboard/interview-prep/subjects/${subject.slug}`}>
                    Start track
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" className="px-0" asChild>
                  <Link href={`/dashboard/interview-prep/subjects/${subject.slug}`}>
                    View details <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-primary-600 font-semibold">Outcome-focused</p>
            <h3 className="text-xl font-semibold text-dark-900">Track progress with real projects and mock interviews</h3>
            <p className="text-sm text-dark-600">
              Every subject integrates with your dashboard so you can practice, submit solutions, and book mocks.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/interview-prep">
              Open dashboard <BookOpen className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </Card>
      </section>
    </PageShell>
  );
}

