"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Avatar } from "@/components/ui";

const testimonials = [
  {
    id: 1,
    name: "Ali Hassan",
    role: "Software Engineer",
    company: "Google",
    avatar: "/testimonials/ali.jpg",
    content:
      "CodeSekho completely transformed my career. The DSA course and mock interviews prepared me perfectly for my Google interview. I couldn't have done it without them!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Frontend Developer",
    company: "Meta",
    avatar: "/testimonials/sarah.jpg",
    content:
      "The React course was exactly what I needed. The project-based approach helped me build a strong portfolio that impressed my interviewers at Meta.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ahmed Raza",
    role: "Full Stack Developer",
    company: "Microsoft",
    avatar: "/testimonials/ahmed.jpg",
    content:
      "Best investment I've made in my career. The mentors are incredibly supportive and the curriculum is always up-to-date with industry standards.",
    rating: 5,
  },
  {
    id: 4,
    name: "Fatima Zahra",
    role: "Data Scientist",
    company: "Amazon",
    avatar: "/testimonials/fatima.jpg",
    content:
      "The Python and Machine Learning courses gave me the foundation I needed. Within 6 months of completing the course, I landed my dream job at Amazon!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="section-padding bg-gradient-to-b from-primary-900 to-dark-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="circle-decoration w-96 h-96 bg-primary-500 top-0 -right-48" />
        <div className="circle-decoration w-80 h-80 bg-accent-500 bottom-0 -left-40" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-primary-300 font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-heading-lg font-bold text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-white/70">
            Hear from our successful alumni who transformed their careers with
            CodeSekho.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20"
              >
                {/* Quote icon */}
                <Quote className="h-12 w-12 text-primary-400 mb-6" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-accent-400 fill-accent-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                  &quot;{testimonials[activeIndex].content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar
                    src={testimonials[activeIndex].avatar}
                    fallback={testimonials[activeIndex].name}
                    size="lg"
                  />
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-white/60">
                      {testimonials[activeIndex].role} at{" "}
                      {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-primary-400"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-sm mb-6">
            Our students work at top companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["Google", "Meta", "Microsoft", "Amazon", "Apple", "Netflix"].map(
              (company) => (
                <div
                  key={company}
                  className="text-white/40 text-xl font-bold tracking-wider hover:text-white/70 transition-colors cursor-default"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

