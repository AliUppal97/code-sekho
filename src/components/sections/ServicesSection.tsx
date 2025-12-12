"use client";

import { motion } from "motion/react";
import {
  GraduationCap,
  Target,
  Briefcase,
  FileText,
  HeadphonesIcon,
  Rocket,
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Expert-Led Courses",
    description:
      "Learn from industry veterans who have worked at top tech companies like Google, Meta, and Microsoft.",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: Target,
    title: "Interview Preparation",
    description:
      "Comprehensive interview prep with company-specific questions, mock interviews, and feedback.",
    color: "from-accent-500 to-accent-600",
  },
  {
    icon: Briefcase,
    title: "Job Placement",
    description:
      "Get assistance with job applications, resume reviews, and connections with hiring partners.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: FileText,
    title: "Resume Building",
    description:
      "Professional resume templates and personalized guidance to highlight your skills.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: HeadphonesIcon,
    title: "1-on-1 Mentorship",
    description:
      "Get personalized guidance from experienced mentors who understand your goals.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Rocket,
    title: "Career Guidance",
    description:
      "Navigate your career path with expert advice on roles, companies, and growth opportunities.",
    color: "from-blue-500 to-blue-600",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-white">
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
            Our Best Services For You
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-heading-lg font-bold text-dark-900 mb-4">
            Complete Learning & Career{" "}
            <span className="gradient-text">Support System</span>
          </h2>
          <p className="text-lg text-dark-500">
            From learning to landing your dream job, we&apos;ve got you covered with
            comprehensive support at every step.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-8 border border-dark-100 hover:border-transparent hover:shadow-card-hover transition-all duration-300 h-full">
                  {/* Icon with gradient background */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-dark-500 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover arrow */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-6 h-6 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

