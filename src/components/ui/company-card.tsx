"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Building2, ChevronRight, ExternalLink, Copy, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CompanyCardProps {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  color?: string;
  courseCount?: number;
  expectedSalary?: string;
  applicationLink?: string;
  hireDate?: string;
  variant?: "default" | "detailed" | "carousel";
  className?: string;
}

export function CompanyCard({
  id,
  name,
  slug,
  logo,
  color = "bg-primary-500",
  courseCount,
  expectedSalary,
  applicationLink,
  hireDate,
  variant = "default",
  className,
}: CompanyCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (applicationLink) {
      await navigator.clipboard.writeText(applicationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === "carousel") {
    return (
      <Link href={`/dashboard/interview-prep/companies/${slug}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className={cn(
            "flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-dark-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 min-w-[140px] h-[120px] group",
            className
          )}
        >
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110",
              color
            )}
          >
            {logo ? (
              <img src={logo} alt={name} className="w-8 h-8 object-contain" />
            ) : (
              <Building2 className="h-6 w-6 text-white" />
            )}
          </div>
          <h3 className="text-xs font-semibold text-dark-700 text-center group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </motion.div>
      </Link>
    );
  }

  if (variant === "detailed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "bg-white rounded-2xl border border-dark-100 shadow-soft overflow-hidden",
          className
        )}
      >
        {/* Header */}
        <div className={cn("p-6", color.replace("bg-", "bg-opacity-10 bg-"))}>
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
                color
              )}
            >
              {logo ? (
                <img src={logo} alt={name} className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-2xl font-bold text-white">{name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark-900">{name}</h2>
              {courseCount && (
                <p className="text-sm text-dark-500">{courseCount} interview courses</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 divide-x divide-dark-100 border-b border-dark-100">
          {expectedSalary && (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-dark-400 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs">Expected Salary</span>
              </div>
              <p className="text-lg font-bold text-dark-900">{expectedSalary}</p>
            </div>
          )}
          {applicationLink && (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-dark-400 mb-1">
                <ExternalLink className="h-4 w-4" />
                <span className="text-xs">Application Link</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          )}
          {hireDate && (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-dark-400 mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Hire Date</span>
              </div>
              <p className="text-lg font-bold text-dark-900">{hireDate}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4">
          <Link
            href={`/dashboard/interview-prep/companies/${slug}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors"
          >
            View All Courses
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <Link href={`/dashboard/interview-prep/companies/${slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          "bg-white rounded-2xl border border-dark-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 p-4 text-center group",
          className
        )}
      >
        <div
          className={cn(
            "w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110 shadow-md",
            color
          )}
        >
          {logo ? (
            <img src={logo} alt={name} className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-xl font-bold text-white">{name.charAt(0)}</span>
          )}
        </div>
        <h3 className="font-semibold text-dark-900 text-sm mb-1 group-hover:text-primary-600 transition-colors">
          {name}
        </h3>
        {courseCount && (
          <p className="text-xs text-dark-500">{courseCount} courses</p>
        )}
      </motion.div>
    </Link>
  );
}

// Carousel wrapper for companies
interface CompanyCarouselProps {
  companies: CompanyCardProps[];
  className?: string;
}

export function CompanyCarousel({ companies, className }: CompanyCarouselProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {companies.map((company) => (
          <div key={company.id} className="snap-start">
            <CompanyCard {...company} variant="carousel" />
          </div>
        ))}
      </div>
      {/* Gradient overlays for scroll indication */}
      <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
}







