"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, Clock, Star, Users, CheckCircle2, ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Badge, Button, Card } from "@/components/ui";
import { useCurrency } from "@/providers/currency-provider";
import { FEATURED_COURSES } from "@/lib/data/courses";

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const { formatPrice } = useCurrency();
  const course = FEATURED_COURSES.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Course"
        title={course.title}
        description={course.description}
        actions={
          <>
            <Button size="lg">{`Enroll for ${formatPrice(course.discountPrice ?? course.price)}`}</Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">Back to catalog</Link>
            </Button>
          </>
        }
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="secondary" className="bg-accent-500/10 text-accent-600 border-accent-200">
                {course.level}
              </Badge>
              <span className="inline-flex items-center gap-2 text-sm text-dark-500">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-dark-500">
                <Users className="h-4 w-4" />
                {course.students} learners
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-dark-500">
                <Star className="h-4 w-4 text-accent-500 fill-accent-500" />
                {course.rating} rated
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-dark-100">
              <img src={course.thumbnail} alt={course.title} className="w-full object-cover" />
            </div>

            {course.outcomes && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-dark-900">What you will learn</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex items-start gap-2 rounded-xl border border-dark-100 bg-dark-50/60 px-3 py-2.5"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary-500 mt-0.5" />
                      <p className="text-sm text-dark-700">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-dark-900">Syllabus highlights</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {(course.syllabus ?? [
                  { title: "Foundation", content: "Core concepts, environment setup, and tooling." },
                  { title: "Projects", content: "Build real-world projects with code reviews." },
                  { title: "Performance", content: "Profiling, optimization, and production readiness." },
                  { title: "Interview Readiness", content: "Patterns, systems thinking, and whiteboarding." },
                ]).map((item, idx) => (
                  <Card key={idx} className="p-4 space-y-1.5 border-dark-100">
                    <p className="text-sm font-semibold text-dark-900">{item.title}</p>
                    <p className="text-sm text-dark-600">{item.content}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-5 h-fit sticky top-24">
            <div className="space-y-1">
              <p className="text-sm text-dark-500">Investment</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-dark-900">
                  {formatPrice(course.discountPrice ?? course.price)}
                </span>
                {course.discountPrice && (
                  <span className="text-sm text-dark-400 line-through">
                    {formatPrice(course.price)}
                  </span>
                )}
              </div>
              <p className="text-xs text-dark-500">Localized pricing auto-applied.</p>
            </div>

            <Button size="lg" className="w-full">
              Enroll now
            </Button>
            <Button size="lg" variant="outline" className="w-full" asChild>
              <Link href="/signup">Create account</Link>
            </Button>

            <div className="space-y-3 text-sm text-dark-600">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary-600" />
                Lifetime access with updates
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-accent-500" />
                Certificate upon completion
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Mentorship and code reviews
              </div>
            </div>

            <div className="pt-3 border-t border-dark-100">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to catalog
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}


