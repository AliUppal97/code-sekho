"use client";

import { Check, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Card, Badge, Button } from "@/components/ui";
import { useCurrency } from "@/providers/currency-provider";
import { PRICING_TIERS } from "@/lib/data/pricing";

export function PricingSection() {
  const { formatPrice } = useCurrency();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" id="pricing">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary-600">Pricing</p>
          <h2 className="text-3xl font-bold text-dark-900">Plans for learners and teams</h2>
          <p className="text-dark-500 max-w-2xl">
            Localized pricing auto-applies to your region. Upgrade or downgrade anytime.
          </p>
        </div>
        <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-2">
          <Zap className="h-4 w-4" />
          No setup fees
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PRICING_TIERS.map((tier, idx) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card
              className={`h-full p-6 space-y-5 border-dark-100 ${
                tier.popular ? "ring-2 ring-primary-200 shadow-card-hover" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-primary-600 font-semibold">{tier.name}</p>
                  <h3 className="text-xl font-semibold text-dark-900">{tier.description}</h3>
                </div>
                {tier.popular && <Badge variant="secondary">Most Popular</Badge>}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-dark-900">
                  {formatPrice(tier.price, { currency: tier.currency })}
                </span>
                <span className="text-sm text-dark-500">/{tier.cadence}</span>
              </div>

              <div className="space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm text-dark-700">
                    <Check className="h-4 w-4 text-primary-600 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" variant={tier.popular ? "default" : "outline"} size="lg">
                Choose plan
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}




