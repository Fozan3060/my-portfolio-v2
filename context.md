# Portfolio Project Context

This document provides comprehensive context about the portfolio project for AI assistants.

## Project Overview

A modern, feature-rich portfolio website for Fozan Javaid built with Next.js 15, React 19, and TypeScript. Features headless CMS integration, email functionality, and extensive animations.

## Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.3.3 | React framework with App Router |
| React | 19.0.0 | UI library |
| TypeScript | 5 | Type safety |

### CMS & Data
| Technology | Version | Purpose |
|------------|---------|---------|
| Sanity | 3.92.0 | Headless CMS for content management |
| next-sanity | 9.12.0 | Sanity integration for Next.js |
| @sanity/client | 7.6.0 | Sanity client |
| @sanity/image-url | 1.1.0 | Image URL builder for Sanity CDN |

### UI & Animation
| Technology | Version | Purpose |
|------------|---------|---------|
| Framer Motion | 12.17.0 | Animation library |
| React Icons | 5.5.0 | Icon components |
| React Modal | 3.16.3 | Modal component library |
| Swiper | 11.2.8 | Touch slider/carousel |
| React Parallax Tilt | 1.7.297 | Parallax effect library |
| React Vertical Timeline | 3.5.3 | Timeline component |
| Styled Components | 6.1.18 | CSS-in-JS styling |
| React Intersection Observer | 9.16.0 | Intersection observer hook |

### Email Integration
| Technology | Version | Purpose |
|------------|---------|---------|
| @emailjs/browser | 4.4.1 | Email service client (contact form) |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4 | Utility-first CSS framework |
| PostCSS | - | CSS preprocessor |

---

## Directory Structure

```
my-portfolio-v2/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with fonts and metadata
│   │   ├── page.tsx                  # Main portfolio page (assembles all sections)
│   │   ├── globals.css               # Global styles, Tailwind theme, custom CSS
│   │   └── studio/
│   │       └── [[...tool]]/
│   │           └── page.tsx          # Sanity Studio CMS interface
│   │
│   ├── components/
│   │   ├── ui/                       # Base/atomic components
│   │   │   ├── Button.tsx            # Reusable button component
│   │   │   ├── Logo.tsx              # Logo component
│   │   │   ├── SectionHeading.tsx    # Section title component
│   │   │   ├── SectionWrapper.tsx    # Section padding wrapper
│   │   │   ├── CustomChekmark.tsx    # Checkmark UI element
│   │   │   ├── SocialLinks.tsx       # Social media links
│   │   │   └── PersonalInfoItem.tsx  # Personal info display item
│   │   │
│   │   ├── compound/                 # Composite/reusable components
│   │   │   ├── SkillCard.tsx         # Individual skill with animated percentage
│   │   │   ├── ServiceCard.tsx       # Service offering card
│   │   │   ├── ReviewsSlider.tsx     # Swiper-based reviews carousel
│   │   │   ├── FormEmail.tsx         # Email contact form with EmailJS
│   │   │   ├── FormBanner.tsx        # Contact form banner section
│   │   │   ├── PortfolioModal.tsx    # Modal for project details
│   │   │   ├── DirectionalButton.tsx # Interactive button with directional movement
│   │   │   ├── HireMeBtn.tsx         # CTA button that scrolls to contact
│   │   │   ├── BannerImage.tsx       # Hero banner image with mouse parallax
│   │   │   ├── NavigationLinks.tsx   # Nav links with active section detection
│   │   │   ├── ResumeCard.tsx        # Individual resume/experience entry
│   │   │   ├── StatItem.tsx          # Statistics display item
│   │   │   ├── Modal.tsx             # Reusable modal component
│   │   │   ├── VerticalText.tsx      # Vertical text component
│   │   │   ├── MobileNavbarBtn.tsx   # Mobile menu button
│   │   │   ├── Personalnfo.tsx       # Personal information display
│   │   │   ├── LeftBanner.tsx        # Hero section left part
│   │   │   ├── MiddleBanner.tsx      # Hero section middle part
│   │   │   └── RightBanner.tsx       # Hero section right part
│   │   │
│   │   └── complex/                  # Full section components
│   │       ├── Header.tsx            # Navigation header with scroll detection
│   │       ├── Herosection.tsx       # Hero banner with parallax effects
│   │       ├── AboutMe.tsx           # About section with stats and animated text
│   │       ├── Services.tsx          # Services showcase (8 service cards)
│   │       ├── Portfolio.tsx         # Project portfolio grid (fetches from Sanity)
│   │       ├── PortfolioCard.tsx     # Individual project card with modal
│   │       ├── Skills.tsx            # Skills display with animated progress
│   │       ├── Resume.tsx            # Education and experience timeline
│   │       ├── Reviews.tsx           # Client testimonials with Swiper
│   │       ├── ContactUs.tsx         # Contact form section
│   │       ├── Footer.tsx            # Footer with navigation and social links
│   │       ├── MobileNavBar.tsx      # Mobile sidebar navigation
│   │       └── Wrapper.tsx           # Layout wrapper with responsive margins
│   │
│   ├── hooks/
│   │   └── useInView.tsx             # Custom intersection observer hook
│   │
│   ├── sanity/
│   │   ├── schemaTypes/
│   │   │   ├── index.ts              # Schema exports
│   │   │   ├── portfolio.ts          # Portfolio project schema
│   │   │   ├── hero.ts               # Hero section schema
│   │   │   └── aboutMe.ts            # About me section schema
│   │   ├── lib/
│   │   │   └── image.ts              # Sanity image URL builder utility
│   │   ├── env.ts                    # Environment variable validation
│   │   └── structure.ts              # Sanity Studio structure config
│   │
│   └── types/
│       └── types.ts                  # TypeScript type definitions
│
├── public/
│   └── assets/                       # Static assets (images, icons, SVGs)
│
├── Data.ts                           # Static skills data (10 skills with icons)
├── queries.ts                        # Sanity GROQ queries
├── client.ts                         # Sanity client initialization
├── sanity.config.ts                  # Sanity Studio configuration
├── sanity.cli.ts                     # Sanity CLI configuration
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
├── package.json                      # Dependencies and scripts
└── .gitignore                        # Git ignore patterns
```

