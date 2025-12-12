"use client";

import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Textarea, Input, Badge } from "@/components/ui";

export default function FeedbackPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Feedback"
        title="Help us improve"
        description="Share product feedback, feature requests, or report an issue. We review every submission."
        align="center"
        actions={
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="secondary" className="text-sm">Avg response &lt;24h</Badge>
            <Badge variant="secondary" className="text-sm">We read every submission</Badge>
          </div>
        }
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <Card className="p-6 sm:p-7 space-y-5 border-dark-100">
          <div className="space-y-2">
            <Badge variant="secondary">Open feedback</Badge>
            <p className="text-lg font-semibold text-dark-900">Tell us what you need</p>
            <p className="text-sm text-dark-600">This form is currently a UI placeholder—connect to your feedback backend when ready.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Name" aria-label="Name" />
            <Input placeholder="Email" aria-label="Email" />
          </div>
          <Input placeholder="Subject" aria-label="Subject" />
          <Input placeholder="Category (bug, idea, content, other)" aria-label="Category" />
          <Textarea rows={4} placeholder="Share details, links, or repro steps." aria-label="Message" />
          <div className="flex flex-wrap gap-3">
            <Button size="lg">Submit feedback</Button>
            <Button size="lg" variant="outline">Cancel</Button>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}


