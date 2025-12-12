"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 rounded-3xl p-8 md:p-16 overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/30 rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid-light.svg')] bg-center opacity-10" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Limited Time Offer - 70% Off
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your{" "}
              <span className="text-accent-300">Coding Journey?</span>
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of successful developers who transformed their careers
              with CodeSekho. Start learning today and unlock your potential.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                className="bg-white text-primary-600 hover:bg-white/90 w-full sm:w-auto"
                rightIcon={<ArrowRight className="h-5 w-5" />}
                asChild
              >
                <Link href="/courses">Get Started Free</Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
                asChild
              >
                <Link href="/contact">Talk to Us</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-white/20">
              <div className="text-white/70 text-sm">
                ✓ No credit card required
              </div>
              <div className="text-white/70 text-sm">
                ✓ 7-day free trial
              </div>
              <div className="text-white/70 text-sm">
                ✓ Cancel anytime
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

