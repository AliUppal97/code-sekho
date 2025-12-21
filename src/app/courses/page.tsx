"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock, Users, Star, Layers } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Badge, Button } from "@/components/ui";
import { useCurrency } from "@/providers/currency-provider";
import { FEATURED_COURSES } from "@/lib/data/courses";

export default function CoursesPage() {
  const { formatPrice } = useCurrency();

  return (
    <PageShell>
      <PageHero
        eyebrow="Courses"
        title="Industry-grade courses crafted for outcomes"
        description="Skill pathways with rigorous curriculums, hands-on projects, and interview-ready prep. Prices adapt automatically to your local currency."
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="#catalog">Browse catalog</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">Start learning</Link>
            </Button>
          </>
        }
      />

      <section id="catalog" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-primary-600">Curated catalog</p>
            <h2 className="text-3xl font-bold text-dark-900">Built for career outcomes</h2>
            <p className="text-dark-500 mt-2 max-w-3xl">
              Every course ships with clear learning outcomes, real projects, and senior-level guidance.
            </p>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Updated monthly
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_COURSES.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 border border-dark-100"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" size="sm" className="bg-white/20 text-white border-white/30">
                    {course.category}
                  </Badge>
                  <Badge variant="secondary" size="sm" className="bg-accent-500/90 text-white border-0">
                    {course.level}
                  </Badge>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-dark-900 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-dark-500 line-clamp-2">{course.description}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-dark-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent-500 fill-accent-500" />
                    {course.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dark-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-dark-900">
                      {formatPrice(course.discountPrice ?? course.price)}
                    </span>
                    {course.discountPrice && (
                      <span className="text-sm text-dark-400 line-through">
                        {formatPrice(course.price)}
                      </span>
                    )}
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/courses/${course.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}




