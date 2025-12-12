"use client";

import { motion } from "motion/react";
import { Check, Star, TrendingUp, Shield } from "lucide-react";

const reasons = [
  "Industry-relevant curriculum updated regularly",
  "One-on-one mentorship from experienced developers",
  "Job placement assistance and career guidance",
  "Affordable pricing with flexible payment options",
  "Lifetime access to course materials",
  "24/7 community support and doubt resolution",
];

const highlights = [
  {
    icon: Star,
    value: "4.9",
    label: "Student Rating",
    color: "text-accent-500",
  },
  {
    icon: TrendingUp,
    value: "89%",
    label: "Placement Rate",
    color: "text-primary-500",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Satisfaction",
    color: "text-emerald-500",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 font-medium text-sm mb-4">
              3 Reasons To Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-heading-lg font-bold text-dark-900 mb-6">
              Why Students{" "}
              <span className="text-primary-500">Trust Us</span> For Their
              Learning Journey
            </h2>
            <p className="text-lg text-dark-500 mb-8">
              We&apos;re committed to providing the highest quality education with
              practical skills that employers actually want.
            </p>

            {/* Reasons List */}
            <div className="space-y-4 mb-10">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-dark-700">{reason}</span>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-6">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={highlight.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 bg-dark-50 rounded-xl px-5 py-3"
                  >
                    <Icon className={`h-6 w-6 ${highlight.color}`} />
                    <div>
                      <div className="font-bold text-dark-900">
                        {highlight.value}
                      </div>
                      <div className="text-sm text-dark-500">
                        {highlight.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-10">
              {/* Decorative shapes */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full" />
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full" />

              {/* Stats cards */}
              <div className="relative z-10 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-dark-900">
                      All Courses
                    </h4>
                    <span className="text-sm text-primary-600 font-medium">
                      View All
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {["Web Dev", "Python", "DSA", "System Design"].map(
                      (course) => (
                        <div
                          key={course}
                          className="bg-dark-50 rounded-lg px-4 py-3 text-center"
                        >
                          <span className="text-sm font-medium text-dark-700">
                            {course}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center">
                      <span className="text-white font-bold">JD</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">John Doe</h4>
                      <p className="text-sm text-white/70">
                        Placed at Google
                      </p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    &quot;CodeSekho helped me crack my dream job. The interview
                    prep was exactly what I needed!&quot;
                  </p>
                </div>

                <div className="flex items-center justify-between bg-white rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-dark-900">
                        Expected Salary
                      </div>
                      <div className="text-sm text-dark-500">
                        After Completion
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      ₹12L+
                    </div>
                    <div className="text-sm text-dark-500">per year</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-accent-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold"
            >
              50K+ Alumni
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

