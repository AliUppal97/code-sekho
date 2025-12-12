# CodeSekho - Learn to Code with Industry Experts

<div align="center">
  <h3>🚀 A Production-Ready, Enterprise-Level Coding Education Platform</h3>
  <p>Built with Next.js 15, TypeScript, TailwindCSS, and modern best practices</p>
</div>

---

## ✨ Features

### 🎯 Core Features
- **Landing Page** - Beautiful, modern landing page with hero section, features, courses, testimonials, and contact form
- **Authentication** - Login and Sign Up pages with social authentication support
- **Dashboard** - Comprehensive student dashboard with progress tracking
- **Interview Preparation** - Subject-wise and company-wise interview prep courses
- **Video Lectures** - Full-featured video player with course progress tracking
- **Members Management** - Admin panel for managing platform members
- **Analytics Dashboard** - Detailed analytics with charts and metrics
- **Settings** - User profile, account, notifications, and billing settings

### 🛠 Technical Features
- **TypeScript** - Full type safety across the codebase
- **App Router** - Next.js 15 App Router for optimal performance
- **Server Components** - Leveraging React Server Components where applicable
- **State Management** - Zustand for lightweight, scalable state management
- **Animations** - Smooth animations with Motion (Framer Motion)
- **Responsive Design** - Mobile-first responsive design
- **Design System** - Comprehensive UI component library
- **SEO Optimized** - Proper meta tags, Open Graph, and structured data

## 🏗 Project Structure

```
codesekho/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── dashboard/         # Dashboard routes
│   │   │   ├── analytics/
│   │   │   ├── crash-course/
│   │   │   ├── interview-prep/
│   │   │   ├── members/
│   │   │   ├── settings/
│   │   │   └── video/[id]/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Landing page
│   │
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/          # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── CoursesSection.tsx
│   │   │   └── ...
│   │   └── ui/                # Reusable UI components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       └── ...
│   │
│   ├── lib/                   # Utility functions
│   │   └── utils.ts
│   │
│   ├── store/                 # Zustand stores
│   │   └── useStore.ts
│   │
│   └── types/                 # TypeScript types
│       └── index.ts
│
├── public/                    # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codesekho.git
   cd codesekho
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Testing

```bash
npm run test
```

## 🎨 Design System

### Color Palette
- **Primary (Teal):** `#0B9586` - Used for primary actions, links, and accents
- **Accent (Gold):** `#FFB800` - Used for highlights, badges, and CTAs
- **Dark:** `#1E1E26` - Used for text and dark backgrounds
- **Surface:** `#F8F9FA` - Used for page backgrounds

### Typography
- **Display Font:** Space Grotesk - Used for headings
- **Body Font:** DM Sans - Used for body text
- **Mono Font:** JetBrains Mono - Used for code snippets

### Components
All UI components are built with:
- **Class Variance Authority (CVA)** for variant management
- **Tailwind Merge** for class deduplication
- **Fully accessible** with proper ARIA attributes
- **Responsive** across all breakpoints

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Public landing page with all marketing sections |
| Login | `/login` | User authentication page |
| Sign Up | `/signup` | New user registration |
| Dashboard | `/dashboard` | Student dashboard with progress |
| Interview Prep | `/dashboard/interview-prep` | Interview preparation courses |
| Video Player | `/dashboard/video/[id]` | Video lecture player |
| Members | `/dashboard/members` | Member management (admin) |
| Analytics | `/dashboard/analytics` | Platform analytics |
| Settings | `/dashboard/settings` | User settings and preferences |
| Crash Courses | `/dashboard/crash-course` | Quick crash courses |

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# API Base URL for frontend fetchers
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Logging
LOG_LEVEL=info
```

### Backend API (App Router)
- **Health**: `GET /api/health`
- **Courses**:
  - `GET /api/courses` with optional `page`, `limit`, `category`, `level`, `search`
  - `GET /api/courses/featured`
  - `GET /api/courses/:id`

All handlers use structured logging (`pino`), zod validation, and a shared `AppError`/`ApiResponse` envelope. Extend by adding new modules under `src/server/modules/<domain>` and wiring route handlers in `src/app/api/...`.

## 📦 Dependencies

### Core
- **next** - React framework
- **react** - UI library
- **typescript** - Type safety

### Styling
- **tailwindcss** - Utility-first CSS
- **class-variance-authority** - Component variants
- **clsx** - Conditional classes
- **tailwind-merge** - Class merging

### State & Data
- **zustand** - State management

### UI & Animation
- **lucide-react** - Icon library
- **motion** - Animation library

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [Figma](https://www.figma.com/design/tVjl07HbN7eyQ7Ae2aPX6y/Code-Sekho)
- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com)

---

<div align="center">
  <p>Built with ❤️ by the CodeSekho Team</p>
  <p>
    <a href="https://codesekho.com">Website</a> •
    <a href="https://twitter.com/codesekho">Twitter</a> •
    <a href="https://linkedin.com/company/codesekho">LinkedIn</a>
  </p>
</div>

