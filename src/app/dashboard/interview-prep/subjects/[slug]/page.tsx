"use client";

import { useState, use } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  BookOpen,
  Users,
  FileText,
  Code,
} from "lucide-react";
import { Button, Badge, CourseCard } from "@/components/ui";
import { cn } from "@/lib/utils";
import { INTERVIEW_SUBJECTS, FILTER_TAGS, VIDEO_TABS } from "@/lib/constants";

// Sample courses data
const courses = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  title: "C Programming Beginner Course",
  description: "The Programming Fundamentals of video lecture",
  views: `${Math.floor(Math.random() * 50 + 20)}K`,
  duration: `${Math.floor(Math.random() * 15 + 5)} hours`,
  rating: Number((Math.random() * 0.5 + 4.5).toFixed(1)),
  level: ["beginner", "intermediate", "advanced"][Math.floor(Math.random() * 3)] as "beginner" | "intermediate" | "advanced",
  tags: ["Programming", "C"],
}));

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SubjectDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeVideoTab, setActiveVideoTab] = useState("Videos");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  // Find subject from constants
  const subject = INTERVIEW_SUBJECTS.find((s) => s.slug === slug) || {
    id: "1",
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    slug,
    icon: "BookOpen",
    color: "bg-primary-500",
    courseCount: 45,
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <Link
        href="/dashboard/interview-prep"
        className="inline-flex items-center gap-2 text-dark-500 hover:text-dark-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Interview Preparation
      </Link>

      {/* Subject Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-dark-100 overflow-hidden"
      >
        <div className={cn("p-8", subject.color, "bg-opacity-10")}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div
              className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg",
                subject.color
              )}
            >
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-dark-900 mb-2">
                {subject.name}
              </h1>
              <p className="text-dark-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing sed do elusm
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-dark-100 border-t border-dark-100">
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-dark-400 mb-1">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs font-medium">Courses</span>
            </div>
            <p className="text-lg font-bold text-dark-900">{subject.courseCount}</p>
          </div>
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-dark-400 mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Students</span>
            </div>
            <p className="text-lg font-bold text-dark-900">15K+</p>
          </div>
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-dark-400 mb-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-medium">Questions</span>
            </div>
            <p className="text-lg font-bold text-dark-900">500+</p>
          </div>
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-dark-400 mb-1">
              <Code className="h-4 w-4" />
              <span className="text-xs font-medium">Problems</span>
            </div>
            <p className="text-lg font-bold text-dark-900">200+</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-dark-200 bg-white text-dark-900 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
          Filter
        </Button>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTER_TAGS.slice(0, 6).map((tag) => (
          <Badge
            key={tag}
            variant={selectedFilters.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleFilter(tag)}
            removable={selectedFilters.includes(tag)}
            onRemove={() => toggleFilter(tag)}
          >
            {tag}
          </Badge>
        ))}
        {selectedFilters.length > 0 && (
          <button
            onClick={() => setSelectedFilters([])}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Video Tabs */}
      <div className="border-b border-dark-100">
        <div className="flex items-center gap-1">
          {VIDEO_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveVideoTab(tab)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-all relative",
                activeVideoTab === tab
                  ? "text-primary-600"
                  : "text-dark-500 hover:text-dark-700"
              )}
            >
              {tab}
              {activeVideoTab === tab && (
                <motion.div
                  layoutId="subject-video-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Buttons */}
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant={sortBy === "latest" ? "default" : "ghost"}
          onClick={() => setSortBy("latest")}
        >
          Latest
        </Button>
        <Button
          size="sm"
          variant={sortBy === "popular" ? "default" : "ghost"}
          onClick={() => setSortBy("popular")}
        >
          Popular
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
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

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" size="lg">
          Load More Courses
        </Button>
      </div>
    </div>
  );
}



