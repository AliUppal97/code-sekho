"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
} from "lucide-react";
import { Button, Input, Card } from "@/components/ui";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@codesekho.com",
    subtext: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 300 1234567",
    subtext: "Mon-Sat, 9am-6pm PKT",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Lahore, Pakistan",
    subtext: "DHA Phase 6",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Message sent successfully!");
  };

  return (
    <section className="section-padding bg-surface" id="contact">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-600 font-medium text-sm mb-4">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-heading-lg font-bold text-dark-900 mb-6">
              Get In Touch With{" "}
              <span className="gradient-text">Our Team</span>
            </h2>
            <p className="text-lg text-dark-500 mb-10">
              Have questions about our courses or need career guidance? We&apos;re
              here to help you succeed in your coding journey.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card
                      variant="elevated"
                      padding="md"
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-dark-500">{info.label}</p>
                        <p className="font-semibold text-dark-900">
                          {info.value}
                        </p>
                        <p className="text-xs text-dark-400">{info.subtext}</p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* FAQ prompt */}
            <Card
              variant="default"
              padding="md"
              className="bg-primary-50 border-primary-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 mb-1">
                    Have Questions?
                  </h4>
                  <p className="text-sm text-dark-600">
                    Check out our FAQ section for quick answers to common
                    questions about courses, payments, and more.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Content - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card variant="elevated" padding="lg" className="shadow-soft-lg">
              <h3 className="text-2xl font-bold text-dark-900 mb-2">
                Send us a Message
              </h3>
              <p className="text-dark-500 mb-6">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Your Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark-700">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us more about your query..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="flex w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-base text-dark-900 placeholder:text-dark-400 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="h-5 w-5" />}
                >
                  Send Message
                </Button>
              </form>

              <div className="flex items-center gap-2 mt-6 text-sm text-dark-500">
                <Clock className="h-4 w-4" />
                <span>We typically respond within 24 hours</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

