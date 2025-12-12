"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui";

const FAQS = [
  {
    question: "How does localized pricing work?",
    answer:
      "We detect your region and apply currency + fair regional pricing automatically. You can override currency in your account settings.",
  },
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes. Upgrades are prorated instantly. Downgrades take effect at the next billing cycle.",
  },
  {
    question: "Do you offer team/enterprise plans?",
    answer:
      "Yes. The Team plan includes analytics, cohorts, and a success manager. Contact us for custom SLAs.",
  },
  {
    question: "What is included in interview prep?",
    answer:
      "Targeted drills, mock interviews with feedback, system design patterns, and scorecards in your dashboard.",
  },
  {
    question: "Is there a certificate?",
    answer:
      "Yes. Complete required projects and assessments to earn a shareable certificate for each track.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(FAQS[0]?.question || null);

  return (
    <PageShell>
      <PageHero
        eyebrow="FAQ"
        title="Answers to common questions"
        description="Everything you need to know about pricing, plans, and how CodeSekho works."
        align="center"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-4">
        {FAQS.map((item) => {
          const isOpen = open === item.question;
          return (
            <Card
              key={item.question}
              className="p-4 sm:p-5 cursor-pointer border-dark-100"
              onClick={() => setOpen(isOpen ? null : item.question)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base sm:text-lg font-semibold text-dark-900">{item.question}</p>
                  {isOpen && <p className="text-sm text-dark-600 mt-2">{item.answer}</p>}
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-dark-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            </Card>
          );
        })}
      </section>
    </PageShell>
  );
}

