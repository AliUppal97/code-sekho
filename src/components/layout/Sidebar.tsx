"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  BookOpen,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Building2,
  Play,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useStore";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Interview Preparation",
    href: "/dashboard/interview-prep",
    icon: GraduationCap,
  },
  {
    label: "Crash Course",
    href: "/dashboard/crash-course",
    icon: Play,
  },
  {
    label: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-30 bg-white border-r border-dark-100 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-white border border-dark-200 shadow-sm flex items-center justify-center hover:bg-dark-50 transition-colors"
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4 text-dark-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-dark-500" />
          )}
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-dark-600 hover:bg-dark-50 hover:text-dark-900"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-primary-500" : "text-dark-400 group-hover:text-dark-600"
                  )}
                />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {link.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-dark-100">
          <button
            className={cn(
              "flex items-center gap-3 w-full px-3 py-3 rounded-xl text-dark-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

