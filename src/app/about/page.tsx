"use client";

import { Sparkles, Users, ShieldCheck, Globe2, LineChart } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Badge } from "@/components/ui";

const VALUES = [
  { title: "Learner-first outcomes", description: "We measure success by career mobility, not watch time.", icon: Sparkles },
  { title: "Industry-grade rigor", description: "Curriculums designed with senior engineers from top teams.", icon: ShieldCheck },
  { title: "Community and coaching", description: "Mentors, code reviews, and accountability to keep you on track.", icon: Users },
  { title: "Global by default", description: "Localized pricing, inclusive design, and accessibility built in.", icon: Globe2 },
  { title: "Continuous improvement", description: "We ship updates weekly based on learner feedback and data.", icon: LineChart },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="We build world-class engineers with outcome-driven learning"
        description="CodeSekho blends expert-led instruction, rigorous projects, and personalized support so learners everywhere can access tech careers."
        align="center"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">Our mission</Badge>
            <h2 className="text-3xl font-bold text-dark-900">Access, rigor, and real outcomes</h2>
            <p className="text-dark-600">
              We exist to unlock tech careers for ambitious learners everywhere. Our programs are built with the same standards
              used at world-class engineering teams—project-based, mentor-supported, and continually improved with real learner data.
            </p>
            <p className="text-dark-600">
              From localized pricing to accessibility and inclusive pedagogy, we design for a global audience so no one is left behind.
            </p>
          </div>
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-dark-900">What sets us apart</h3>
            <ul className="space-y-3 text-dark-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                Senior engineers review every curriculum and code lab.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                Currency-aware pricing and flexible plans for global learners.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                Accessibility-first design with responsive, performant experiences.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                Career support—mock interviews, portfolio reviews, and referrals.
              </li>
            </ul>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map((value) => (
            <Card key={value.title} className="p-5 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
                <value.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-dark-900">{value.title}</h3>
              <p className="text-sm text-dark-600">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

