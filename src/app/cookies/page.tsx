"use client";

import { Cookie, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui";

const COOKIE_POINTS = [
  "We use essential cookies for authentication and session management.",
  "Analytics cookies help improve product experience; you can opt out where required.",
  "Third-party cookies are limited to trusted providers for payments and analytics.",
  "Manage preferences via your browser or future in-app controls.",
];

export default function CookiePolicyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        description="How we use cookies and similar technologies."
        align="center"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <Card className="p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
            <Cookie className="h-4 w-4" /> Summary
          </div>
          <ul className="space-y-2 text-sm text-dark-700">
            {COOKIE_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary-600 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dark-600">
            Replace this summary with full details on categories, purposes, retention, consent management, and how users
            can control cookie settings.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}

