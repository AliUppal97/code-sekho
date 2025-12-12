"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Play, Clock, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  views?: string;
  rating?: number;
  level?: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  progress?: number;
  href?: string;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
}

export function CourseCard({
  id,
  title,
  description,
  thumbnail,
  duration,
  views,
  rating,
  level,
  tags,
  progress,
  href,
  variant = "default",
  className,
}: CourseCardProps) {
  const cardHref = href || `/dashboard/video/${id}`;

  if (variant === "horizontal") {
    return (
      <Link href={cardHref}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={cn(
            "flex gap-4 p-4 bg-white rounded-2xl border border-dark-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 group",
            className
          )}
        >
          {/* Thumbnail */}
          <div className="relative w-40 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-course-gradient">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-4 w-4 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-dark-900 mb-1 truncate group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-dark-500 mb-2 line-clamp-1">{description}</p>
            )}
            {progress !== undefined && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-dark-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-dark-600">{progress}%</span>
              </div>
            )}
            <div className="flex items-center gap-3 mt-2 text-xs text-dark-500">
              {duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {duration}
                </span>
              )}
              {views && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {views} views
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={cardHref}>
        <motion.div
          whileHover={{ y: -4 }}
          className={cn(
            "bg-white rounded-2xl border border-dark-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden group",
            className
          )}
        >
          <div className="relative aspect-[16/10] bg-course-gradient">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-5 w-5 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-900/80 to-transparent">
              <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>
            </div>
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between text-xs text-dark-500">
              {views && <span>{views} views</span>}
              {rating && (
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 text-accent-500 fill-accent-500" />
                  {rating}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={cardHref}>
      <motion.div
        whileHover={{ y: -6 }}
        className={cn(
          "bg-white rounded-2xl border border-dark-100 shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden group",
          className
        )}
      >
        {/* Thumbnail with gradient overlay */}
        <div className="relative aspect-video bg-course-gradient overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span className="text-3xl font-bold text-white/90">C</span>
            </div>
          </div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-900/20">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
              <Play className="h-6 w-6 text-primary-600 fill-primary-600 ml-1" />
            </div>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent">
            <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
          </div>

          {/* Level badge */}
          {level && (
            <div className="absolute top-3 left-3">
              <span
                className={cn(
                  "px-2 py-1 rounded-md text-xs font-medium text-white",
                  level === "beginner" && "bg-emerald-500",
                  level === "intermediate" && "bg-amber-500",
                  level === "advanced" && "bg-rose-500"
                )}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {description && (
            <p className="text-dark-500 text-sm mb-3 line-clamp-2">{description}</p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-dark-50 text-dark-600 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-dark-500">
              {views && (
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {views} views
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {duration}
                </span>
              )}
            </div>
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-accent-500 fill-accent-500" />
                <span className="font-semibold text-dark-700">{rating}</span>
              </div>
            )}
          </div>

          {/* Progress bar if enrolled */}
          {progress !== undefined && (
            <div className="mt-3 pt-3 border-t border-dark-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-dark-500">Progress</span>
                <span className="font-medium text-primary-600">{progress}%</span>
              </div>
              <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}





