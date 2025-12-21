"use client";

import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Input, Button, Badge } from "@/components/ui";

export default function AccountProfilePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Account"
        title="Profile and preferences"
        description="Keep your information current for smoother onboarding, billing, and certificates."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <Card className="p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-600 font-semibold">Profile</p>
              <h2 className="text-xl font-semibold text-dark-900">Basic information</h2>
            </div>
            <Badge variant="secondary">Synced</Badge>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Full name" defaultValue="John Doe" />
            <Input placeholder="Email" defaultValue="john@example.com" />
            <Input placeholder="Role" defaultValue="Software Engineer" />
            <Input placeholder="Company" defaultValue="Acme Inc." />
          </div>
          <div className="flex gap-3">
            <Button>Save changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </Card>

        <Card className="p-6 sm:p-7 space-y-4">
          <div>
            <p className="text-sm text-primary-600 font-semibold">Preferences</p>
            <h3 className="text-lg font-semibold text-dark-900">Notifications</h3>
          </div>
          <div className="space-y-2 text-sm text-dark-600">
            <p>Set notification preferences in your dashboard settings. Email, in-app, and push supported.</p>
          </div>
          <Button variant="outline">Manage in dashboard</Button>
        </Card>
      </section>
    </PageShell>
  );
}




