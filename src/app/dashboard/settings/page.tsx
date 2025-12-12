"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Save,
  Camera,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button, Card, Avatar, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+92 300 1234567",
    bio: "Software Developer passionate about learning new technologies.",
    avatar: null as string | null,
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    courseReminders: true,
    promotions: false,
    newCourses: true,
    comments: true,
    achievements: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Settings</h1>
        <p className="text-dark-500">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card variant="elevated" padding="sm">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all",
                      activeTab === tab.id
                        ? "bg-primary-50 text-primary-600"
                        : "text-dark-600 hover:bg-dark-50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>

          {/* Theme Toggle */}
          <Card variant="elevated" padding="md" className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon className="h-5 w-5 text-dark-500" />
                ) : (
                  <Sun className="h-5 w-5 text-accent-500" />
                )}
                <span className="font-medium text-dark-700">
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </span>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors",
                  isDarkMode ? "bg-primary-500" : "bg-dark-200"
                )}
              >
                <motion.div
                  animate={{ x: isDarkMode ? 24 : 2 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3"
        >
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card variant="elevated" padding="lg">
              <h2 className="text-xl font-bold text-dark-900 mb-6">
                Profile Information
              </h2>

              {/* Avatar Section */}
              <div className="flex items-center gap-6 pb-6 border-b border-dark-100 mb-6">
                <div className="relative">
                  <Avatar
                    src={profileData.avatar || undefined}
                    fallback={profileData.name}
                    size="xl"
                    className="w-24 h-24"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-600 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-900">Profile Photo</h3>
                  <p className="text-sm text-dark-500 mb-3">
                    JPG, GIF or PNG. Max size 2MB.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Upload Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-rose-600">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  leftIcon={<User className="h-5 w-5" />}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  leftIcon={<Mail className="h-5 w-5" />}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  leftIcon={<Globe className="h-5 w-5" />}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white text-dark-900 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-dark-100">
                <Button
                  onClick={handleSave}
                  isLoading={isSaving}
                  leftIcon={<Save className="h-4 w-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </Card>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <Card variant="elevated" padding="lg">
                <h2 className="text-xl font-bold text-dark-900 mb-6">
                  Change Password
                </h2>
                <div className="space-y-4 max-w-md">
                  <Input
                    label="Current Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    leftIcon={<Lock className="h-5 w-5" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-dark-400 hover:text-dark-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    }
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    leftIcon={<Lock className="h-5 w-5" />}
                    hint="Must be at least 8 characters"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                    leftIcon={<Lock className="h-5 w-5" />}
                  />
                  <Button className="mt-4">Update Password</Button>
                </div>
              </Card>

              <Card variant="elevated" padding="lg">
                <h2 className="text-xl font-bold text-dark-900 mb-2">
                  Delete Account
                </h2>
                <p className="text-dark-500 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="outline" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                  Delete Account
                </Button>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card variant="elevated" padding="lg">
              <h2 className="text-xl font-bold text-dark-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  { key: "emailUpdates", label: "Email Updates", desc: "Receive updates about your account via email" },
                  { key: "courseReminders", label: "Course Reminders", desc: "Get reminded about incomplete courses" },
                  { key: "promotions", label: "Promotions", desc: "Receive promotional emails about new offers" },
                  { key: "newCourses", label: "New Courses", desc: "Get notified when new courses are added" },
                  { key: "comments", label: "Comments & Replies", desc: "Notifications for comments on your content" },
                  { key: "achievements", label: "Achievements", desc: "Celebrate your learning milestones" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-4 border-b border-dark-50 last:border-0"
                  >
                    <div>
                      <h4 className="font-medium text-dark-900">{item.label}</h4>
                      <p className="text-sm text-dark-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          [item.key]: !notifications[item.key as keyof typeof notifications],
                        })
                      }
                      className={cn(
                        "relative w-12 h-6 rounded-full transition-colors",
                        notifications[item.key as keyof typeof notifications]
                          ? "bg-primary-500"
                          : "bg-dark-200"
                      )}
                    >
                      <motion.div
                        animate={{
                          x: notifications[item.key as keyof typeof notifications] ? 24 : 2,
                        }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6 pt-6 border-t border-dark-100">
                <Button
                  onClick={handleSave}
                  isLoading={isSaving}
                  leftIcon={<Save className="h-4 w-4" />}
                >
                  Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <Card variant="elevated" padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-dark-900">Current Plan</h2>
                    <p className="text-dark-500">Manage your subscription</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    Free Plan
                  </span>
                </div>
                <div className="p-4 bg-dark-50 rounded-xl mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-dark-900">Free Plan</h4>
                      <p className="text-sm text-dark-500">Access to basic courses</p>
                    </div>
                    <p className="text-2xl font-bold text-dark-900">$0<span className="text-sm font-normal text-dark-500">/mo</span></p>
                  </div>
                </div>
                <Button className="w-full">Upgrade to Premium</Button>
              </Card>

              <Card variant="elevated" padding="lg">
                <h2 className="text-xl font-bold text-dark-900 mb-4">
                  Payment Method
                </h2>
                <p className="text-dark-500 mb-4">
                  No payment method added yet.
                </p>
                <Button variant="outline" leftIcon={<CreditCard className="h-4 w-4" />}>
                  Add Payment Method
                </Button>
              </Card>

              <Card variant="elevated" padding="lg">
                <h2 className="text-xl font-bold text-dark-900 mb-4">
                  Billing History
                </h2>
                <p className="text-dark-500">No billing history available.</p>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
