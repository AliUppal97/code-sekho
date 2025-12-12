"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Search,
  Filter,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button, Badge, CourseCard, CompanyCard } from "@/components/ui";
import { cn } from "@/lib/utils";
import { INTERVIEW_SUBJECTS, INTERVIEW_COMPANIES, FILTER_TAGS, VIDEO_TABS } from "@/lib/constants";

// Sample courses data
const courses = [
  {
    id: "1",
    title: "C Programming Beginner Course",
    description: "The Programming Fundamentals of video lecture",
    views: "50K",
    duration: "12 hours",
    rating: 4.8,
    level: "beginner" as const,
    tags: ["Programming", "C"],
  },
  {
    id: "2",
    title: "C Programming Beginner Course",
    description: "The Programming Fundamentals of video lecture",
    views: "45K",
    duration: "15 hours",
    rating: 4.7,
    level: "beginner" as const,
    tags: ["Programming", "C"],
  },
  {
    id: "3",
    title: "C Programming Beginner Course",
    description: "The Programming Fundamentals of video lecture",
    views: "38K",
    duration: "10 hours",
    rating: 4.9,
    level: "intermediate" as const,
    tags: ["Programming", "C"],
  },
  {
    id: "4",
    title: "C Programming Beginner Course",
    description: "The Programming Fundamentals of video lecture",
    views: "42K",
    duration: "18 hours",
    rating: 4.6,
    level: "advanced" as const,
    tags: ["Programming", "C"],
  },
  {
    id: "5",
    title: "C Programming Beginner Course",
    description: "The Programming Fundamentals of video lecture",
    views: "35K",
    duration: "8 hours",
    rating: 4.8,
    level: "beginner" as const,
    tags: ["Programming", "C"],
  },
  {
    id: "6",
    title: "C Programming Beginner Course",
    description: "The Programming Fundamentals of video lecture",
    views: "28K",
    duration: "14 hours",
    rating: 4.5,
    level: "intermediate" as const,
    tags: ["Programming", "C"],
  },
];

export default function InterviewPrepPage() {
  const [activeTab, setActiveTab] = useState<"subjects" | "companies">("subjects");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeVideoTab, setActiveVideoTab] = useState("Videos");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [companyScrollIndex, setCompanyScrollIndex] = useState(0);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  const scrollCompanies = (direction: "left" | "right") => {
    const maxIndex = Math.max(0, INTERVIEW_COMPANIES.length - 6);
    if (direction === "left") {
      setCompanyScrollIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCompanyScrollIndex((prev) => Math.min(maxIndex, prev + 1));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-dark-900 mb-2">
          Interview Preparation
        </h1>
        <p className="text-dark-500">
          Prepare for interviews with subject-wise and company-wise courses
        </p>
      </motion.div>

      {/* Main Tabs */}
      <div className="flex items-center gap-1 bg-dark-50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("subjects")}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all",
            activeTab === "subjects"
              ? "bg-white text-primary-600 shadow-soft"
              : "text-dark-500 hover:text-dark-700"
          )}
        >
          <BookOpen className="h-4 w-4" />
          Subjects
        </button>
        <button
          onClick={() => setActiveTab("companies")}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all",
            activeTab === "companies"
              ? "bg-white text-primary-600 shadow-soft"
              : "text-dark-500 hover:text-dark-700"
          )}
        >
          <Building2 className="h-4 w-4" />
          Companies
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Subjects Grid */}
        {activeTab === "subjects" && (
          <motion.div
            key="subjects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-2">
                Specific Subjects
              </h2>
              <p className="text-dark-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing sed do elusm
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {INTERVIEW_SUBJECTS.map((subject, index) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/dashboard/interview-prep/subjects/${subject.slug}`}>
                    <div className="bg-white rounded-2xl border border-dark-100 p-4 text-center hover:shadow-soft-lg transition-all duration-300 group cursor-pointer">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110",
                          subject.color
                        )}
                      >
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-dark-900 text-sm mb-1 group-hover:text-primary-600 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-dark-500">
                        {subject.courseCount} courses
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Companies Section */}
        {activeTab === "companies" && (
          <motion.div
            key="companies"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-2">
                Specific Companies
              </h2>
              <p className="text-dark-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing sed do elusm
              </p>
            </div>

            {/* Company Carousel */}
            <div className="relative">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => scrollCompanies("left")}
                  disabled={companyScrollIndex === 0}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-dark-200 flex items-center justify-center hover:bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-5 w-5 text-dark-600" />
                </button>

                <div className="flex-1 overflow-hidden">
                  <motion.div
                    className="flex gap-4"
                    animate={{ x: -companyScrollIndex * 160 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {INTERVIEW_COMPANIES.map((company) => (
                      <CompanyCard
                        key={company.id}
                        {...company}
                        variant="carousel"
                      />
                    ))}
                  </motion.div>
                </div>

                <button
                  onClick={() => scrollCompanies("right")}
                  disabled={companyScrollIndex >= INTERVIEW_COMPANIES.length - 6}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-dark-200 flex items-center justify-center hover:bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-5 w-5 text-dark-600" />
                </button>
              </div>

              {/* Carousel dots */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: Math.max(1, INTERVIEW_COMPANIES.length - 5) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCompanyScrollIndex(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      companyScrollIndex === i ? "bg-primary-500 w-6" : "bg-dark-200"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search"
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
            className="cursor-pointer hover:bg-primary-50"
            onClick={() => toggleFilter(tag)}
            removable={selectedFilters.includes(tag)}
            onRemove={() => toggleFilter(tag)}
          >
            {tag}
          </Badge>
        ))}
        {selectedFilters.length > 0 && (
          <button
            onClick={clearFilters}
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
                  layoutId="video-tab-indicator"
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
            key={`${course.id}-${index}`}
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
