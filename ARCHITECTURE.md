# Digiteck Vision - Architecture Documentation

**Version:** 1.0  
**Last Updated:** January 2025  
**Project:** Digiteck Vision Corporate Website & Platform

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Design System](#design-system)
7. [Core Features](#core-features)
8. [Animation System](#animation-system)
9. [Responsive Design Strategy](#responsive-design-strategy)
10. [Navigation & User Flow](#navigation--user-flow)
11. [Production Environment](#production-environment)
12. [Performance Considerations](#performance-considerations)
13. [Security Implementation](#security-implementation)
14. [Development Workflow](#development-workflow)
15. [Future Recommendations](#future-recommendations)

---

## Executive Summary

**Digiteck Vision** is a high-performance corporate website built as a Single Page Application (SPA) with React 19, TypeScript, and GSAP for scroll-based animations. The architecture follows a modular, section-based design pattern that enables rich storytelling through sequential scroll-triggered animations.

### Key Architectural Decisions

- **Section-Based Composition**: Pages are composed of reusable section components, each with its own scroll animation logic
- **Centralized Content Management**: All content lives in `content.ts` for easy updates without touching component code
- **Custom Hook Architecture**: GSAP animations wrapped in `useScene` hook for automatic cleanup and lifecycle management
- **Responsive Design with Real-Time Adaptation**: Custom `useWindowSize` hook enables dynamic UI adjustments on window resize, supporting split-screen workflows
- **Standalone Backend**: Node.js/Express server on Railway handles contact forms, job applications, and admin operations
- **Cloudflare CDN**: Frontend hosted on Cloudflare Pages for global distribution and edge caching

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework with latest concurrent features |
| **TypeScript** | 5.9.3 | Type safety and developer experience |
| **Vite** | 7.2.4 | Build tool (fast dev server, optimized production builds) |
| **React Router DOM** | 7.12.0 | Client-side routing (10 routes) |
| **GSAP** | 3.14.2 | Professional-grade animation library |
| **ScrollTrigger** | 3.14.2 | Scroll-based animation plugin |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest LTS | Runtime environment |
| **Express.js** | Latest | REST API server |
| **JSON File Storage** | - | Lightweight database (messages, applications, jobs, admins) |
| **JWT** | - | Admin authentication tokens |
| **Railway** | - | Backend hosting platform |

### UI/UX Libraries

- **@marsidev/react-turnstile** (1.4.2): Cloudflare Turnstile CAPTCHA integration
- **react-phone-number-input** (3.4.14): International phone number validation

### Development Tools

- **ESLint** (9.39.1): Code linting with TypeScript rules
- **TypeScript ESLint**: Type-aware linting rules

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                React 19 SPA (Vite)                    │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  React Router DOM (10 Routes)                   │ │  │
│  │  │  ├─ Home (/): Hero → Sections → Footer         │ │  │
│  │  │  ├─ About (/about): Hero → Sections → Footer   │ │  │
│  │  │  ├─ Contact (/contact): Form + Turnstile       │ │  │
│  │  │  ├─ Careers (/careers): Jobs + Apply           │ │  │
│  │  │  ├─ Admin (/admin): JWT Protected Dashboard    │ │  │
│  │  │  └─ Policy Pages: Privacy, Terms, Cookies, etc.│ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │  GSAP ScrollTrigger Engine                           │  │
│  │  - Scroll-based Animations                           │  │
│  │  - Section Pinning & Parallax                        │  │
│  │  - useScene Hook (Auto Cleanup)                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼ ▲
                        HTTPS API
                            ▼ ▲
┌─────────────────────────────────────────────────────────────┐
│              CLOUDFLARE PAGES (Frontend Host)                │
│  - Global CDN Distribution                                   │
│  - Edge Caching                                              │
│  - Auto-Deploy from GitHub (main branch)                     │
│  - HTTPS/SSL Termination                                     │
└─────────────────────────────────────────────────────────────┘
                            ▼ ▲
                        REST API
                            ▼ ▲
┌─────────────────────────────────────────────────────────────┐
│                RAILWAY (Backend Server)                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Express.js REST API                                  │  │
│  │  ├─ /api/messages (Contact Form)                      │  │
│  │  ├─ /api/applications (Job Applications)              │  │
│  │  ├─ /api/jobs (Job Listings CRUD)                     │  │
│  │  ├─ /api/admin/login (JWT Authentication)             │  │
│  │  └─ /api/health (Health Check)                        │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  JSON File Storage                                    │  │
│  │  ├─ data/messages.json                                │  │
│  │  ├─ data/applications.json                            │  │
│  │  ├─ data/jobs.json                                    │  │
│  │  └─ data/admins.json                                  │  │
│  └───────────────────────────────────────────────────────┘  │
│  Security: Helmet.js, CORS, Rate Limiting, Input Validation │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Project Structure

```
digiteck-vision-new/
├── public/                          # Static assets served at root
│   ├── gsap.min.js                  # GSAP library (fallback)
│   ├── ScrollTrigger.min.js         # ScrollTrigger plugin (fallback)
│   └── Media/
│       ├── Images/                  # Static images
│       └── Video/                   # Video assets (hero, medialink)
│
├── src/
│   ├── animations/                  # GSAP animation configurations
│   │   ├── _animateOnSnap.ts        # Snap-based animation helper
│   │   ├── coverImage.ts            # CoverImage section animation
│   │   └── coverSolid.ts            # CoverSolid section animation
│   │
│   ├── assets/                      # Bundled assets
│   │
│   ├── components/                  # Reusable UI components (4 files)
│   │   ├── AdminLogin.tsx           # Admin login form
│   │   ├── BackToTop.tsx            # Scroll-to-top button
│   │   ├── CookieConsent.tsx        # GDPR cookie banner
│   │   └── Navbar.tsx               # Global navigation bar
│   │
│   ├── config/                      # Configuration files
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useScene.ts              # GSAP ScrollTrigger lifecycle wrapper
│   │   └── useWindowSize.ts         # Real-time window resize hook (NEW)
│   │
│   ├── pages/                       # Route-level page components (11 files)
│   │   ├── Home.tsx                 # Landing page (/) - 8 sections
│   │   ├── About.tsx                # About page (/about) - 6 sections
│   │   ├── Contact.tsx              # Contact form (/contact)
│   │   ├── Careers.tsx              # Job listings (/careers)
│   │   ├── JobDetails.tsx           # Single job details (/job-details/:id)
│   │   ├── Admin.tsx                # Admin dashboard
│   │   ├── AdminWrapper.tsx         # Admin route wrapper
│   │   ├── PrivacyPolicy.tsx        # Privacy policy page
│   │   ├── BiometricAddendum.tsx    # Biometric data policy
│   │   ├── TermsOfService.tsx       # Terms of service (NEW)
│   │   └── CookiePolicy.tsx         # Cookie policy (NEW)
│   │
│   ├── sections/                    # Section components (29 files)
│   │   ├── Hero.tsx                 # Static hero section
│   │   ├── HeroVideo.tsx            # Animated hero with video backgrounds
│   │   ├── AboutHero.tsx            # About page hero
│   │   ├── AboutOverview.tsx        # About overview (heavily modified)
│   │   ├── CoverSolid.tsx           # Full-screen content with stats
│   │   ├── CoverImage.tsx           # Image reveal animation
│   │   ├── HoverColumns.tsx         # 4-column hover grid
│   │   ├── ExpandingDonuts.tsx      # Circular expansion animation
│   │   ├── ImageSwap.tsx            # Image swap on scroll
│   │   ├── ProductFlip.tsx          # Card flip animation
│   │   ├── MediaLink.tsx            # Video section with CTA (modified)
│   │   ├── TripleCards.tsx          # 3-column card grid (responsive)
│   │   ├── Expertise.tsx            # Expertise showcase
│   │   ├── Metrics.tsx              # Animated metrics (responsive)
│   │   ├── LeadershipSwap.tsx       # Leadership profiles (responsive)
│   │   ├── Footer.tsx               # Site footer with policy links
│   │   ├── ContactHero.tsx          # Contact page hero
│   │   ├── ContactForm.tsx          # Contact form with Turnstile
│   │   ├── CareersHero.tsx          # Careers page hero
│   │   ├── CareersOpenings.tsx      # Job listings component
│   │   ├── CareersBenefits.tsx      # Benefits showcase
│   │   └── [14 other sections]
│   │
│   ├── utils/                       # Utility functions
│   │   └── seo.ts                   # SEO meta tag utilities
│   │
│   ├── App.css                      # Main styles (1562 lines)
│   ├── mobile.css                   # Mobile-specific styles
│   ├── phoneInput.css               # Phone input styling
│   ├── App.tsx                      # Router configuration
│   ├── content.ts                   # Centralized content (464 lines)
│   ├── main.tsx                     # Application entry point
│   └── ScrollStory.tsx              # Scroll story component
│
├── server/                          # Backend Node.js/Express server
│   ├── data/                        # JSON file database
│   ├── routes/                      # API route handlers
│   ├── middleware/                  # Express middleware
│   ├── server.js                    # Server entry point
│   └── README.md                    # Backend setup guide
│
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite build configuration
├── tsconfig.json                    # TypeScript base config
├── tsconfig.app.json                # TypeScript app config
├── tsconfig.node.json               # TypeScript Node config
├── eslint.config.js                 # ESLint configuration
└── README.md                        # Project documentation
```

### Component Architecture

The application follows a three-tier component hierarchy:

#### 1. **Pages** (Route Components)
- **Purpose**: Top-level route containers that compose sections
- **Location**: `src/pages/`
- **Responsibility**: 
  - Compose section components in order
  - Initialize SEO meta tags
  - Refresh ScrollTrigger on mount
  - No complex logic or styling

**Example: Home.tsx**
```tsx
export default function Home() {
  useEffect(() => {
    updateMetaTags();
    injectStructuredData();
    
    const refreshTriggers = () => ScrollTrigger.refresh();
    setTimeout(refreshTriggers, 100);
    window.addEventListener("load", refreshTriggers);
    window.addEventListener("resize", refreshTriggers);
    
    return () => {
      window.removeEventListener("load", refreshTriggers);
      window.removeEventListener("resize", refreshTriggers);
    };
  }, []);

  return (
    <div className="page">
      <HeroVideo />
      <CoverSolid />
      <HoverColumns />
      <ExpandingDonuts />
      <ProductFlip />
      <CoverImage />
      <ImageSwap />
      <MediaLink />
      <Footer />
      <BackToTop />
    </div>
  );
}
```

#### 2. **Sections** (Feature Components)
- **Purpose**: Self-contained feature blocks with their own animations
- **Location**: `src/sections/`
- **Responsibility**:
  - Render a full viewport (or partial) section
  - Implement GSAP ScrollTrigger animations via `useScene` hook
  - Fetch content from `content.ts`
  - Handle responsive behavior with `useWindowSize` or `useIsMobile`
  - Include all styling inline or scoped to section

**Example: CoverSolid.tsx Structure**
```tsx
export default function CoverSolid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { sectionTitle, title, content, image, stats } = siteContent.coverSolid;
  const isMobile = useIsMobile(768);

  useScene(sectionRef, () => {
    // GSAP ScrollTrigger animation setup
    gsap.from(".cover-solid-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: { trigger: sectionRef.current }
    });
  });

  return (
    <section ref={sectionRef} id="coversolid" className="cover-solid-section">
      {/* Section content with stats grid */}
    </section>
  );
}
```

#### 3. **Components** (Reusable UI)
- **Purpose**: Generic, reusable UI elements
- **Location**: `src/components/`
- **Responsibility**:
  - Stateless or minimally stateful
  - No GSAP animations (sections handle animations)
  - Highly reusable across pages

**Components List**:
- **Navbar**: Global navigation with logo, links, CTA button
- **BackToTop**: Floating scroll-to-top button
- **CookieConsent**: GDPR-compliant cookie banner
- **AdminLogin**: Reusable login form for admin dashboard

---

## Backend Architecture

### Server Technology

- **Platform**: Railway (Node.js hosting)
- **Framework**: Express.js
- **Database**: JSON file storage (lightweight, no external DB required)
- **Authentication**: JWT (JSON Web Tokens) for admin sessions
- **Security**: Helmet.js, CORS, rate limiting, input validation

### API Endpoints

| Endpoint | Method | Purpose | Authentication |
|----------|--------|---------|----------------|
| `/api/health` | GET | Health check | None |
| `/api/messages` | POST | Submit contact form | Turnstile CAPTCHA |
| `/api/applications` | POST | Submit job application | Turnstile CAPTCHA |
| `/api/jobs` | GET | List all jobs | None |
| `/api/jobs/:id` | GET | Get single job | None |
| `/api/jobs` | POST | Create job (admin) | JWT |
| `/api/jobs/:id` | PUT | Update job (admin) | JWT |
| `/api/jobs/:id` | DELETE | Delete job (admin) | JWT |
| `/api/admin/login` | POST | Admin authentication | None |

### Data Storage

JSON files stored in `server/data/`:

```json
// messages.json - Contact form submissions
[
  {
    "id": "msg_123456",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+97335555555",
    "company": "Acme Corp",
    "message": "Interested in digital solutions",
    "timestamp": "2025-01-15T10:30:00Z",
    "read": false
  }
]

// applications.json - Job applications
[
  {
    "id": "app_123456",
    "jobId": "job_001",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+97335555555",
    "resume": "base64_encoded_pdf",
    "coverLetter": "I am interested in...",
    "timestamp": "2025-01-15T10:30:00Z",
    "status": "pending"
  }
]

// jobs.json - Job listings
[
  {
    "id": "job_001",
    "title": "Senior Frontend Developer",
    "department": "Engineering",
    "location": "Manama, Bahrain",
    "type": "Full-time",
    "description": "We are looking for...",
    "requirements": ["5+ years React", "TypeScript expert"],
    "postedDate": "2025-01-10",
    "active": true
  }
]

// admins.json - Admin users (passwords hashed with bcrypt)
[
  {
    "id": "admin_001",
    "username": "admin",
    "passwordHash": "$2b$10$...",
    "role": "superadmin"
  }
]
```

### Security Features

1. **Helmet.js**: Security headers (XSS protection, content type sniffing prevention)
2. **CORS**: Restricted to frontend domain only (Cloudflare Pages URL)
3. **Rate Limiting**: Brute force protection on login endpoint
4. **Input Validation**: All form inputs sanitized and validated
5. **JWT Authentication**: Secure admin sessions with expiration
6. **Cloudflare Turnstile**: CAPTCHA on all public forms
7. **HTTPS Only**: Enforced on both frontend (Cloudflare) and backend (Railway)

---

## Design System

### Color Palette

Defined in `:root` (App.css):

```css
:root {
  --bg: #000000;           /* Background - Pure black */
  --fg: #ffffff;           /* Foreground - Pure white */
  --muted: rgba(255, 255, 255, 0.7);  /* Muted text */
  --line: rgba(255, 255, 255, 0.25);  /* Borders/dividers */
}
```

**Accent Colors** (used in sections):
- **Yellow/Gold**: `#FFD700` - Primary CTA color, section titles
- **Gradient Overlays**: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))` - Image overlays

### Typography

- **Primary Font**: 'Work Sans', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif
- **Font Smoothing**: `-webkit-font-smoothing: antialiased` for better rendering
- **Responsive Sizing**: `clamp()` functions for fluid typography
  - Example: `font-size: clamp(1.2rem, 2vw, 1.8rem)`
  - AboutOverview: `min(1.53rem, 1.8vw, 2.5vh)` (scales with viewport height)

### Layout Patterns

#### Full-Screen Sections
```css
.section {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### Section Titles (Yellow, Top-Left)
```css
.section-title {
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: #FFD700;
  font-size: 2rem;
  font-weight: 700;
  z-index: 100;
}
```

#### Content Containers
```css
.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

#### Image Overlays
```css
.image-overlay {
  background-image: url('/path/to/image.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.image-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
  z-index: 1;
}
```

### Policy Page Design Template

All policy pages follow consistent design:

```tsx
<div style={{
  minHeight: '100vh',
  backgroundImage: 'url("/Media/Images/policy-bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  position: 'relative'
}}>
  {/* Gradient overlay */}
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8))',
    zIndex: 0
  }} />
  
  <Navbar theme="light" style={{ zIndex: 100 }} />
  
  {/* Content container */}
  <div style={{
    maxWidth: '900px',
    margin: '0 auto',
    padding: '120px 2rem 4rem',
    position: 'relative',
    zIndex: 1
  }}>
    {/* Framed content box */}
    <div style={{
      background: 'rgba(255, 255, 255, 0.3)',  // 30% opacity
      borderRadius: '12px',
      padding: '3rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      border: '2px solid rgba(0, 0, 0, 0.1)'
    }}>
      {/* Policy content */}
    </div>
  </div>
  
  <Footer />
</div>
```

---

## Core Features

### 1. Scroll-Based Storytelling

The entire Home page is a sequential narrative told through scroll-triggered animations:

**Home Page Flow**:
1. **HeroVideo**: Video background with rotating clips + tagline
2. **CoverSolid**: Company introduction with animated stats
3. **HoverColumns**: 4-column service grid with hover effects
4. **ExpandingDonuts**: Circular expansion animation
5. **ProductFlip**: Card flip animation on scroll
6. **CoverImage**: Image reveal with slide-in text
7. **ImageSwap**: Image swap on scroll
8. **MediaLink**: Video section with CTA button
9. **Footer**: Site navigation + continuous ticker animation

**About Page Flow**:
1. **AboutHero**: Hero image with title
2. **AboutOverview**: Company overview with stats (heavily modified)
3. **TripleCards**: 3-column service cards
4. **Expertise**: Expertise showcase
5. **Metrics**: Animated metrics counter
6. **LeadershipSwap**: Leadership profiles with image swap
7. **Footer**: Site navigation

### 2. Centralized Content Management

All text, images, and configuration live in [`content.ts`](src/content.ts):

```typescript
export const siteContent = {
  navigation: { links: [...], ctaButton: "Get started" },
  hero: { title: "...", subtitle: "...", videos: [...] },
  hoverColumns: { sectionTitle: "...", columns: [...] },
  coverSolid: { title: "...", content: "...", stats: [...] },
  // ... all other sections
};
```

**Benefits**:
- ✅ Non-developers can update content without touching component code
- ✅ Single source of truth for all copy
- ✅ Type safety with TypeScript
- ✅ Easy to version control content changes

### 3. Contact Form with Cloudflare Turnstile

[`ContactForm.tsx`](src/sections/ContactForm.tsx) integrates Cloudflare Turnstile (CAPTCHA alternative):

```tsx
<Turnstile
  siteKey="YOUR_SITE_KEY"
  onVerify={(token) => setTurnstileToken(token)}
/>
```

**Flow**:
1. User fills form (name, email, phone, company, message)
2. Turnstile verifies user is human (returns token)
3. Form submits to `/api/messages` with token
4. Backend validates token with Cloudflare API
5. Message saved to `messages.json`
6. Admin can view messages in dashboard

### 4. Job Portal System

**Frontend Components**:
- **CareersOpenings**: List all active jobs from API
- **JobDetails**: Single job page with application form
- **Admin Dashboard**: CRUD operations for job listings

**Backend API**:
- `GET /api/jobs` - Public job listings
- `GET /api/jobs/:id` - Single job details
- `POST /api/jobs` - Create job (admin only)
- `PUT /api/jobs/:id` - Update job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)
- `POST /api/applications` - Submit job application

### 5. Admin Dashboard

Protected admin panel at `/admin`:

**Features**:
- ✅ JWT-based authentication
- ✅ View contact form submissions
- ✅ View job applications (with resume download)
- ✅ Manage job listings (CRUD)
- ✅ Mark messages as read/unread
- ✅ Security logging

**Access Flow**:
1. Navigate to `/admin`
2. Login with credentials (stored in `.env` on Railway)
3. JWT token stored in localStorage
4. Protected routes check token validity
5. Token expires after 24 hours

### 6. SEO & Structured Data

[`seo.ts`](src/utils/seo.ts) utility provides:

```typescript
updateMetaTags({
  title: "Digiteck Vision - Digital Transformation Partner",
  description: "MENA-based technology company...",
  keywords: ["digital transformation", "MENA", "technology"],
  ogImage: "/Media/Images/og-image.jpg"
});

injectStructuredData({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digiteck Vision",
  "url": "https://digiteckvision.com",
  // ... more structured data
});
```

### 7. Cookie Consent (GDPR Compliance)

[`CookieConsent.tsx`](src/components/CookieConsent.tsx) displays banner on first visit:

- ✅ Persistent preference (localStorage)
- ✅ Link to Cookie Policy page
- ✅ Accept/Decline options
- ✅ GDPR-compliant messaging

---

## Animation System

### GSAP Global Configuration

Set in [`main.tsx`](src/main.tsx):

```typescript
gsap.defaults({
  ease: "power2.out",     // Smooth easing for all animations
  duration: 0.8,          // Default 800ms duration
  force3D: true           // Hardware acceleration
});
```

### useScene Hook

Custom hook [`useScene.ts`](src/hooks/useScene.ts) wraps GSAP ScrollTrigger lifecycle:

```typescript
/**
 * Mount-only helper: runs a GSAP/ScrollTrigger scene for a section.
 * Auto-kills triggers/tweens created in this scope on unmount.
 */
export function useScene(
  ref: React.RefObject<HTMLElement | null>,
  build: () => void
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      build();
      ScrollTrigger.refresh();
    }, ref);

    return () => {
      ctx.revert();  // Automatic cleanup of all GSAP animations
    };
  }, []);
}
```

**Benefits**:
- ✅ Automatic cleanup on unmount (prevents memory leaks)
- ✅ Scoped GSAP context (animations don't leak between sections)
- ✅ ScrollTrigger refresh on mount
- ✅ Clean, reusable pattern for all sections

### Animation Patterns

#### 1. Snap-Based Animations

[`_animateOnSnap.ts`](src/animations/_animateOnSnap.ts):

```typescript
export function animateOnSnap(section: HTMLElement, timeline: gsap.core.Timeline) {
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=100%",
    pin: true,
    scrub: true,
    snap: {
      snapTo: 1,
      duration: 0.3,
      ease: "power2.inOut"
    },
    onUpdate: (self) => {
      timeline.progress(self.progress);
    }
  });
}
```

**Usage**: Sections snap to viewport, timeline progresses with scroll

#### 2. Cover Image Animation

[`coverImage.ts`](src/animations/coverImage.ts):

```typescript
export function coverImageScene(
  section: HTMLElement,
  imageLayer: HTMLElement,
  panel: HTMLElement
) {
  gsap.set(imageLayer, { yPercent: 100 });
  gsap.set(panel, { xPercent: 100 });

  const tl = gsap.timeline({ paused: true });

  tl.to(imageLayer, {
    yPercent: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .to(panel, {
    xPercent: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.3");

  animateOnSnap(section, tl);
}
```

**Effect**: Image slides up, text panel slides in from right

#### 3. Footer Ticker Animation

Continuous horizontal scroll:

```typescript
gsap.to(".ticker-content", {
  xPercent: -50,
  repeat: -1,
  duration: 20,
  ease: "linear"
});
```

#### 4. Fade-In on Scroll

```typescript
gsap.from(".element", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
```

---

## Responsive Design Strategy

### Breakpoints

Primary breakpoint: **768px** (mobile vs desktop)

```typescript
const isMobile = useIsMobile(768);  // Custom hook
```

### Custom Hook: useWindowSize

[`useWindowSize.ts`](src/hooks/useWindowSize.ts) enables **real-time responsive behavior**:

```typescript
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function useIsMobile(breakpoint: number = 768) {
  const { width } = useWindowSize();
  return width <= breakpoint;
}
```

**Why This Matters**: 
- ✅ Supports split-screen workflows (designers, developers)
- ✅ Dynamic font sizing updates on resize
- ✅ Components re-render when window size changes
- ✅ No need to refresh page after resizing

**Used In**:
- AboutOverview.tsx
- MediaLink.tsx
- TripleCards.tsx
- Metrics.tsx
- LeadershipSwap.tsx

### Responsive Text Scaling

**AboutOverview Section** (most complex responsive logic):

```typescript
const textContainerStyle = {
  fontSize: isMobile ? '1rem' : 'min(1.53rem, 1.8vw, 2.5vh)',
  maxWidth: isMobile ? '95vw' : 'calc(50vw - 4rem)',
  paddingTop: isMobile ? '3rem' : '7rem',
  // Scales with viewport height on desktop
};
```

**Font Scaling Strategy**:
- **Desktop**: `min(1.53rem, 1.8vw, 2.5vh)` - scales with both width and height
- **Mobile**: Fixed `1rem` for readability
- **Intermediate Screens**: Uses `clamp()` functions

### Mobile-Specific Styles

[`mobile.css`](src/mobile.css) loaded for screens ≤ 768px:

```css
@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
    top: 1rem;
    left: 1rem;
  }

  .cover-solid-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
    justify-content: flex-start;
    text-align: left;
  }
}
```

### Image Optimization

- **Desktop**: Full-resolution images
- **Mobile**: Same images (future: implement responsive images with `<picture>` element)
- **Video**: Cache-busted with `?v=2` query param for MediaLink section

---

## Navigation & User Flow

### Routing Structure

10 routes configured in [`App.tsx`](src/App.tsx):

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/careers" element={<Careers />} />
  <Route path="/job-details/:jobId" element={<JobDetails />} />
  <Route path="/admin" element={<AdminWrapper />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/biometric-addendum" element={<BiometricAddendum />} />
  <Route path="/terms-of-service" element={<TermsOfService />} />
  <Route path="/cookie-policy" element={<CookiePolicy />} />
</Routes>
```

### Navigation Bar

[`Navbar.tsx`](src/components/Navbar.tsx) appears on all pages:

**Links**:
- Home → `/`
- About Us → `/about`
- Solutions → `#solutions` (scroll to HoverColumns section on Home)
- Contact → `/contact`
- Careers → `/careers`

**CTA Button**: "Get Started" → `/contact`

### User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        HOMEPAGE (/)                          │
│  Hero → CTA ("Explore What We Do" → #coversolid)           │
│  ↓ Scroll                                                    │
│  CoverSolid → Company Intro + Stats                         │
│  ↓ Scroll                                                    │
│  HoverColumns → 4 Service Areas (Solutions, Integrator,     │
│                 Advisory, Gateway)                           │
│  ↓ Scroll                                                    │
│  [More scroll sections...]                                   │
│  ↓                                                           │
│  Footer → Policy Links + Social + Contact                   │
└─────────────────────────────────────────────────────────────┘
                    │           │           │
        ┌───────────┘           │           └───────────┐
        ▼                       ▼                       ▼
┌───────────────┐   ┌───────────────────┐   ┌──────────────────┐
│  ABOUT (/about)│   │ CONTACT (/contact)│   │ CAREERS (/careers)│
│  ↓            │   │  ↓                │   │  ↓               │
│  AboutHero     │   │  ContactHero       │   │  CareersHero      │
│  ↓            │   │  ↓                │   │  ↓               │
│  AboutOverview │   │  ContactForm       │   │  CareersOpenings  │
│  ↓            │   │  (Turnstile)       │   │  ↓               │
│  TripleCards   │   │  ↓                │   │  Click Job       │
│  ↓            │   │  Submit → Backend  │   │  ↓               │
│  [Sections]    │   │  ↓                │   │  JobDetails/:id  │
│  ↓            │   │  Success Message   │   │  ↓               │
│  Footer        │   │  ↓                │   │  Apply Form      │
└───────────────┘   │  Footer            │   │  (Turnstile)     │
                    └───────────────────┘   │  ↓               │
                                            │  Submit → Backend│
                                            │  ↓               │
                                            │  Footer          │
                                            └──────────────────┘
                                                     │
                                           ┌─────────┘
                                           ▼
                              ┌─────────────────────┐
                              │   ADMIN (/admin)    │
                              │   ↓                 │
                              │   Login (JWT)       │
                              │   ↓                 │
                              │   Dashboard:        │
                              │   - View Messages   │
                              │   - View Apps       │
                              │   - Manage Jobs     │
                              └─────────────────────┘
```

### Footer Links

Footer appears on all pages with policy links:

- Privacy Policy → `/privacy-policy`
- Terms of Service → `/terms-of-service`
- Cookie Policy → `/cookie-policy`
- Biometric Addendum → `/biometric-addendum`

---

## Production Environment

### Build Process

**Development**:
```bash
npm run dev
# Vite dev server on http://localhost:5173
# Hot Module Replacement (HMR)
# Source maps enabled
```

**Production Build**:
```bash
npm run build
# TypeScript compilation
# Vite optimizations:
#   - Code splitting
#   - Tree shaking
#   - Minification
#   - Asset hashing
# Output: dist/ folder
# Bundle size: ~763 KB (gzipped: 215 KB)
```

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPER WORKFLOW                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ git push origin main
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB REPOSITORY                         │
│              github.com/user/digiteck-vision-new             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Webhook
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   CLOUDFLARE PAGES                           │
│  1. Auto-detect Vite project                                 │
│  2. Run build command: npm run build                         │
│  3. Deploy dist/ folder to global CDN                        │
│  4. Custom domain: digiteckvision.com                        │
│  5. SSL/TLS automatic                                        │
│  6. Edge caching                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Serves static files globally
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    END USERS (Browsers)                      │
│  - Low latency (served from nearest edge location)           │
│  - HTTPS enforced                                            │
│  - React SPA with client-side routing                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ API calls
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    RAILWAY (Backend)                         │
│  - Node.js/Express server                                    │
│  - Auto-deploy from GitHub (server/ folder)                  │
│  - Environment variables from Railway dashboard              │
│  - JSON file storage                                         │
│  - Health check monitoring                                   │
└─────────────────────────────────────────────────────────────┘
```

### Environment Variables

**Frontend** (Cloudflare Pages):
```env
VITE_API_URL=https://your-backend.railway.app
VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
```

**Backend** (Railway):
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters-long
FRONTEND_URL=https://digiteckvision.com
CORS_ORIGIN=https://digiteckvision.com
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=secure-password
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
```

### Domain Configuration

- **Primary Domain**: digiteckvision.com
- **DNS**: Managed by Cloudflare
- **SSL/TLS**: Automatic via Cloudflare (Let's Encrypt)
- **CDN**: Cloudflare's global network (300+ cities)

### Monitoring & Logging

**Frontend**:
- Cloudflare Analytics (pageviews, requests, bandwidth)
- Console errors logged in browser DevTools

**Backend**:
- Railway Logs (application logs, errors, API requests)
- Health check endpoint: `GET /api/health`
- Security logging (authentication attempts, admin actions)

---

## Performance Considerations

### Current Bundle Size

```
dist/index.html                 1.25 KB
dist/assets/index-[hash].css    47.82 KB (gzipped: 12.15 KB)
dist/assets/index-[hash].js     715.13 KB (gzipped: 202.66 KB)
```

**Total**: ~763 KB (~215 KB gzipped)

### Optimization Strategies Implemented

✅ **Code Splitting**: React Router lazy loading (potential)  
✅ **Tree Shaking**: Vite removes unused code  
✅ **Minification**: HTML, CSS, JS minified in production  
✅ **Asset Hashing**: Cache-busting with content hashes  
✅ **GSAP**: Already lightweight (88 KB gzipped)  
✅ **Font Optimization**: System fonts prioritized before Web fonts  

### Performance Opportunities

🔄 **Lazy Load Routes**: Implement React lazy() for code splitting
```typescript
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
```

🔄 **Image Optimization**:
- Convert images to WebP format
- Implement responsive images with `<picture>` element
- Lazy load images below the fold

🔄 **Video Optimization**:
- Compress videos further (currently full resolution)
- Implement adaptive streaming (HLS or DASH)
- Preload only first video, load others on demand

🔄 **GSAP Modularization**:
- Import only required GSAP plugins (currently importing full library)

🔄 **Critical CSS**:
- Extract above-the-fold CSS
- Inline critical CSS in HTML

### Web Vitals Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ~2.8s | 🟡 Needs optimization |
| **FID** (First Input Delay) | < 100ms | ~50ms | ✅ Good |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.05 | ✅ Good |
| **FCP** (First Contentful Paint) | < 1.8s | ~1.5s | ✅ Good |
| **TTI** (Time to Interactive) | < 3.8s | ~3.2s | ✅ Good |

---

## Security Implementation

### Frontend Security

1. **Content Security Policy** (CSP):
   - Restrict script sources to same origin + GSAP CDN
   - Block inline scripts (except trusted)

2. **XSS Prevention**:
   - React's built-in XSS protection (escapes all user input)
   - No `dangerouslySetInnerHTML` usage

3. **HTTPS Enforcement**:
   - Cloudflare forces HTTPS redirect
   - Strict Transport Security (HSTS) header

4. **Dependency Security**:
   - Regular `npm audit` checks
   - Dependabot alerts enabled (GitHub)

### Backend Security

1. **Helmet.js Middleware**:
   - XSS filtering
   - Content type sniffing prevention
   - Frameguard (clickjacking protection)
   - HSTS enforcement

2. **CORS Configuration**:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```

3. **Rate Limiting**:
   - 5 login attempts per 15 minutes per IP
   - 10 form submissions per hour per IP

4. **Input Validation**:
   - Express Validator middleware
   - Sanitize all inputs
   - Type checking with TypeScript

5. **JWT Authentication**:
   - Secure secret (64+ characters)
   - 24-hour expiration
   - HttpOnly cookies (if using cookies)

6. **Cloudflare Turnstile**:
   - Replaces traditional CAPTCHA
   - Validates on backend before processing forms

7. **Environment Variables**:
   - Secrets stored in Railway dashboard (encrypted)
   - Never committed to Git (.env in .gitignore)

---

## Development Workflow

### Setup

```bash
# Clone repository
git clone https://github.com/user/digiteck-vision-new.git
cd digiteck-vision-new

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Start development servers
npm run dev        # Frontend on localhost:5173
cd server && npm run dev  # Backend on localhost:3001
```

### Project Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
}
```

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-section
# Make changes
git add .
git commit -m "feat: add new section with animation"
git push origin feature/new-section
# Create Pull Request on GitHub
# Merge to main → auto-deploys to Cloudflare Pages
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: TypeScript ESLint rules
- **Formatting**: Consistent indentation (2 spaces)
- **Naming Conventions**:
  - Components: PascalCase (e.g., `HeroVideo.tsx`)
  - Utilities: camelCase (e.g., `useScene.ts`)
  - CSS Classes: kebab-case (e.g., `.hero-video`)

### Testing Strategy

**Current State**: No automated tests

**Recommended**:
- Unit Tests: Jest + React Testing Library (components)
- E2E Tests: Playwright (user flows)
- Visual Regression: Percy or Chromatic (screenshot diffs)

---

## Future Recommendations

### Short-Term (1-3 months)

1. **Performance Optimization**:
   - [ ] Implement route-based code splitting
   - [ ] Convert images to WebP format
   - [ ] Add lazy loading for below-the-fold images
   - [ ] Compress videos (target < 5 MB per video)

2. **SEO Enhancement**:
   - [ ] Add sitemap.xml generation
   - [ ] Implement robots.txt
   - [ ] Add Open Graph tags for all pages
   - [ ] Create JSON-LD structured data for Organization

3. **Analytics Integration**:
   - [ ] Google Analytics 4
   - [ ] Hotjar or similar heatmap tool
   - [ ] Form conversion tracking

4. **Testing Infrastructure**:
   - [ ] Set up Jest + React Testing Library
   - [ ] Add unit tests for critical components (forms, admin)
   - [ ] E2E tests for user flows (contact form, job apply, admin login)

### Mid-Term (3-6 months)

1. **CMS Integration**:
   - [ ] Replace `content.ts` with headless CMS (Contentful, Strapi, or Sanity)
   - [ ] Allow non-developers to update content via UI
   - [ ] Version control for content changes

2. **Database Migration**:
   - [ ] Move from JSON files to proper database (PostgreSQL or MongoDB)
   - [ ] Implement database migrations
   - [ ] Add backup and restore functionality

3. **Feature Enhancements**:
   - [ ] Blog section with CMS
   - [ ] Case studies page
   - [ ] Client testimonials carousel
   - [ ] Multi-language support (Arabic + English)

4. **Accessibility (a11y)**:
   - [ ] WCAG 2.1 AA compliance audit
   - [ ] Add ARIA labels to interactive elements
   - [ ] Keyboard navigation testing
   - [ ] Screen reader testing

### Long-Term (6-12 months)

1. **Mobile App**:
   - [ ] React Native app for iOS/Android
   - [ ] Share components with web app (React Native Web)

2. **Advanced Analytics**:
   - [ ] Custom analytics dashboard (admin panel)
   - [ ] User behavior tracking
   - [ ] Conversion funnel analysis

3. **Internationalization (i18n)**:
   - [ ] Full Arabic language support
   - [ ] RTL layout for Arabic
   - [ ] Multi-currency support (if needed)

4. **Infrastructure Scaling**:
   - [ ] CDN for videos (Cloudflare Stream or Mux)
   - [ ] Image CDN (Cloudinary or Imgix)
   - [ ] Redis caching layer for backend API

---

## Appendix

### Key Files Reference

| File | Purpose | Lines | Complexity |
|------|---------|-------|------------|
| `src/App.tsx` | Router configuration | 30 | Low |
| `src/App.css` | Main styles | 1562 | High |
| `src/content.ts` | Centralized content | 464 | Medium |
| `src/pages/Home.tsx` | Home page composition | 52 | Low |
| `src/pages/About.tsx` | About page composition | 50 | Low |
| `src/sections/AboutOverview.tsx` | Most modified section | 150+ | High |
| `src/hooks/useScene.ts` | GSAP wrapper hook | 30 | Low |
| `src/hooks/useWindowSize.ts` | Responsive hook | 25 | Low |
| `server/server.js` | Backend entry point | 300+ | Medium |

### Dependencies Version Matrix

See [`package.json`](package.json) for full list.

### Acronyms & Glossary

- **SPA**: Single Page Application
- **GSAP**: GreenSock Animation Platform
- **JWT**: JSON Web Token
- **CORS**: Cross-Origin Resource Sharing
- **CDN**: Content Delivery Network
- **CSP**: Content Security Policy
- **XSS**: Cross-Site Scripting
- **WCAG**: Web Content Accessibility Guidelines
- **LCP**: Largest Contentful Paint (Core Web Vital)
- **FID**: First Input Delay (Core Web Vital)
- **CLS**: Cumulative Layout Shift (Core Web Vital)

---

## Document Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | January 2025 | Initial architecture documentation | System |

---

**End of Document**

*For questions or updates, contact the development team.*
