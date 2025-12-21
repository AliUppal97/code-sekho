"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Play, Clock, Eye, ThumbsUp, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "@/lib/utils";

interface VideoCardProps {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: number; // in seconds
  views?: number;
  likes?: number;
  publishedAt?: Date;
  courseTitle?: string;
  variant?: "default" | "list" | "grid-compact";
  className?: string;
}

export function VideoCard({
  id,
  title,
  description,
  thumbnailUrl,
  duration,
  views,
  likes,
  publishedAt,
  courseTitle,
  variant = "default",
  className,
}: VideoCardProps) {
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatViews = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  if (variant === "list") {
    return (
      <Link href={`/dashboard/video/${id}`}>
        <motion.div
          whileHover={{ x: 4 }}
          className={cn(
            "flex gap-3 p-2 rounded-xl hover:bg-dark-50 transition-all duration-200 group",
            className
          )}
        >
          {/* Thumbnail */}
          <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-dark-100">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-course-gradient flex items-center justify-center">
                <Play className="h-6 w-6 text-white/80" />
              </div>
            )}
            {duration && (
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-dark-900/80 rounded text-xs text-white font-medium">
                {formatDuration(duration)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 py-1">
            <h4 className="font-medium text-dark-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
              {title}
            </h4>
            {courseTitle && (
              <p className="text-xs text-dark-500 mt-0.5">{courseTitle}</p>
            )}
            <div className="flex items-center gap-2 mt-1 text-xs text-dark-400">
              {views !== undefined && <span>{formatViews(views)} views</span>}
              {publishedAt && (
                <>
                  <span>•</span>
                  <span>{formatDistanceToNow(publishedAt)}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "grid-compact") {
    return (
      <Link href={`/dashboard/video/${id}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className={cn(
            "bg-white rounded-xl border border-dark-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden group",
            className
          )}
        >
          {/* Thumbnail */}
          <div className="relative aspect-video bg-dark-100">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-course-gradient flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
              </div>
            )}
            {duration && (
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-dark-900/80 rounded text-xs text-white font-medium">
                {formatDuration(duration)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3">
            <h4 className="font-medium text-dark-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
              {title}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-dark-400">
              {views !== undefined && <span>{formatViews(views)} views</span>}
              {publishedAt && (
                <>
                  <span>•</span>
                  <span>{formatDistanceToNow(publishedAt)}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default variant - Full featured
  return (
    <Link href={`/dashboard/video/${id}`}>
      <motion.div
        whileHover={{ y: -6 }}
        className={cn(
          "bg-white rounded-2xl border border-dark-100 shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden group",
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-dark-100">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-course-gradient">
              {/* Decorative C logo like in design */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-bold text-white/80">C</span>
              </div>
            </div>
          )}
          
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-dark-900/0 group-hover:bg-dark-900/20 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
              <Play className="h-6 w-6 text-primary-600 fill-primary-600 ml-1" />
            </div>
          </div>

          {/* Duration badge */}
          {duration && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-dark-900/80 rounded-md text-xs text-white font-medium">
              {formatDuration(duration)}
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent">
            <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {description && (
            <p className="text-dark-500 text-sm mb-3 line-clamp-2">{description}</p>
          )}

          {/* Meta row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-dark-500">
              {views !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatViews(views)} views
                </span>
              )}
              {publishedAt && (
                <span>{formatDistanceToNow(publishedAt)}</span>
              )}
            </div>
            {likes !== undefined && (
              <span className="flex items-center gap-1 text-dark-500">
                <ThumbsUp className="h-4 w-4" />
                {formatViews(likes)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}







