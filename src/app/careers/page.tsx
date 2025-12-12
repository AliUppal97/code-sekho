"use client";

import { Briefcase, Send, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Badge, Button } from "@/components/ui";

const ROLES = [
  { title: "Senior Frontend Engineer", location: "Remote", type: "Full-time" },
  { title: "Senior Backend Engineer", location: "Remote", type: "Full-time" },
  { title: "Curriculum Engineer (DSA/System Design)", location: "Hybrid - Lahore", type: "Contract" },
  { title: "Product Designer", location: "Remote", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Build the future of tech education"
        description="Join an outcomes-obsessed team crafting enterprise-grade learning experiences for the next generation of engineers."
        actions={
          <Button size="lg" asChild>
            <Link href="mailto:talent@codesekho.com">Email your resume</Link>
          </Button>
        }
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <Card className="p-6 lg:p-8 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
            <Sparkles className="h-4 w-4" /> Why CodeSekho
          </div>
          <p className="text-lg font-semibold text-dark-900">Ship impact, not tickets.</p>
          <p className="text-dark-600">
            We move fast, own outcomes, and design for global learners. Expect clear goals, thoughtful reviews, and
            real autonomy. Competitive compensation, remote-friendly, and a culture that values craft.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {ROLES.map((role) => (
            <Card key={role.title} className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-dark-900">{role.title}</p>
                  <div className="flex items-center gap-2 text-sm text-dark-500 mt-1">
                    <MapPin className="h-4 w-4" /> {role.location}
                  </div>
                </div>
                <Badge variant="secondary">{role.type}</Badge>
              </div>
              <Button size="sm" asChild>
                <Link href="mailto:talent@codesekho.com?subject=Career%20Application">Apply</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