---

## Routing Structure

### Next.js App Router (File-based)
| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/app/page.tsx` | Main portfolio page |
| `/studio` | `src/app/studio/[[...tool]]/page.tsx` | Sanity Studio CMS interface |

### Client-side Navigation (Anchor Links)
| Anchor | Section Component | Description |
|--------|-------------------|-------------|
| `#home` | Herosection.tsx | Hero section |
| `#about` | AboutMe.tsx | About Me section |
| `#portfolio` | Portfolio.tsx | Portfolio projects |
| `#services` | Services.tsx | Services offered |
| `#review` | Reviews.tsx | Client reviews |
| `#Resume` | Resume.tsx | Resume/experience |
| `#Skills` | Skills.tsx | Skills section |
| `#contact` | ContactUs.tsx | Contact form |

Navigation uses IntersectionObserver API for active section detection and smooth scroll behavior.

---

## Sanity CMS Integration

### Configuration
- **Project ID & Dataset:** From environment variables
- **API Version:** 2025-06-12
- **Studio Route:** `/studio`

### Schema Types

#### Portfolio (`src/sanity/schemaTypes/portfolio.ts`)
```typescript
{
  projectName: string,
  category: string,
  image: image,
  skills: string[],
  description: string,
  link: url
}
```

#### Hero (`src/sanity/schemaTypes/hero.ts`)
```typescript
{
  description: string,
  cv: file
}
```

#### AboutMe (`src/sanity/schemaTypes/aboutMe.ts`)
```typescript
{
  description: string,
  personalInfo: object
}
```

### GROQ Queries (`queries.ts`)
| Function | Purpose |
|----------|---------|
| `getPortfolioProjects()` | Fetches all portfolio projects with details |
| `getHeroData()` | Fetches hero section description and CV file |
| `getAboutMeData()` | Fetches about me description and personal info |

---

## EmailJS Integration

