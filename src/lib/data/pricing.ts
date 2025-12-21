import type { CurrencyCode } from "@/lib/currency";

export type PricingTier = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: CurrencyCode;
  cadence: "mo" | "yr";
  popular?: boolean;
  features: string[];
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For learners getting started with fundamentals.",
    price: 9,
    cadence: "mo",
    features: [
      "Access to all core courses",
      "Community Q&A and study groups",
      "Localized pricing with auto currency",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious upskilling with projects and reviews.",
    price: 29,
    cadence: "mo",
    popular: true,
    features: [
      "Everything in Starter",
      "Project reviews by senior engineers",
      "Mock interviews and feedback",
      "Interview prep drills (DSA + system design)",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For teams that need structured upskilling.",
    price: 49,
    cadence: "mo",
    features: [
      "Everything in Pro",
      "Team analytics and progress reports",
      "Dedicated success manager",
      "Custom cohorts and office hours",
    ],
  },
];




