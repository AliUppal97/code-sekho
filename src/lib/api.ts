// ============================================================================
// API Layer - Enterprise-grade API utilities
// ============================================================================

import { API_BASE_URL, API_TIMEOUT, ERROR_MESSAGES } from './constants';
import type { ApiResponse, PaginatedResponse, ApiError } from '@/types';

// Custom error class for API errors
export class ApiException extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

// HTTP client configuration
interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

// Create URL with query params
function createUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
  const url = new URL(endpoint, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

// Base fetch wrapper with timeout and error handling
async function baseFetch<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { params, timeout = API_TIMEOUT, ...fetchConfig } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const url = createUrl(endpoint, params);
    const response = await fetch(url, {
      ...fetchConfig,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchConfig.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiException(
        errorData.error?.code || 'API_ERROR',
        errorData.error?.message || ERROR_MESSAGES.GENERIC,
        response.status,
        errorData.error?.details
      );
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiException) {
      throw error;
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiException('TIMEOUT', 'Request timeout', 408);
    }
    
    throw new ApiException('NETWORK_ERROR', ERROR_MESSAGES.NETWORK, 0);
  }
}

// HTTP methods
export const api = {
  get: <T>(endpoint: string, config?: RequestConfig): Promise<T> =>
    baseFetch<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    baseFetch<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    baseFetch<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    baseFetch<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, config?: RequestConfig): Promise<T> =>
    baseFetch<T>(endpoint, { ...config, method: 'DELETE' }),
};

// Auth helpers
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}

// Authenticated request helper
export function withAuth(config: RequestConfig = {}): RequestConfig {
  const token = getAuthToken();
  if (!token) return config;
  
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}

// ============================================================================
// API Endpoints - Organized by domain
// ============================================================================

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ user: any; token: string }>>('/auth/login', { email, password }),
  
  signup: (data: { name: string; email: string; password: string }) =>
    api.post<ApiResponse<{ user: any; token: string }>>('/auth/signup', data),
  
  logout: () =>
    api.post<ApiResponse<null>>('/auth/logout', null, withAuth()),
  
  me: () =>
    api.get<ApiResponse<any>>('/auth/me', withAuth()),
  
  forgotPassword: (email: string) =>
    api.post<ApiResponse<null>>('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    api.post<ApiResponse<null>>('/auth/reset-password', { token, password }),
};

// Courses API
export const coursesApi = {
  getAll: (params?: { page?: number; limit?: number; category?: string; level?: string; search?: string }) =>
    api.get<PaginatedResponse<any>>('/courses', { params }),
  
  getById: (id: string) =>
    api.get<ApiResponse<any>>(`/courses/${id}`),
  
  getBySlug: (slug: string) =>
    api.get<ApiResponse<any>>(`/courses/slug/${slug}`),
  
  getFeatured: () =>
    api.get<ApiResponse<any[]>>('/courses/featured'),
  
  getCategories: () =>
    api.get<ApiResponse<any[]>>('/courses/categories'),
  
  enroll: (courseId: string) =>
    api.post<ApiResponse<null>>(`/courses/${courseId}/enroll`, null, withAuth()),
  
  getProgress: (courseId: string) =>
    api.get<ApiResponse<any>>(`/courses/${courseId}/progress`, withAuth()),
};

// Interview Prep API
export const interviewApi = {
  getSubjects: () =>
    api.get<ApiResponse<any[]>>('/interview/subjects'),
  
  getCompanies: () =>
    api.get<ApiResponse<any[]>>('/interview/companies'),
  
  getSubjectCourses: (slug: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<any>>(`/interview/subjects/${slug}/courses`, { params }),
  
  getCompanyCourses: (slug: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<any>>(`/interview/companies/${slug}/courses`, { params }),
  
  getCompanyDetails: (slug: string) =>
    api.get<ApiResponse<any>>(`/interview/companies/${slug}`),
};

// Videos API
export const videosApi = {
  getAll: (params?: { page?: number; limit?: number; sort?: string; filter?: string }) =>
    api.get<PaginatedResponse<any>>('/videos', { params }),
  
  getById: (id: string) =>
    api.get<ApiResponse<any>>(`/videos/${id}`),
  
  getRelated: (id: string) =>
    api.get<ApiResponse<any[]>>(`/videos/${id}/related`),
  
  updateProgress: (id: string, progress: number) =>
    api.patch<ApiResponse<null>>(`/videos/${id}/progress`, { progress }, withAuth()),
};

// Members API
export const membersApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string; search?: string }) =>
    api.get<PaginatedResponse<any>>('/members', { ...withAuth(), params }),
  
  getById: (id: string) =>
    api.get<ApiResponse<any>>(`/members/${id}`, withAuth()),
  
  update: (id: string, data: any) =>
    api.patch<ApiResponse<any>>(`/members/${id}`, data, withAuth()),
  
  updateStatus: (id: string, status: string) =>
    api.patch<ApiResponse<null>>(`/members/${id}/status`, { status }, withAuth()),
};

// Analytics API
export const analyticsApi = {
  getOverview: () =>
    api.get<ApiResponse<any>>('/analytics/overview', withAuth()),
  
  getStudentGrowth: (period: 'week' | 'month' | 'year') =>
    api.get<ApiResponse<any[]>>('/analytics/students', { ...withAuth(), params: { period } }),
  
  getRevenue: (period: 'week' | 'month' | 'year') =>
    api.get<ApiResponse<any[]>>('/analytics/revenue', { ...withAuth(), params: { period } }),
  
  getCoursePerformance: () =>
    api.get<ApiResponse<any[]>>('/analytics/courses', withAuth()),
};

// User API
export const userApi = {
  getProfile: () =>
    api.get<ApiResponse<any>>('/user/profile', withAuth()),
  
  updateProfile: (data: any) =>
    api.patch<ApiResponse<any>>('/user/profile', data, withAuth()),
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post<ApiResponse<null>>('/user/change-password', { currentPassword, newPassword }, withAuth()),
  
  getEnrolledCourses: () =>
    api.get<ApiResponse<any[]>>('/user/courses', withAuth()),
  
  getNotifications: () =>
    api.get<ApiResponse<any[]>>('/user/notifications', withAuth()),
  
  markNotificationRead: (id: string) =>
    api.patch<ApiResponse<null>>(`/user/notifications/${id}/read`, null, withAuth()),
};



