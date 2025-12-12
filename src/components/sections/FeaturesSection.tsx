"use client";

import { motion } from "motion/react";
import {
  GraduationCap,
  Code,
  Users,
  Clock,
  Award,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of experience at top tech companies.",
    color: "bg-primary-500",
  },
  {
    icon: Code,
    title: "Hands-on Projects",
    description:
      "Build real-world projects that you can add to your portfolio and showcase to employers.",
    color: "bg-accent-500",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join our active community of learners and get help whenever you're stuck.",
    color: "bg-purple-500",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description:
      "Access courses anytime, anywhere. Learn on your schedule with lifetime access.",
    color: "bg-emerald-500",
  },
  {
    icon: Award,
    title: "Certificates",
    description:
      "Earn recognized certificates upon course completion to boost your resume.",
    color: "bg-rose-500",
  },
  {
    icon: Zap,
    title: "Interview Prep",
    description:
      "Get comprehensive interview preparation with company-specific practice questions.",
    color: "bg-amber-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-600 font-medium text-sm mb-4">
            Why CodeSekho?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-heading-lg font-bold text-dark-900 mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-lg text-dark-500">
            We provide all the tools and resources you need to master programming
            and land your dream job.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-dark-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-500 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-dark-50 to-transparent rounded-tr-2xl rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

