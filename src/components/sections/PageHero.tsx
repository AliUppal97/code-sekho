"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  align?: "left" | "center";
  background?: "gradient" | "solid";
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  background = "gradient",
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        background === "gradient"
          ? "bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 text-white"
          : "bg-white"
      )}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 -top-20 h-72 w-72 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "flex flex-col gap-4",
            isCenter ? "items-center text-center" : "items-start"
          )}
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {title}
          </h1>
          {description && (
            <p className="max-w-3xl text-base sm:text-lg text-white/80">
              {description}
            </p>
          )}
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </motion.div>
      </div>
    </section>
  );
}

