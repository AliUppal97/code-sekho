"use client";

import Link from "next/link";
import { Briefcase, ArrowRight, Building2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Badge, Button } from "@/components/ui";
import { INTERVIEW_COMPANIES } from "@/lib/constants";

export default function InterviewCompaniesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Interview Prep"
        title="Company-specific interview prep"
        description="Curated drills and patterns used by leading companies. Practice against the bar you want to reach."
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {INTERVIEW_COMPANIES.map((company) => (
            <Card key={company.id} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-dark-50 flex items-center justify-center">
                    <span className="text-sm font-semibold text-dark-800">{company.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-dark-900">{company.name}</p>
                    <p className="text-sm text-dark-500">{company.courseCount} courses</p>
                  </div>
                </div>
                <Badge variant="secondary">₹{company.expectedSalary} avg</Badge>
              </div>
              <p className="text-sm text-dark-600">
                Prep for {company.name} with company-specific drills, patterns, and mock interview blueprints.
              </p>
              <div className="flex items-center gap-3">
                <Button size="sm" asChild>
                  <Link href={`/dashboard/interview-prep/companies/${company.slug}`}>
                    Start prep
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" className="px-0" asChild>
                  <Link href={`/dashboard/interview-prep/companies/${company.slug}`}>
                    View track <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-primary-600 font-semibold">Company bar ready</p>
            <h3 className="text-xl font-semibold text-dark-900">Practice on real-world scenarios</h3>
            <p className="text-sm text-dark-600">
              From system design prompts to behavioral frameworks, we align you to the expectations of each company.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/interview-prep">
              Open prep dashboard <Briefcase className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </Card>
      </section>
    </PageShell>
  );
}
