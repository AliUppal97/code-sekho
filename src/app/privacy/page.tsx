"use client";

import { Shield, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui";

const PRIVACY_POINTS = [
  "We collect only the data needed to deliver learning, billing, and support.",
  "We never sell learner data. Third-party processors are vetted and minimal.",
  "You can request export or deletion of your data at any time.",
  "Security is enforced with encryption in transit, least-privilege access, and audits.",
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        description="We protect learner data with strict controls and transparent practices."
        align="center"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <Card className="p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
            <Shield className="h-4 w-4" /> Core principles
          </div>
          <ul className="space-y-2 text-sm text-dark-700">
            {PRIVACY_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary-600 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dark-600">
            This is a concise summary. Replace with your full legal policy, including data categories, processors,
            retention, cookies, and contact for DPO/requests.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}


