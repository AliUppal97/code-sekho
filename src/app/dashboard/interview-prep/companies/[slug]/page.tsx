"use client";

import { useState, use } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  DollarSign,
  ExternalLink,
  Calendar,
  Copy,
  Building2,
  BookOpen,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button, Badge, CourseCard } from "@/components/ui";
import { cn } from "@/lib/utils";
import { INTERVIEW_COMPANIES, FILTER_TAGS, VIDEO_TABS } from "@/lib/constants";

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

export default function CompanyDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeVideoTab, setActiveVideoTab] = useState("Videos");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [copied, setCopied] = useState(false);

  // Find company from constants
  const company = INTERVIEW_COMPANIES.find((c) => c.slug === slug) || {
    id: "1",
    name: slug.toUpperCase(),
    slug,
    color: "bg-primary-500",
    courseCount: 12,
    expectedSalary: "1,00,000",
    applicationLink: "https://example.com/careers",
  };

  const handleCopyLink = async () => {
    if (company.applicationLink) {
      await navigator.clipboard.writeText(company.applicationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

      {/* Company Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-dark-100 overflow-hidden"
      >
        {/* Company Banner */}
        <div className={cn("p-8", company.color, "bg-opacity-10")}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div
              className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg",
                company.color
              )}
            >
              <span className="text-3xl font-bold text-white">
                {company.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark-900 mb-2">
                {company.name}
              </h1>
              <p className="text-dark-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing sed do elusm
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dark-100">
          {/* Expected Salaries */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-dark-400 mb-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm font-medium">Expected Salaries</span>
            </div>
            <p className="text-2xl font-bold text-dark-900">
              {company.expectedSalary}
            </p>
          </div>

          {/* Application Link */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-dark-400 mb-2">
              <ExternalLink className="h-5 w-5" />
              <span className="text-sm font-medium">Application Link</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              leftIcon={copied ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            >
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>

          {/* Hire Date */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-dark-400 mb-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">Hire Date</span>
            </div>
            <p className="text-2xl font-bold text-dark-900">50</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
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

      {/* About Section */}
      <div className="bg-white rounded-2xl border border-dark-100 p-6">
        <h2 className="text-lg font-bold text-dark-900 mb-4">ABOUT</h2>
        <p className="text-dark-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur.
        </p>
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
                  layoutId="company-video-tab"
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





