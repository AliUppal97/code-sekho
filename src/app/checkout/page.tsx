"use client";

import Link from "next/link";
import { Lock, CreditCard, ShieldCheck, ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Input, Badge } from "@/components/ui";
import { useCurrency } from "@/providers/currency-provider";
import { PRICING_TIERS } from "@/lib/data/pricing";

const DEFAULT_PLAN = PRICING_TIERS[1]; // Pro

export default function CheckoutPage() {
  const { formatPrice } = useCurrency();

  return (
    <PageShell>
      <PageHero
        eyebrow="Checkout"
        title="Secure checkout"
        description="Complete your enrollment. Prices are localized automatically."
        actions={
          <Button variant="outline" asChild>
            <Link href="/pricing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to pricing
            </Link>
          </Button>
        }
      />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-dark-900">Billing details</h2>
            <p className="text-sm text-dark-600">Use your work email for faster verification.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Full name" required />
            <Input placeholder="Company (optional)" />
            <Input type="email" placeholder="Email" required className="sm:col-span-2" />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-dark-800">Payment</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Card number" />
              <Input placeholder="Name on card" />
              <Input placeholder="Expiry MM/YY" />
              <Input placeholder="CVC" />
            </div>
            <div className="flex items-center gap-2 text-xs text-dark-500 mt-2">
              <Lock className="h-4 w-4" /> Payments are encrypted and PCI compliant.
            </div>
          </div>

          <Button size="lg" className="w-full">
            Complete purchase
          </Button>
        </Card>

        <Card className="p-6 space-y-4 h-fit">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-600 font-semibold">Selected plan</p>
              <p className="text-lg font-semibold text-dark-900">{DEFAULT_PLAN.name}</p>
            </div>
            <Badge variant="secondary">{DEFAULT_PLAN.cadence}</Badge>
          </div>
          <p className="text-sm text-dark-600">{DEFAULT_PLAN.description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-dark-900">
              {formatPrice(DEFAULT_PLAN.price, { currency: DEFAULT_PLAN.currency })}
            </span>
            <span className="text-sm text-dark-500">/{DEFAULT_PLAN.cadence}</span>
          </div>
          <div className="space-y-2">
            {DEFAULT_PLAN.features.slice(0, 4).map((f) => (
              <p key={f} className="text-sm text-dark-600">
                • {f}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-dark-500 pt-2 border-t border-dark-100">
            <ShieldCheck className="h-4 w-4 text-primary-600" />
            7-day refund guarantee on annual plans.
          </div>
        </Card>
      </section>
    </PageShell>
  );
}




