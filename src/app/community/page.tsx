"use client";

import Link from "next/link";
import { Users, MessageSquare, CalendarRange, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Badge } from "@/components/ui";

const CHANNELS = [
  { title: "Discord", description: "Meet peers, join study groups, and attend live AMAs.", href: "#" },
  { title: "Forum", description: "Deep-dive threads, code reviews, and mentor replies.", href: "#" },
  { title: "Events", description: "Workshops, mock interviews, and career sessions weekly.", href: "#" },
];

export default function CommunityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community"
        title="Learn together, ship together"
        description="A global community of engineers leveling up through accountability, feedback, and shared wins."
        actions={
          <Button size="lg" asChild>
            <Link href="#">Join the community</Link>
          </Button>
        }
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {CHANNELS.map((item) => (
            <Card key={item.title} className="p-5 space-y-2">
              <Badge variant="secondary">{item.title}</Badge>
              <p className="text-sm text-dark-600">{item.description}</p>
              <Button size="sm" variant="ghost" className="px-0" asChild>
                <Link href={item.href}>
                  Explore <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}




