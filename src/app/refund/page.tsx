"use client";

import { RotateCcw, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui";

const REFUND_POINTS = [
  "7-day refund window on annual plans; monthly plans are non-refundable after activation.",
  "Refunds require no certificate issuance and limited course consumption per policy.",
  "Processing times depend on payment provider; expect 5–10 business days.",
  "For billing disputes, contact support within 14 days of charge.",
];

export default function RefundPolicyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Refund Policy"
        description="Clear guidelines for refunds to keep things transparent and fair."
        align="center"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <Card className="p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
            <RotateCcw className="h-4 w-4" /> Summary
          </div>
          <ul className="space-y-2 text-sm text-dark-700">
            {REFUND_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary-600 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dark-600">
            Replace this summary with your official refund terms, eligibility criteria, exclusions, and process
            instructions.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
