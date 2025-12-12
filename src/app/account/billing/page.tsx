"use client";

import Link from "next/link";
import { CreditCard, ShieldCheck, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Badge } from "@/components/ui";
import { useCurrency } from "@/providers/currency-provider";
import { PRICING_TIERS } from "@/lib/data/pricing";

const ACTIVE_PLAN = PRICING_TIERS[1];

export default function AccountBillingPage() {
  const { formatPrice } = useCurrency();

  return (
    <PageShell>
      <PageHero
        eyebrow="Account"
        title="Billing and subscriptions"
        description="Manage your plan, invoices, and payment methods."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <Card className="p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-600 font-semibold">Current plan</p>
              <h2 className="text-xl font-semibold text-dark-900">{ACTIVE_PLAN.name}</h2>
              <p className="text-sm text-dark-600 mt-1">{ACTIVE_PLAN.description}</p>
            </div>
            <Badge variant="secondary">{ACTIVE_PLAN.cadence}</Badge>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-dark-900">
              {formatPrice(ACTIVE_PLAN.price, { currency: ACTIVE_PLAN.currency })}
            </span>
            <span className="text-sm text-dark-500">/{ACTIVE_PLAN.cadence}</span>
          </div>
          <div className="flex gap-3">
            <Button>Update payment method</Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">Change plan</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-dark-500 pt-2 border-t border-dark-100">
            <ShieldCheck className="h-4 w-4 text-primary-600" />
            Secure billing handled by PCI-compliant provider.
          </div>
        </Card>

        <Card className="p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary-600" />
            <div>
              <p className="text-sm text-dark-500">Payment method</p>
              <p className="text-sm font-semibold text-dark-900">Visa •••• 4242</p>
            </div>
          </div>
          <Button variant="ghost" className="px-0 w-fit" asChild>
            <Link href="/checkout">
              Update details <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </Card>
      </section>
    </PageShell>
  );
}

