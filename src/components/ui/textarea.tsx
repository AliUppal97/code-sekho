"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border border-dark-200 bg-white px-3 py-2 text-sm text-dark-900 shadow-xs placeholder:text-dark-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:border-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-70",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

