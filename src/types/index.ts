// ============================================================================
// Core Types for CodeSekho Platform
// Enterprise-grade type definitions for scalability
// ============================================================================

// User & Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  enrolledCourses: string[];
  completedCourses: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'student' | 'instructor' | 'admin';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructor: Instructor;
  category: CourseCategory;
  tags: string[];
  level: CourseLevel;
  duration: number; // in minutes
  totalLessons: number;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  price: number;
  discountPrice?: number;
  isFeatured: boolean;
  isPublished: boolean;
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  courseCount: number;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  courseCount: number;
  studentCount: number;
  rating: number;
}

// Lesson & Video Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl: string;
  thumbnailUrl: string;
  order: number;
  isPreview: boolean;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
}

export type ResourceType = 'pdf' | 'code' | 'link' | 'file';

// Interview Preparation Types
export interface InterviewSubject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  courseCount: number;
  questionCount: number;
}

export interface InterviewCompany {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  industry: string;
  expectedSalary: string;
  applicationLink: string;
  hireDate: string;
  courseCount: number;
  questionCount: number;
  interviewTips: string[];
}

// Video & Content Types
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  courseId: string;
  tags: string[];
  publishedAt: Date;
}

export type VideoFilter = 'all' | 'videos' | 'shorts' | 'playlists';
export type VideoSort = 'latest' | 'popular' | 'trending';

// Analytics Types
export interface AnalyticsOverview {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  completionRate: number;
  avgRating: number;
  growth: AnalyticsGrowth;
}

export interface AnalyticsGrowth {
  students: number;
  revenue: number;
  courses: number;
}

export interface ChartData {
  label: string;
  value: number;
}

// Member Types
export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinedAt: Date;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalWatchTime: number;
  lastActive: Date;
  status: MemberStatus;
}

export type MemberStatus = 'active' | 'inactive' | 'suspended';

// Notification Types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// UI State Types
export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface SettingsFormData {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

// Course Filters for store
export interface CourseFilters {
  search?: string;
  category?: string;
  level?: CourseLevel;
  rating?: number;
  sortBy?: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
}
