# Vela Resort - Portfolio Project Documentation

## Overview

**Vela Resort** is a premium luxury Maldives resort website showcasing advanced frontend development, design systems, and interactive experiences. Built with React 19, Tailwind CSS 4, and Framer Motion, this project demonstrates production-grade code quality and award-winning design principles.

## Key Achievements

### Design & UX
- **Minimalist Luxury Aesthetic** — Editorial typography (Playfair Display + Inter), refined navy/gold/sand color palette, and elegant spacing
- **Glassmorphism Effects** — Modern frosted glass UI elements with backdrop blur for premium feel
- **Responsive Design** — Mobile-first approach tested at 375px, 768px, 1024px, and 4K displays
- **Dark Mode Support** — Full theme switching with persistent color tokens and smooth transitions
- **Smooth Animations** — Sub-300ms Framer Motion animations with custom cubic-bezier easings and GPU-accelerated transforms

### Technical Excellence
- **Component Architecture** — Reusable, accessible components extending shadcn/ui primitives
- **TypeScript Coverage** — Comprehensive type definitions for all major components and data structures
- **Animation System** — Centralized animation variants library with consistent motion design principles
- **Custom Hooks** — `useBooking` hook for booking state management, `useScrollReveal` for intersection observer patterns
- **Performance Optimized** — Lazy-loaded images, optimized bundle size, and efficient re-renders

### Interactive Features
1. **Interactive Image Lightbox** — Full-featured modal gallery with keyboard navigation, thumbnail strip, and image info
2. **Contact/Inquiry Form** — React Hook Form validation, Zod schema, glassmorphism styling, and Sonner toast notifications
3. **Availability Calendar** — Real-looking date picker with dynamic pricing based on peak seasons
4. **Booking Widget** — Glassmorphic form with date selection and guest count
5. **Gallery Section** — Hover-triggered overlays with click-to-expand lightbox integration

### SEO & Performance
- **Meta Tags** — Comprehensive Open Graph, Twitter Card, and canonical tags
- **Structured Data** — JSON-LD schema for hotel/business information
- **Image Optimization** — WebP format with responsive srcset attributes
- **Accessibility** — WCAG 2.1 compliant with focus states, keyboard navigation, and ARIA labels

## Project Structure

```
client/src/
├── components/
│   ├── Navbar.tsx              # Fixed navigation with mobile menu
│   ├── Hero.tsx                # Full-screen hero with cinematic background
│   ├── Villas.tsx              # Villa showcase with cards and pricing
│   ├── Experiences.tsx         # Curated experiences section
│   ├── Dining.tsx              # Fine dining with asymmetric layout
│   ├── Gallery.tsx             # Image gallery with lightbox integration
│   ├── ImageLightbox.tsx       # Interactive modal lightbox (NEW)
│   ├── Testimonials.tsx        # Guest testimonials with ratings
│   ├── AvailabilityCalendar.tsx # Booking calendar & pricing (NEW)
│   ├── ContactForm.tsx         # Contact/inquiry form (NEW)
│   ├── BookingWidget.tsx       # Glassmorphic booking card
│   ├── ThemeToggle.tsx         # Dark mode toggle button (NEW)
│   └── Footer.tsx              # Footer with links and contact info
├── hooks/
│   ├── useScrollReveal.ts      # Intersection observer for animations
│   └── useBooking.ts           # Booking state management (NEW)
├── lib/
│   ├── animations.ts           # Framer Motion variants (NEW)
│   └── utils.ts                # Utility functions
├── types/
│   └── index.ts                # TypeScript definitions (NEW)
├── pages/
│   ├── Home.tsx                # Main landing page
│   └── NotFound.tsx            # 404 page
├── contexts/
│   └── ThemeContext.tsx        # Theme provider and hooks
├── App.tsx                     # Root component with routing
├── main.tsx                    # React entry point
└── index.css                   # Global styles with design tokens
```

## Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion 12 |
| **UI Components** | shadcn/ui |
| **Routing** | Wouter 3 |
| **Forms** | React Hook Form |
| **Validation** | Zod |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Language** | TypeScript 5.6 |

## Key Features Breakdown

### 1. Interactive Lightbox Gallery
- **Keyboard Navigation** — Arrow keys to navigate, Escape to close
- **Thumbnail Strip** — Quick image selection with visual feedback
- **Smooth Animations** — Framer Motion gestures for enter/exit
- **Responsive** — Adapts to all screen sizes

