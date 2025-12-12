"use client";

import { Navbar, Footer } from "@/components/layout";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  transparentNav?: boolean;
  className?: string;
  hideFooter?: boolean;
};

export function PageShell({
  children,
  transparentNav = false,
  className,
  hideFooter = false,
}: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar transparent={transparentNav} />
      <main className={cn("flex-1 pt-24", className)}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
