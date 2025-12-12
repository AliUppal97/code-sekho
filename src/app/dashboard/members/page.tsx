"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Users,
  BookOpen,
  Clock,
  MoreHorizontal,
  Mail,
  Calendar,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { Button, Badge, Avatar, Card } from "@/components/ui";
import { cn, formatDistanceToNow, getInitials } from "@/lib/utils";

// Sample members data matching Figma design
const members = [
  {
    id: "1",
    name: "Zainab Ahmed",
    email: "zainab@example.com",
    avatar: null,
    role: "Student",
    joinedAt: new Date("2024-01-15"),
    coursesEnrolled: 8,
    coursesCompleted: 5,
    totalWatchTime: 156,
    lastActive: new Date("2024-12-10"),
    status: "active" as const,
  },
  {
    id: "2",
    name: "Muhammad Ali",
    email: "ali@example.com",
    avatar: null,
    role: "Student",
    joinedAt: new Date("2024-02-20"),
    coursesEnrolled: 12,
    coursesCompleted: 8,
    totalWatchTime: 245,
    lastActive: new Date("2024-12-11"),
    status: "active" as const,
  },
  {
    id: "3",
    name: "Sarah Khan",
    email: "sarah@example.com",
    avatar: null,
    role: "Premium",
    joinedAt: new Date("2024-03-10"),
    coursesEnrolled: 15,
    coursesCompleted: 12,
    totalWatchTime: 380,
    lastActive: new Date("2024-12-09"),
    status: "active" as const,
  },
  {
    id: "4",
    name: "Hassan Raza",
    email: "hassan@example.com",
    avatar: null,
    role: "Student",
    joinedAt: new Date("2024-04-05"),
    coursesEnrolled: 5,
    coursesCompleted: 2,
    totalWatchTime: 48,
    lastActive: new Date("2024-11-20"),
    status: "inactive" as const,
  },
  {
    id: "5",
    name: "Ayesha Malik",
    email: "ayesha@example.com",
    avatar: null,
    role: "Premium",
    joinedAt: new Date("2024-05-18"),
    coursesEnrolled: 20,
    coursesCompleted: 15,
    totalWatchTime: 520,
    lastActive: new Date("2024-12-11"),
    status: "active" as const,
  },
  {
    id: "6",
    name: "Usman Shah",
    email: "usman@example.com",
    avatar: null,
    role: "Student",
    joinedAt: new Date("2024-06-22"),
    coursesEnrolled: 3,
    coursesCompleted: 1,
    totalWatchTime: 24,
    lastActive: new Date("2024-10-15"),
    status: "inactive" as const,
  },
];

const stats = [
  { label: "Total Members", value: "2,547", icon: Users, color: "bg-primary-500" },
  { label: "Active Members", value: "1,892", icon: Users, color: "bg-emerald-500" },
  { label: "Premium Members", value: "456", icon: BookOpen, color: "bg-accent-500" },
  { label: "Avg. Watch Time", value: "45h", icon: Clock, color: "bg-purple-500" },
];

const statusColors = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-dark-100 text-dark-600",
  suspended: "bg-rose-100 text-rose-700",
};

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState<"name" | "joined" | "courses">("joined");

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Members</h1>
        <p className="text-dark-500">
          Manage and view all platform members
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
              <Card variant="elevated" padding="md">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      stat.color
                    )}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-dark-200 bg-white text-dark-900 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="h-12 pl-4 pr-10 rounded-xl border border-dark-200 bg-white text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400 pointer-events-none" />
          </div>
        </div>

        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
          More Filters
        </Button>
      </div>

      {/* Members Table */}
      <Card variant="elevated" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-700">
                  <button
                    onClick={() => setSortBy("name")}
                    className="flex items-center gap-1 hover:text-primary-600"
                  >
                    Member
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-700">
                  <button
                    onClick={() => setSortBy("courses")}
                    className="flex items-center gap-1 hover:text-primary-600"
                  >
                    Courses
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-700">
                  Watch Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-700">
                  <button
                    onClick={() => setSortBy("joined")}
                    className="flex items-center gap-1 hover:text-primary-600"
                  >
                    Joined
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-700">
                  Last Active
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-dark-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-dark-50 hover:bg-dark-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={member.avatar || undefined}
                        fallback={member.name}
                        size="md"
                      />
                      <div>
                        <p className="font-medium text-dark-900">{member.name}</p>
                        <p className="text-sm text-dark-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                        statusColors[member.status]
                      )}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-dark-900">
                        {member.coursesCompleted}
                      </span>
                      <span className="text-dark-400">/</span>
                      <span className="text-dark-500">{member.coursesEnrolled}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-dark-700">{member.totalWatchTime}h</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-dark-500">
                      {member.joinedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-dark-500">
                      {formatDistanceToNow(member.lastActive)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-dark-100">
          <p className="text-sm text-dark-500">
            Showing 1-{filteredMembers.length} of {members.length} members
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
