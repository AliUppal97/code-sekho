"use client";

import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { PricingSection } from "@/components/sections/PricingSection";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title="Transparent, localized pricing for every learner"
        description="Choose the plan that fits your goals. Prices auto-adjust to your currency."
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="#pricing">View plans</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </>
        }
      />
      <PricingSection />
    </PageShell>
  );
}


