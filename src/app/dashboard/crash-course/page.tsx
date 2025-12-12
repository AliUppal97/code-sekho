"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Clock,
  Zap,
  BookOpen,
  Play,
  TrendingUp,
} from "lucide-react";
import { Button, Badge, CourseCard, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

// Categories for crash courses
const categories = [
  { id: "all", name: "All Courses", icon: BookOpen },
  { id: "programming", name: "Programming", icon: Zap },
  { id: "dsa", name: "DSA", icon: TrendingUp },
  { id: "web", name: "Web Dev", icon: Play },
  { id: "database", name: "Database", icon: BookOpen },
];

// Sample crash courses data
const crashCourses = [
  {
    id: "1",
    title: "C Programming Beginner Course",
    description: "The Programming Fundamentals of video lecture",
    views: "50K",
    duration: "2 hours",
    rating: 4.8,
    level: "beginner" as const,
    tags: ["Quick Learn", "Fundamentals"],
    category: "programming",
  },
  {
    id: "2",
    title: "Data Structures Crash Course",
    description: "Master arrays, linked lists, trees in 3 hours",
    views: "45K",
    duration: "3 hours",
    rating: 4.9,
    level: "intermediate" as const,
    tags: ["DSA", "Interview Prep"],
    category: "dsa",
  },
  {
    id: "3",
    title: "React.js Quick Start",
    description: "Build your first React app in 2 hours",
    views: "38K",
    duration: "2 hours",
    rating: 4.7,
    level: "beginner" as const,
    tags: ["Web Dev", "Frontend"],
    category: "web",
  },
  {
    id: "4",
    title: "SQL Fundamentals",
    description: "Learn SQL queries and database basics",
    views: "42K",
    duration: "2.5 hours",
    rating: 4.6,
    level: "beginner" as const,
    tags: ["Database", "SQL"],
    category: "database",
  },
  {
    id: "5",
    title: "Python for Interviews",
    description: "Python syntax and common patterns for interviews",
    views: "35K",
    duration: "1.5 hours",
    rating: 4.8,
    level: "beginner" as const,
    tags: ["Python", "Quick Learn"],
    category: "programming",
  },
  {
    id: "6",
    title: "Algorithms Refresher",
    description: "Sorting, searching, and graph algorithms",
    views: "28K",
    duration: "4 hours",
    rating: 4.9,
    level: "advanced" as const,
    tags: ["Algorithms", "DSA"],
    category: "dsa",
  },
  {
    id: "7",
    title: "Node.js Essentials",
    description: "Backend development with Node.js",
    views: "32K",
    duration: "3 hours",
    rating: 4.5,
    level: "intermediate" as const,
    tags: ["Backend", "JavaScript"],
    category: "web",
  },
  {
    id: "8",
    title: "MongoDB Crash Course",
    description: "NoSQL database fundamentals with MongoDB",
    views: "25K",
    duration: "2 hours",
    rating: 4.7,
    level: "beginner" as const,
    tags: ["Database", "NoSQL"],
    category: "database",
  },
  {
    id: "9",
    title: "Git & GitHub Essentials",
    description: "Version control for developers",
    views: "48K",
    duration: "1.5 hours",
    rating: 4.8,
    level: "beginner" as const,
    tags: ["Tools", "Git"],
    category: "programming",
  },
];

const stats = [
  { label: "Total Courses", value: "45+", icon: BookOpen },
  { label: "Avg. Duration", value: "2.5h", icon: Clock },
  { label: "Students Enrolled", value: "25K+", icon: TrendingUp },
];

export default function CrashCoursePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCourses = crashCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Crash Courses</h1>
            <p className="text-dark-500">
              Quick, focused courses to learn fast
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="elevated" padding="md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                    <p className="text-sm text-dark-500">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
                activeCategory === category.id
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-white text-dark-600 border border-dark-200 hover:border-primary-300"
              )}
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search crash courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-dark-200 bg-white text-dark-900 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
          Filter
        </Button>
      </div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card
          variant="elevated"
          padding="none"
          className="overflow-hidden bg-gradient-to-r from-primary-600 to-primary-500"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-6">
            <div className="flex-1 text-white">
              <Badge className="bg-white/20 text-white border-0 mb-3">
                🔥 Most Popular
              </Badge>
              <h3 className="text-xl font-bold mb-2">
                Complete Interview Prep Bundle
              </h3>
              <p className="text-white/80 mb-4">
                All crash courses bundled together. Perfect for last-minute interview preparation.
              </p>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  15 hours total
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  9 courses
                </span>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-white/90"
            >
              Start Learning
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Courses Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-dark-900">
            {activeCategory === "all"
              ? "All Crash Courses"
              : categories.find((c) => c.id === activeCategory)?.name}
          </h2>
          <span className="text-sm text-dark-500">
            {filteredCourses.length} courses
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <CourseCard {...course} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" size="lg">
          Load More Courses
        </Button>
      </div>
    </div>
  );
}
