// ============================================================================
// Application Constants
// Centralized configuration for the CodeSekho platform
// ============================================================================

// Application Info
export const APP_NAME = 'CodeSekho';
export const APP_DESCRIPTION = 'Learn to Code with Industry Experts';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 30000;

// Pagination Defaults
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// Navigation Links
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  {
    label: 'Interview Prep',
    href: '/interview-prep',
    children: [
      { label: 'By Subject', href: '/interview-prep/subjects' },
      { label: 'By Company', href: '/interview-prep/companies' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// Dashboard Sidebar Links
export const DASHBOARD_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'Home' },
  { label: 'Interview Preparation', href: '/dashboard/interview-prep', icon: 'GraduationCap' },
  { label: 'Crash Course', href: '/dashboard/crash-course', icon: 'Play' },
  { label: 'Members', href: '/dashboard/members', icon: 'Users' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
] as const;

// Course Levels
export const COURSE_LEVELS = [
  { value: 'beginner', label: 'Beginner', color: 'bg-emerald-500' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-amber-500' },
  { value: 'advanced', label: 'Advanced', color: 'bg-rose-500' },
] as const;

// Interview Subjects
export const INTERVIEW_SUBJECTS = [
  { id: '1', name: 'Data Structures', slug: 'data-structures', icon: 'Database', color: 'bg-primary-500', courseCount: 45 },
  { id: '2', name: 'Algorithms', slug: 'algorithms', icon: 'Code', color: 'bg-accent-500', courseCount: 38 },
  { id: '3', name: 'System Design', slug: 'system-design', icon: 'Server', color: 'bg-purple-500', courseCount: 24 },
  { id: '4', name: 'Operating Systems', slug: 'operating-systems', icon: 'Monitor', color: 'bg-emerald-500', courseCount: 18 },
  { id: '5', name: 'Database', slug: 'database', icon: 'Database', color: 'bg-rose-500', courseCount: 22 },
  { id: '6', name: 'Networking', slug: 'networking', icon: 'Network', color: 'bg-blue-500', courseCount: 15 },
  { id: '7', name: 'Object Oriented', slug: 'oop', icon: 'Boxes', color: 'bg-indigo-500', courseCount: 28 },
  { id: '8', name: 'Web Development', slug: 'web-development', icon: 'Globe', color: 'bg-cyan-500', courseCount: 52 },
] as const;

// Interview Companies
export const INTERVIEW_COMPANIES = [
  { id: '1', name: 'ARBISOFT', slug: 'arbisoft', logo: '/companies/arbisoft.png', color: 'bg-[#1A365D]', courseCount: 12, expectedSalary: '1,00,000', applicationLink: 'https://arbisoft.com/careers' },
  { id: '2', name: 'ARRIVY', slug: 'arrivy', logo: '/companies/arrivy.png', color: 'bg-[#F6AD55]', courseCount: 8, expectedSalary: '85,000', applicationLink: 'https://arrivy.com/careers' },
  { id: '3', name: 'BLACKSTACK', slug: 'blackstack', logo: '/companies/blackstack.png', color: 'bg-[#9F7AEA]', courseCount: 15, expectedSalary: '90,000', applicationLink: 'https://blackstack.com/careers' },
  { id: '4', name: 'BRAINX', slug: 'brainx', logo: '/companies/brainx.png', color: 'bg-[#48BB78]', courseCount: 10, expectedSalary: '95,000', applicationLink: 'https://brainx.com/careers' },
  { id: '5', name: 'BINARY BRIX', slug: 'binary-brix', logo: '/companies/binary-brix.png', color: 'bg-[#ED64A6]', courseCount: 6, expectedSalary: '80,000', applicationLink: 'https://binarybrix.com/careers' },
  { id: '6', name: 'CAREEM CODILITY', slug: 'careem', logo: '/companies/careem.png', color: 'bg-[#38A169]', courseCount: 20, expectedSalary: '1,50,000', applicationLink: 'https://careem.com/careers' },
] as const;

// Filter Tags
export const FILTER_TAGS = [
  'Programming',
  'Data Structures',
  'Algorithms',
  'System Design',
  'Database',
  'Web Development',
  'Mobile Development',
  'DevOps',
  'Machine Learning',
] as const;

// Video Tabs
export const VIDEO_TABS = ['All', 'Videos', 'Shorts', 'Playlists', 'About'] as const;

// Video Sort Options
export const VIDEO_SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'trending', label: 'Trending' },
] as const;

// Stats for Landing Page
export const LANDING_STATS = [
  { value: '50,000+', label: 'Active Students', icon: 'Users' },
  { value: '200+', label: 'Courses', icon: 'BookOpen' },
  { value: '95%', label: 'Success Rate', icon: 'Trophy' },
] as const;

// Features
export const FEATURES = [
  {
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience in top tech companies.',
    icon: 'Users',
  },
  {
    title: 'Practical Projects',
    description: 'Build real-world projects to strengthen your portfolio and skills.',
    icon: 'Code',
  },
  {
    title: 'Interview Prep',
    description: 'Company-specific interview preparation with mock interviews and coding challenges.',
    icon: 'Target',
  },
  {
    title: 'Career Support',
    description: 'Get personalized career guidance and job placement assistance.',
    icon: 'Briefcase',
  },
] as const;

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/codesekho',
  facebook: 'https://facebook.com/codesekho',
  linkedin: 'https://linkedin.com/company/codesekho',
  youtube: 'https://youtube.com/codesekho',
  instagram: 'https://instagram.com/codesekho',
  github: 'https://github.com/codesekho',
} as const;

// Contact Info
export const CONTACT_INFO = {
  email: 'contact@codesekho.com',
  phone: '+92 300 1234567',
  address: 'Lahore, Pakistan',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back!',
  SIGNUP: 'Account created successfully!',
  LOGOUT: 'Logged out successfully.',
  PROFILE_UPDATE: 'Profile updated successfully.',
  PASSWORD_CHANGE: 'Password changed successfully.',
} as const;



