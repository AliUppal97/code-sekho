"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, src, alt = "Avatar", fallback, size = "md", status, ...props },
    ref
  ) => {
    const sizeClasses = {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
    };

    const statusClasses = {
      online: "bg-green-500",
      offline: "bg-dark-400",
      away: "bg-amber-500",
      busy: "bg-red-500",
    };

    const statusSizeClasses = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-4 w-4",
    };

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div ref={ref} className={cn("relative inline-block", className)} {...props}>
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-medium overflow-hidden",
            sizeClasses[size]
          )}
        >
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
            />
          ) : (
            <span>{fallback ? getInitials(fallback) : "?"}</span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full ring-2 ring-white",
              statusClasses[status],
              statusSizeClasses[size]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

// Avatar Group
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 4, size = "md", ...props }, ref) => {
    const avatars = Array.isArray(children) ? children : [children];
    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    const overlapClasses = {
      xs: "-ml-1.5",
      sm: "-ml-2",
      md: "-ml-2.5",
      lg: "-ml-3",
      xl: "-ml-4",
    };

    const sizeClasses = {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
    };

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {visibleAvatars.map((avatar, index) => (
          <div
            key={index}
            className={cn(
              "relative ring-2 ring-white rounded-full",
              index > 0 && overlapClasses[size]
            )}
          >
            {avatar}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-dark-200 text-dark-600 font-medium ring-2 ring-white",
              overlapClasses[size],
              sizeClasses[size]
            )}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };

