"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  ArrowRight,
  Calendar,
  Target,
} from "lucide-react";
import { Card, CardContent, Button, Badge, Avatar } from "@/components/ui";

const stats = [
  {
    label: "Courses Enrolled",
    value: "12",
    change: "+2 this month",
    icon: BookOpen,
    color: "bg-primary-500",
  },
  {
    label: "Hours Learned",
    value: "156",
    change: "+24 this week",
    icon: Clock,
    color: "bg-accent-500",
  },
  {
    label: "Certificates",
    value: "5",
    change: "+1 this month",
    icon: Trophy,
    color: "bg-purple-500",
  },
  {
    label: "Completion Rate",
    value: "78%",
    change: "+5% this month",
    icon: TrendingUp,
    color: "bg-emerald-500",
  },
];

const continueLearning = [
  {
    id: "1",
    title: "C Programming Beginner Course",
    progress: 65,
    lastAccessed: "2 hours ago",
    thumbnail: "/courses/c-programming.jpg",
  },
  {
    id: "2",
    title: "DSA Masterclass",
    progress: 30,
    lastAccessed: "1 day ago",
    thumbnail: "/courses/dsa.jpg",
  },
  {
    id: "3",
    title: "React.js Complete Guide",
    progress: 85,
    lastAccessed: "3 days ago",
    thumbnail: "/courses/react.jpg",
  },
];

const upcomingLessons = [
  {
    title: "Binary Search Trees",
    course: "DSA Masterclass",
    time: "Today, 3:00 PM",
    duration: "45 min",
  },
  {
    title: "React Hooks Deep Dive",
    course: "React.js Complete Guide",
    time: "Tomorrow, 10:00 AM",
    duration: "60 min",
  },
  {
    title: "Pointers in C",
    course: "C Programming",
    time: "Wed, 2:00 PM",
    duration: "30 min",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-dark-900 mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-dark-500">
          Continue your learning journey. You&apos;re doing great!
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="elevated" padding="md" className="h-full">
                <CardContent className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-dark-500 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-dark-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-emerald-600">{stat.change}</p>
                  </div>
                  <div
                    className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-900">
              Continue Learning
            </h2>
            <Link
              href="/dashboard/courses"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {continueLearning.map((course) => (
              <Card
                key={course.id}
                variant="elevated"
                padding="md"
                hover
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-40 h-24 rounded-xl bg-course-gradient flex-shrink-0 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-dark-900 mb-2 truncate">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-dark-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.lastAccessed}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-dark-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-dark-700">
                      {course.progress}%
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2">
                  <Link href={`/dashboard/courses/${course.id}`}>
                    <Button size="sm">Continue</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-900">Upcoming</h2>
            <Button variant="ghost" size="sm">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>

          <Card variant="elevated" padding="none">
            <div className="divide-y divide-dark-100">
              {upcomingLessons.map((lesson, index) => (
                <div key={index} className="p-4 hover:bg-dark-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-dark-900 text-sm truncate">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-dark-500 truncate">
                        {lesson.course}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-dark-400">
                          {lesson.time}
                        </span>
                        <Badge variant="secondary" size="sm">
                          {lesson.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6 space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/interview-prep">
                <Target className="h-4 w-4 mr-2" />
                Interview Preparation
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/crash-course">
                <Play className="h-4 w-4 mr-2" />
                Quick Crash Course
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

