"use client";

import { Scale, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui";

const TERMS_POINTS = [
  "Use of CodeSekho is governed by these terms and applicable local laws.",
  "Accounts are personal; sharing or reselling access is prohibited.",
  "Refunds follow the policy stated in the Refund Policy page.",
  "We may update content and features; material changes to terms will be communicated.",
];

export default function TermsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Understand your rights and responsibilities when using CodeSekho."
        align="center"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <Card className="p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
            <Scale className="h-4 w-4" /> Summary
          </div>
          <ul className="space-y-2 text-sm text-dark-700">
            {TERMS_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary-600 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dark-600">
            Replace this summary with your full legal Terms of Service, including acceptable use, IP rights,
            disclaimers, limitations of liability, governing law, and contact information.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
