"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Star,
  ThumbsUp,
  Share2,
  BookmarkPlus,
  MessageSquare,
  Download,
  CheckCircle,
} from "lucide-react";
import { Button, Card, Badge, Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";

const videoData = {
  id: "1",
  title: "Introduction to C Programming - Variables and Data Types",
  description:
    "In this lecture, we'll cover the fundamentals of C programming including variables, data types, and basic syntax. You'll learn how to declare variables, understand different data types like int, float, char, and double, and write your first C programs.",
  views: "50,234",
  likes: 4523,
  duration: "45:30",
  publishedAt: "2 weeks ago",
  instructor: {
    name: "Dr. Ahmed Khan",
    avatar: "/instructors/ahmed.jpg",
    title: "Senior Software Engineer",
    company: "Google",
    students: "25,000",
    courses: 12,
  },
  course: {
    id: "c-programming",
    title: "C Programming Beginner Course",
    totalLessons: 45,
    currentLesson: 8,
  },
};

const courseLessons = [
  { id: "1", title: "Introduction to Programming", duration: "15:30", completed: true },
  { id: "2", title: "Setting Up Development Environment", duration: "12:45", completed: true },
  { id: "3", title: "Your First C Program", duration: "20:00", completed: true },
  { id: "4", title: "Variables and Constants", duration: "25:15", completed: true },
  { id: "5", title: "Data Types in C", duration: "30:00", completed: true },
  { id: "6", title: "Operators in C", duration: "28:30", completed: true },
  { id: "7", title: "Control Structures - If/Else", duration: "35:00", completed: true },
  { id: "8", title: "Variables and Data Types (Current)", duration: "45:30", completed: false, current: true },
  { id: "9", title: "Loops - For, While, Do-While", duration: "40:00", completed: false },
  { id: "10", title: "Functions in C", duration: "45:00", completed: false },
  { id: "11", title: "Arrays and Strings", duration: "50:00", completed: false },
  { id: "12", title: "Pointers - Introduction", duration: "55:00", completed: false },
];

const relatedVideos = [
  { id: "2", title: "Control Structures in C", views: "42K", duration: "38:20" },
  { id: "3", title: "Functions and Recursion", views: "38K", duration: "45:15" },
  { id: "4", title: "Arrays and Strings", views: "35K", duration: "50:30" },
  { id: "5", title: "Pointers Deep Dive", views: "32K", duration: "55:00" },
];

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex gap-6 -mx-6 lg:-mx-8 -mt-6 lg:-mt-8">
      {/* Main Content */}
      <div className={cn("flex-1", sidebarCollapsed ? "" : "lg:pr-80")}>
        {/* Video Player */}
        <div className="relative bg-dark-900 aspect-video">
          {/* Video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-white" />
                ) : (
                  <Play className="h-10 w-10 text-white fill-white ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress bar */}
            <div className="mb-3">
              <div className="h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer group">
                <div className="h-full w-[35%] bg-primary-500 rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="h-6 w-6" />
                  ) : (
                    <Volume2 className="h-6 w-6" />
                  )}
                </button>
                <span className="text-white text-sm">
                  15:45 / {videoData.duration}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-white hover:text-primary-400 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="text-white hover:text-primary-400 transition-colors">
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-6 lg:p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
            <Link href="/dashboard/interview-prep" className="hover:text-primary-600">
              Interview Prep
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/dashboard/courses/${videoData.course.id}`}
              className="hover:text-primary-600"
            >
              {videoData.course.title}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-dark-700">Lesson {videoData.course.currentLesson}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-dark-900 mb-4">
            {videoData.title}
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dark-500 mb-6">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {videoData.views} views
            </span>
            <span>{videoData.publishedAt}</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-accent-500 fill-accent-500" />
              <span>4.8</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-dark-100">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ThumbsUp className="h-4 w-4" />}
            >
              {videoData.likes.toLocaleString()}
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Share2 className="h-4 w-4" />}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<BookmarkPlus className="h-4 w-4" />}
            >
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
            >
              Download
            </Button>
          </div>

          {/* Instructor */}
          <div className="py-6 border-b border-dark-100">
            <div className="flex items-start gap-4">
              <Avatar
                src={videoData.instructor.avatar}
                fallback={videoData.instructor.name}
                size="lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-dark-900">
                      {videoData.instructor.name}
                    </h3>
                    <p className="text-sm text-dark-500">
                      {videoData.instructor.title} at {videoData.instructor.company}
                    </p>
                    <p className="text-xs text-dark-400 mt-1">
                      {videoData.instructor.students} students • {videoData.instructor.courses} courses
                    </p>
                  </div>
                  <Button variant="default" size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-6">
            <h3 className="font-semibold text-dark-900 mb-3">About this lesson</h3>
            <p className="text-dark-600 leading-relaxed">
              {videoData.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-dark-100">
            <Button
              variant="outline"
              leftIcon={<ChevronLeft className="h-4 w-4" />}
            >
              Previous Lesson
            </Button>
            <Button rightIcon={<ChevronRight className="h-4 w-4" />}>
              Next Lesson
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar - Course Content */}
      <div
        className={cn(
          "hidden lg:block fixed right-0 top-16 bottom-0 w-80 bg-white border-l border-dark-100 transition-transform duration-300",
          sidebarCollapsed && "translate-x-full"
        )}
      >
        {/* Toggle button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-white border border-dark-200 shadow-sm flex items-center justify-center hover:bg-dark-50 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronLeft className="h-4 w-4 text-dark-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-dark-500" />
          )}
        </button>

        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-900">{videoData.course.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-2 bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{
                    width: `${(videoData.course.currentLesson / videoData.course.totalLessons) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-dark-500">
                {videoData.course.currentLesson}/{videoData.course.totalLessons}
              </span>
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto">
            {courseLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/dashboard/video/${lesson.id}`}
                className={cn(
                  "flex items-start gap-3 p-4 border-b border-dark-50 hover:bg-dark-50 transition-colors",
                  lesson.current && "bg-primary-50"
                )}
              >
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-medium",
                        lesson.current
                          ? "border-primary-500 text-primary-500"
                          : "border-dark-300 text-dark-400"
                      )}
                    >
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={cn(
                      "text-sm font-medium truncate",
                      lesson.current ? "text-primary-600" : "text-dark-700"
                    )}
                  >
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-dark-400" />
                    <span className="text-xs text-dark-500">{lesson.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

