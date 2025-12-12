"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Code2,
  ChevronDown,
  User,
  LogOut,
  Settings,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  {
    label: "Interview Prep",
    href: "/interview-prep",
    children: [
      { label: "By Subject", href: "/interview-prep/subjects" },
      { label: "By Company", href: "/interview-prep/companies" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFloating = transparent && !isScrolled;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative flex items-center justify-between h-16 px-6 rounded-2xl transition-all duration-300 ease-out pointer-events-auto",
            isFloating
              ? "bg-transparent backdrop-blur-0 border border-transparent shadow-none"
              : "bg-white/95 backdrop-blur-xl border border-dark-100/50 shadow-lg",
            "border-t-transparent"
          )}
        >
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full group-hover:bg-primary-500/30 transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <Code2 className="h-5 w-5 text-white" />
              </div>
            </div>
            <span
              className={cn(
                "text-xl font-bold font-display tracking-tight transition-colors",
                isFloating ? "text-white" : "text-dark-900"
              )}
            >
              Code<span className={cn("transition-colors", isFloating ? "text-white" : "text-primary-600")}>Sekho</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    isFloating
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-dark-600 hover:text-dark-900 hover:bg-dark-50/80"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {link.children && (
                    <ChevronDown className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDropdown === link.label && "rotate-180"
                    )} />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-xl shadow-lg border border-dark-100/50 py-1.5 overflow-hidden"
                      >
                        {link.children.map((child, index) => (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <Link
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-dark-700 hover:text-primary-600 hover:bg-primary-50/50 transition-colors duration-150"
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="md"
              className={cn(
                "font-medium transition-all duration-200",
                isFloating
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-dark-700 hover:text-dark-900 hover:bg-dark-50"
              )}
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              variant="default"
              size="md"
              className={cn(
                "font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
                isFloating
                  ? "bg-white text-dark-900 hover:bg-white/95"
                  : "bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600"
              )}
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2.5 rounded-xl transition-all duration-200 relative z-10",
              isFloating
                ? "text-white hover:bg-white/10"
                : "text-dark-600 hover:bg-dark-100"
            )}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-dark-900/20 backdrop-blur-sm lg:hidden z-40 mt-24"
            />
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "lg:hidden transition-colors absolute top-full left-4 right-4 mt-2 z-50 rounded-2xl overflow-hidden",
                isFloating
                  ? "bg-dark-900/98 backdrop-blur-2xl text-white border border-white/20 shadow-xl"
                  : "bg-white text-dark-900 border border-dark-100 shadow-xl"
              )}
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-xl font-medium transition-all duration-200",
                        isFloating
                          ? "text-white/90 hover:text-white hover:bg-white/10"
                          : "text-dark-700 hover:text-dark-900 hover:bg-dark-50"
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block px-4 py-2 text-sm rounded-lg transition-colors",
                              isFloating
                                ? "text-white/70 hover:text-white hover:bg-white/5"
                                : "text-dark-500 hover:text-dark-900 hover:bg-dark-50"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <div className="pt-4 mt-4 border-t border-dark-100/50 space-y-3">
                  <Button
                    variant="outline"
                    size="md"
                    className={cn(
                      "w-full font-medium",
                      isFloating && "border-white/20 text-white hover:bg-white/10"
                    )}
                    asChild
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    variant="default"
                    size="md"
                    className={cn(
                      "w-full font-semibold",
                      isFloating
                        ? "bg-white text-dark-900 hover:bg-white/95"
                        : "bg-gradient-to-r from-primary-600 to-primary-500 text-white"
                    )}
                    asChild
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Dashboard Navbar with user menu
export function DashboardNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-dark-100/50 shadow-sm h-16">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full group-hover:bg-primary-500/30 transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-1.5 rounded-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Code2 className="h-5 w-5 text-white" />
            </div>
          </div>
          <span className="text-lg font-bold font-display text-dark-900 tracking-tight">
            Code<span className="text-primary-600">Sekho</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-64 h-10 pl-10 pr-4 rounded-xl bg-dark-50/80 border border-dark-200/50 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 focus:bg-white transition-all duration-200"
            />
            <svg
              className="absolute left-3 h-4 w-4 text-dark-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-dark-50 transition-all duration-200 group"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                <User className="h-4 w-4 text-white" />
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-dark-500 transition-transform duration-200",
                userMenuOpen && "rotate-180"
              )} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setUserMenuOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                  {/* Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-dark-100/50 py-1.5 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-dark-100/50 bg-dark-50/30">
                      <p className="font-semibold text-dark-900">John Doe</p>
                      <p className="text-sm text-dark-500 mt-0.5">john@example.com</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-dark-700 hover:text-primary-600 hover:bg-primary-50/50 transition-colors duration-150"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <BookOpen className="h-4 w-4" />
                      My Courses
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-dark-700 hover:text-primary-600 hover:bg-primary-50/50 transition-colors duration-150"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <div className="my-1.5 border-t border-dark-100/50" />
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}

