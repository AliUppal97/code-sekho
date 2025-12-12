"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  DollarSign,
  Calendar,
  ChevronDown,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { cn, formatNumber } from "@/lib/utils";

// Analytics data
const overviewStats = [
  {
    label: "Total Students",
    value: 2547,
    change: 12.5,
    trend: "up" as const,
    icon: Users,
    color: "bg-primary-500",
  },
  {
    label: "Total Courses",
    value: 156,
    change: 8.2,
    trend: "up" as const,
    icon: BookOpen,
    color: "bg-accent-500",
  },
  {
    label: "Watch Hours",
    value: 45892,
    change: 23.1,
    trend: "up" as const,
    icon: Clock,
    color: "bg-purple-500",
  },
  {
    label: "Revenue",
    value: 125000,
    change: -2.4,
    trend: "down" as const,
    icon: DollarSign,
    color: "bg-emerald-500",
    prefix: "PKR ",
  },
];

const weeklyData = [
  { day: "Mon", students: 120, views: 450 },
  { day: "Tue", students: 145, views: 520 },
  { day: "Wed", students: 132, views: 480 },
  { day: "Thu", students: 178, views: 620 },
  { day: "Fri", students: 156, views: 580 },
  { day: "Sat", students: 89, views: 320 },
  { day: "Sun", students: 67, views: 280 },
];

const topCourses = [
  { name: "C Programming Beginner", students: 1245, revenue: 45000, completion: 78 },
  { name: "DSA Masterclass", students: 980, revenue: 38000, completion: 65 },
  { name: "React.js Complete", students: 875, revenue: 32000, completion: 72 },
  { name: "Python for Beginners", students: 756, revenue: 28000, completion: 81 },
  { name: "System Design", students: 654, revenue: 25000, completion: 58 },
];

const recentActivity = [
  { type: "enrollment", user: "Zainab Ahmed", course: "C Programming", time: "2 min ago" },
  { type: "completion", user: "Ali Hassan", course: "DSA Masterclass", time: "15 min ago" },
  { type: "enrollment", user: "Sara Khan", course: "React.js", time: "1 hour ago" },
  { type: "review", user: "Usman Shah", course: "Python Basics", time: "2 hours ago" },
  { type: "enrollment", user: "Ayesha Malik", course: "System Design", time: "3 hours ago" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");
  const maxViews = Math.max(...weeklyData.map((d) => d.views));

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Analytics</h1>
          <p className="text-dark-500">Track your platform performance and growth</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as typeof period)}
              className="h-10 pl-4 pr-10 rounded-lg border border-dark-200 bg-white text-dark-900 text-sm focus:border-primary-500 focus:outline-none appearance-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400 pointer-events-none" />
          </div>
          <Button variant="outline" leftIcon={<Calendar className="h-4 w-4" />}>
            Custom Range
          </Button>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="elevated" padding="md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-dark-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-dark-900">
                      {stat.prefix || ""}
                      {formatNumber(stat.value)}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-rose-500" />
                      )}
                      <span
                        className={cn(
                          "text-sm font-medium",
                          stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
                        )}
                      >
                        {stat.change > 0 ? "+" : ""}
                        {stat.change}%
                      </span>
                      <span className="text-xs text-dark-400">vs last {period}</span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      stat.color
                    )}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card variant="elevated" padding="md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-dark-900">Weekly Activity</h3>
                <p className="text-sm text-dark-500">Student engagement this week</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="text-sm text-dark-500">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-500" />
                  <span className="text-sm text-dark-500">Students</span>
                </div>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between h-48 gap-2">
              {weeklyData.map((data, index) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1 items-end h-40">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.views / maxViews) * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex-1 bg-primary-500 rounded-t-md min-h-[4px]"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.students / maxViews) * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.05 }}
                      className="flex-1 bg-accent-500 rounded-t-md min-h-[4px]"
                    />
                  </div>
                  <span className="text-xs text-dark-500">{data.day}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Course Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card variant="elevated" padding="md" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-dark-900">Category Split</h3>
                <p className="text-sm text-dark-500">Course distribution</p>
              </div>
              <PieChart className="h-5 w-5 text-dark-400" />
            </div>

            {/* Simple Donut representation */}
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#E8E8EA"
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#0B9586"
                    strokeWidth="4"
                    strokeDasharray="35 65"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#FFB800"
                    strokeWidth="4"
                    strokeDasharray="25 75"
                    strokeDashoffset="-35"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#9F7AEA"
                    strokeWidth="4"
                    strokeDasharray="20 80"
                    strokeDashoffset="-60"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#48BB78"
                    strokeWidth="4"
                    strokeDasharray="20 80"
                    strokeDashoffset="-80"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-dark-900">156</p>
                    <p className="text-xs text-dark-500">Courses</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Programming", value: 35, color: "bg-primary-500" },
                { label: "DSA", value: 25, color: "bg-accent-500" },
                { label: "System Design", value: 20, color: "bg-purple-500" },
                { label: "Others", value: 20, color: "bg-emerald-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={cn("w-3 h-3 rounded-full", item.color)} />
                  <span className="flex-1 text-sm text-dark-600">{item.label}</span>
                  <span className="text-sm font-medium text-dark-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card variant="elevated" padding="none">
            <div className="p-4 border-b border-dark-100">
              <h3 className="font-semibold text-dark-900">Top Performing Courses</h3>
              <p className="text-sm text-dark-500">By student enrollment</p>
            </div>
            <div className="divide-y divide-dark-50">
              {topCourses.map((course, index) => (
                <div
                  key={course.name}
                  className="flex items-center gap-4 p-4 hover:bg-dark-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-600">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-dark-900 truncate">
                      {course.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-dark-500">
                      <span>{formatNumber(course.students)} students</span>
                      <span>•</span>
                      <span>{course.completion}% completion</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-dark-900">
                      PKR {formatNumber(course.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card variant="elevated" padding="none">
            <div className="p-4 border-b border-dark-100">
              <h3 className="font-semibold text-dark-900">Recent Activity</h3>
              <p className="text-sm text-dark-500">Latest platform events</p>
            </div>
            <div className="divide-y divide-dark-50">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 hover:bg-dark-50 transition-colors"
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-2",
                      activity.type === "enrollment" && "bg-primary-500",
                      activity.type === "completion" && "bg-emerald-500",
                      activity.type === "review" && "bg-accent-500"
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-dark-700">
                      <span className="font-medium text-dark-900">{activity.user}</span>{" "}
                      {activity.type === "enrollment" && "enrolled in"}
                      {activity.type === "completion" && "completed"}
                      {activity.type === "review" && "reviewed"}{" "}
                      <span className="font-medium text-primary-600">{activity.course}</span>
                    </p>
                    <p className="text-xs text-dark-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-dark-100">
              <Button variant="ghost" className="w-full">
                View All Activity
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