### 2. Contact Form with Validation
- **Real-time Validation** — Zod schema with custom error messages
- **Glassmorphism Design** — Matches booking widget aesthetic
- **Toast Notifications** — Success/error feedback via Sonner
- **Accessible Inputs** — Proper labels and ARIA attributes

### 3. Availability Calendar
- **Dynamic Pricing** — Peak vs. regular season rates
- **Date Selection** — Native date picker with validation
- **Real-time Calculation** — Total price updates as dates change
- **Villa Comparison** — Switch between villas to see pricing

### 4. Dark Mode
- **Theme Toggle** — Floating button in bottom-right corner
- **Persistent Storage** — Theme preference saved to localStorage
- **Complete Coverage** — All components support light/dark modes
- **Smooth Transitions** — CSS transitions for theme changes

### 5. Animation System
- **Variants Library** — Reusable Framer Motion variants
- **Scroll Triggers** — `whileInView` for lazy animations
- **Stagger Effects** — Cascading reveals for grouped items
- **Reduced Motion** — Respects `prefers-reduced-motion` preference

## Design System

### Color Palette
```
Navy:       #0B1F3A (primary dark)
Navy Mid:   #0E2A44 (secondary dark)
Gold:       #B8924A (accent)
Gold Light: #D4AB6A (accent light)
Sand:       #F5EDD8 (background)
Sand Light: #FAF6EE (light background)
Teal:       #2AA8C0 (accent secondary)
```

### Typography
- **Display Font** — Playfair Display (serif, bold) for headlines
- **Body Font** — Inter (sans-serif, light) for content
- **Hierarchy** — H1 (72px), H2 (48px), H3 (28px), Body (16px)

### Spacing System
- **Section Padding** — 80–120px vertical (py-20 to py-40)
- **Container Padding** — 16px mobile, 24px tablet, 32px desktop
- **Gap System** — 6px, 8px, 12px, 16px increments

### Animations
- **Duration** — 300–600ms for UI animations
- **Easing** — Custom cubic-bezier(0.23, 1, 0.32, 1) for snappy feel
- **GPU Acceleration** — Transform and opacity only
- **Stagger** — 50–100ms between grouped items

## Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| **Lighthouse Score** | 95+ | ✓ Optimized |
| **Core Web Vitals** | Good | ✓ Compliant |
| **First Contentful Paint** | < 1.5s | ✓ Fast |
| **Largest Contentful Paint** | < 2.5s | ✓ Fast |
| **Cumulative Layout Shift** | < 0.1 | ✓ Stable |

## Code Quality

### TypeScript
- **Strict Mode** — Full type safety across components
- **Type Definitions** — Centralized types in `types/index.ts`
- **No `any` Types** — Explicit typing throughout

### Accessibility
- **WCAG 2.1 AA** — Compliant with accessibility standards
- **Focus Management** — Visible focus rings on all interactive elements
- **Keyboard Navigation** — Full keyboard support for forms and modals
- **ARIA Labels** — Proper labels for screen readers

### Code Organization
- **Component Modularity** — Single responsibility principle
- **DRY Principles** — Reusable hooks and utilities
- **Naming Conventions** — Clear, descriptive names
- **Comments** — JSDoc for complex functions

## Future Enhancements

1. **Backend Integration** — Connect to booking system API
2. **Payment Processing** — Stripe integration for payments
3. **User Accounts** — Guest profiles and booking history
4. **Admin Dashboard** — Property management interface
5. **Email Notifications** — Booking confirmations and reminders
6. **Analytics** — Guest behavior tracking and insights
7. **Multi-language** — i18n support for international guests
8. **Virtual Tours** — 360° villa walkthroughs

## Deployment

### Hosting Options
- **Vercel** — Recommended for Next.js-style deployments
- **Netlify** — Excellent static site hosting
- **AWS S3 + CloudFront** — Enterprise-grade CDN
- **Manus Platform** — Built-in hosting with custom domains

### Build & Deploy
```bash
# Development
pnpm dev

# Production Build
pnpm build

# Preview
pnpm preview
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Credits

**Design Inspiration** — Luxury resort branding, editorial design, Awwwards-style websites

**Tools & Libraries** — React, Tailwind CSS, Framer Motion, shadcn/ui, Lucide Icons

**Assets** — High-quality resort imagery, custom animations, professional typography

---

**Project Status** — ✓ Production Ready | **Last Updated** — June 2026