### Setup Location
`src/components/compound/FormEmail.tsx`

### Environment Variables Required
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=<your-service-id>
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<your-template-id>
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<your-public-key>
```

### Form Fields
- Name
- Email
- Message

### Features
- Loading state during submission
- Error handling with alerts
- Success notifications

---

## Styling System

### Tailwind CSS Configuration
Located in `src/app/globals.css`

### Theme Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#171717` | Main background |
| `--background2` | `#121212` | Secondary background |
| `--custom-orange` | `#ff9776` | Accent color |
| `--foreground` | `#ededed` | Text color |

### Custom Breakpoints
| Name | Size | Usage |
|------|------|-------|
| `small_phone` | Custom | Small phone screens |
| `medium_phone` | Custom | Medium phone screens |
| `semi_lg` | Custom | Semi-large screens |
| `semi_md` | Custom | Semi-medium screens |

### Special Styling Features
- Custom scrollbar (orange color)
- Swiper carousel custom pagination (orange bullets)
- Vertical timeline styling
- Neumorphic card shadows
- Directional overlay effects for buttons
- Hero section background image

---

## Custom Hooks

### useInView (`src/hooks/useInView.tsx`)
Custom intersection observer hook for scroll-triggered animations.

**Parameters:**
- `threshold` - Visibility threshold (0-1)
- `once` - If true, only triggers once

**Usage:**
```tsx
const { ref, isInView } = useInView({ threshold: 0.3, once: true });
```

---

## Static Data

### Skills Data (`Data.ts`)
Array of 10 skills with:
- `name`: Skill name (React, Next, TypeScript, Node.js, AWS, Sass, Express, Cypress, MongoDB, Tailwind)
- `value`: Proficiency percentage (95%)
- `icon`: SVG icon path

---

## Key Development Patterns

1. **Component Organization:** Three-tier structure
   - `ui/` - Base/atomic components
   - `compound/` - Composite components
   - `complex/` - Full section components

2. **Client Components:** Heavy use of `'use client'` for interactive features

3. **Animation Strategy:**
   - Framer Motion for complex animations
   - CSS transitions for simple effects
   - `useInView` hook for scroll-triggered animations

4. **Responsive Design:** Mobile-first with Tailwind breakpoints

5. **TypeScript:** Full type safety with interfaces in `src/types/types.ts`

6. **Error Handling:** Try-catch patterns with user alerts

---

## Environment Variables

### Required for Full Functionality
```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-sanity-project-id>
NEXT_PUBLIC_SANITY_DATASET=<your-sanity-dataset>
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-12

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=<your-emailjs-service-id>
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<your-emailjs-template-id>
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<your-emailjs-public-key>
```

---

## NPM Scripts

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## Git Information

- **Main Branch:** `main`
- **Repository:** Local development

---

## Quick Reference: File Locations

| What You Need | Where to Find It |
|---------------|------------------|
| Main page layout | `src/app/page.tsx` |
| Global styles | `src/app/globals.css` |
| Header/Navigation | `src/components/complex/Header.tsx` |
| Portfolio grid | `src/components/complex/Portfolio.tsx` |
| Contact form | `src/components/compound/FormEmail.tsx` |
| Sanity queries | `queries.ts` |
| Sanity client | `client.ts` |
| Type definitions | `src/types/types.ts` |
| Skills data | `Data.ts` |
| Custom hooks | `src/hooks/useInView.tsx` |
| Sanity schemas | `src/sanity/schemaTypes/` |

---

## Notes for AI Assistants

When working on this project:

1. **Component edits:** Check which tier (ui/compound/complex) the component belongs to
2. **Styling:** Use Tailwind classes; check `globals.css` for custom theme values
3. **Animations:** Use Framer Motion; leverage `useInView` hook for scroll animations
4. **Data fetching:** Use existing Sanity queries in `queries.ts`
5. **New content types:** Add schemas to `src/sanity/schemaTypes/`
6. **Type safety:** Define types in `src/types/types.ts`
7. **Responsive design:** Mobile-first approach with Tailwind breakpoints
