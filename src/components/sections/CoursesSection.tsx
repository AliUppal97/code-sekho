"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock, Users, Star, ArrowRight, Play } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { useCurrency } from "@/providers/currency-provider";
import { FEATURED_COURSES } from "@/lib/data/courses";

export function CoursesSection() {
  const { formatPrice } = useCurrency();

  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-600 font-medium text-sm mb-4">
              Our Courses
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-heading-lg font-bold text-dark-900">
              Explore Our{" "}
              <span className="gradient-text">Popular Courses</span>
            </h2>
          </div>
          <Button
            variant="outline"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            asChild
          >
            <Link href="/courses">View All Courses</Link>
          </Button>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_COURSES.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden course-card">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent z-10" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Play className="h-7 w-7 text-white fill-white" />
                  </div>
                </div>

                {/* Course info on thumbnail */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" size="sm" className="bg-white/20 backdrop-blur-sm text-white border-0">
                      {course.category}
                    </Badge>
                    <Badge variant="secondary" size="sm" className="bg-accent-500/80 text-white border-0">
                      {course.level}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-white line-clamp-1">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-dark-500 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent-500 fill-accent-500" />
                    {course.rating}
                  </div>
                </div>

                {/* Price & CTA */}
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
                    <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

