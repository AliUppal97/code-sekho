"use client";

import { Phone, Mail, MapPin, Clock, ShieldCheck, Headset, Building2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card, Button, Input, Textarea, Badge } from "@/components/ui";

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team"
        description="Partner with us, request a demo, or get support. We respond within one business day."
        align="center"
        actions={
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="mailto:contact@codesekho.com">Email us</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+923001234567">Call sales</a>
            </Button>
          </div>
        }
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 p-6 sm:p-8 space-y-6 border-dark-100">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-dark-900">Send us a message</h2>
            <p className="text-dark-600">
              Tell us what you need and we’ll follow up with the right specialist.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Full name" required aria-label="Full name" />
              <Input type="email" placeholder="Work email" required aria-label="Work email" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Company" aria-label="Company" />
              <Input placeholder="Role" aria-label="Role" />
            </div>
            <Input placeholder="Topic (partnership, demo, support)" aria-label="Topic" />
            <Textarea placeholder="How can we help?" rows={4} required aria-label="Message" />
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" type="submit">Submit</Button>
              <Badge variant="secondary" className="text-sm">Response in &lt;24h</Badge>
              <Badge variant="secondary" className="text-sm flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> We keep your data private
              </Badge>
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-5 space-y-3 border-dark-100">
            <h3 className="text-lg font-semibold text-dark-900">Reach us directly</h3>
            <div className="space-y-3 text-sm text-dark-600">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-dark-500">Phone</p>
                  <p className="font-semibold text-dark-900">+92 300 1234567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-dark-500">Email</p>
                  <p className="font-semibold text-dark-900">contact@codesekho.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-dark-500">Hours</p>
                  <p className="font-semibold text-dark-900">Mon–Fri, 9am–6pm PKT</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-dark-500">Office</p>
                  <p className="font-semibold text-dark-900">Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-5 space-y-3 border-dark-100">
            <h3 className="text-lg font-semibold text-dark-900 flex items-center gap-2">
              <Headset className="h-5 w-5 text-primary-600" /> Priority support
            </h3>
            <p className="text-sm text-dark-600">
              SLAs for enterprise customers with dedicated success managers.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="mailto:partnerships@codesekho.com">Email partnerships</a>
            </Button>
          </Card>
          <Card className="p-5 space-y-3 border-dark-100">
            <h3 className="text-lg font-semibold text-dark-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary-600" /> Enterprise demo
            </h3>
            <p className="text-sm text-dark-600">
              Looking to upskill your team or build a custom academy? Let’s design the right solution together.
            </p>
            <Button variant="default" className="w-full" asChild>
              <a href="mailto:partnerships@codesekho.com">Book a demo</a>
            </Button>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
