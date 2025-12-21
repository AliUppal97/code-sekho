# CodeSekho Backend Architecture

## Overview

This document describes the enterprise-grade, scalable, and type-safe backend architecture for CodeSekho.

## Architecture Principles

1. **Type Safety**: Full TypeScript with Zod validation schemas
2. **Scalability**: Modular architecture with clear separation of concerns
3. **Security**: JWT authentication, rate limiting, input validation
4. **Performance**: Optimized database queries with Prisma
5. **Maintainability**: Clean code structure with consistent patterns

## Directory Structure

```
src/server/
├── config/          # Configuration (environment variables)
├── core/            # Core utilities (auth, errors, http)
├── db/              # Database client (Prisma)
├── middleware/      # Request middleware (auth, rate limiting, validation)
├── modules/         # Feature modules
│   ├── auth/        # Authentication
│   ├── courses/     # Course management
│   ├── enrollments/ # Enrollment & progress tracking
│   ├── lessons/     # Lesson management
│   ├── reviews/     # Reviews & ratings
│   ├── payments/    # Payment processing (Stripe)
│   ├── notifications/ # Notifications
│   ├── interview-prep/ # Interview preparation
│   ├── analytics/   # Analytics & reporting
│   └── users/       # User management
├── utils/           # Utility functions (email, slug, etc.)
└── logger.ts        # Logging utility
```

## Core Components

### 1. Middleware Layer

#### Authentication (`middleware/auth.ts`)
- JWT token verification
- Role-based access control
- User session management

#### Rate Limiting (`middleware/rate-limit.ts`)
- Configurable rate limits per endpoint type
- IP-based and user-based limiting
- Prevents abuse and DDoS attacks

#### Validation (`middleware/validation.ts`)
- Zod schema validation
- Request body, query, and params validation
- Automatic error formatting

### 2. Module Structure

Each module follows a consistent structure:

```
module-name/
├── schema.ts    # Zod validation schemas
├── service.ts   # Business logic
└── route.ts     # Route handlers (optional)
```

### 3. API Routes

All API routes are in `src/app/api/` following Next.js App Router conventions:

- `GET /api/courses` - List courses
- `POST /api/courses` - Create course (Instructor/Admin)
- `GET /api/courses/[id]` - Get course by ID
- `PUT /api/courses/[id]` - Update course
- `DELETE /api/courses/[id]` - Delete course
- `GET /api/courses/featured` - Get featured courses

## Features Implemented

### Authentication & Authorization
- ✅ User registration with email verification
- ✅ Login with JWT tokens
- ✅ Password reset functionality
- ✅ Role-based access control (Student, Instructor, Admin)
- ✅ Protected routes with middleware

### Course Management
- ✅ Full CRUD operations for courses
- ✅ Course categories and tags
- ✅ Course search and filtering
- ✅ Featured courses
- ✅ Course publishing workflow

### Lesson Management
- ✅ Create, update, delete lessons
- ✅ Lesson ordering
- ✅ Resource attachments (PDF, code, links)
- ✅ Preview lessons for non-enrolled users

### Enrollment & Progress
- ✅ Course enrollment
- ✅ Video progress tracking
- ✅ Course completion tracking
- ✅ Progress analytics

### Reviews & Ratings
- ✅ Create and update reviews
- ✅ Rating aggregation
- ✅ Review moderation

### Payments
- ✅ Stripe payment integration
- ✅ Payment intent creation
- ✅ Webhook handling
- ✅ Payment history

### Notifications
- ✅ User notifications
- ✅ Notification types (Info, Success, Warning, Error)
- ✅ Mark as read functionality
- ✅ Unread count

### Interview Preparation
- ✅ Interview subjects management
- ✅ Company profiles
- ✅ Interview tips

### Analytics
- ✅ Overview dashboard
- ✅ Event tracking
- ✅ User analytics
- ✅ Revenue analytics

### User Management
- ✅ Profile management
- ✅ Role management (Admin only)
- ✅ User search and filtering

## Security Features

1. **Authentication**
   - JWT tokens with expiration
   - Password hashing with bcrypt (12 rounds)
   - Password strength validation

2. **Authorization**
   - Role-based access control
   - Resource ownership validation
   - Admin-only endpoints

3. **Rate Limiting**
   - General endpoints: 100 requests/minute
   - Auth endpoints: 5 requests/minute
   - Strict endpoints: 10 requests/minute

4. **Input Validation**
   - All inputs validated with Zod
   - SQL injection prevention (Prisma)
   - XSS prevention

5. **Error Handling**
   - Consistent error responses
   - Detailed error logging
   - No sensitive data exposure

## Database Schema

The database uses PostgreSQL with Prisma ORM. Key models:

- `User` - User accounts with roles
- `Course` - Course content
- `Lesson` - Individual lessons
- `Enrollment` - Course enrollments
- `VideoProgress` - Video watching progress
- `Review` - Course reviews
- `Payment` - Payment transactions
- `Notification` - User notifications
- `AnalyticsEvent` - Analytics tracking

## Environment Variables

Required environment variables (see `src/server/config/env.ts`):

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d

# Email (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=password
SMTP_FROM_EMAIL=noreply@codesekho.com
SMTP_FROM_NAME=CodeSekho

# Stripe (optional)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## API Response Format

All API responses follow a consistent format:

```typescript
{
  success: boolean;
  data: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
}
```

## Error Codes

- `BAD_REQUEST` (400) - Invalid input
- `UNAUTHORIZED` (401) - Authentication required
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `INTERNAL_ERROR` (500) - Server error

## Best Practices

1. **Type Safety**: Always use TypeScript types and Zod schemas
2. **Error Handling**: Use `withErrorHandling` wrapper for all routes
3. **Validation**: Validate all inputs with Zod schemas
4. **Rate Limiting**: Apply appropriate rate limits to all endpoints
5. **Authorization**: Check permissions before operations
6. **Logging**: Log important events and errors
7. **Database**: Use Prisma transactions for multi-step operations

## Testing

The backend is designed to be testable:

- Services are pure functions (easy to unit test)
- Database operations are abstracted through Prisma
- Mock-friendly architecture

## Performance Optimizations

1. **Database Indexing**: All foreign keys and frequently queried fields are indexed
2. **Query Optimization**: Use Prisma's `select` and `include` wisely
3. **Caching**: Ready for Redis integration
4. **Pagination**: All list endpoints support pagination

## Future Enhancements

- [ ] Email verification token storage
- [ ] Password reset token storage
- [ ] Refresh token rotation
- [ ] File upload handling
- [ ] Caching layer (Redis)
- [ ] Background job processing
- [ ] Real-time notifications (WebSockets)
- [ ] Advanced analytics dashboard
- [ ] API documentation (OpenAPI/Swagger)

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run database migrations: `npm run db:migrate`
4. Generate Prisma client: `npm run db:generate`
5. Start development server: `npm run dev`

## Support

For questions or issues, please refer to the main project documentation or create an issue in the repository.


