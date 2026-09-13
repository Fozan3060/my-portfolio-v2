import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from './contact'

// Absolute URLs are needed for share images, canonical links and the sitemap. Set
// NEXT_PUBLIC_SITE_URL once there's a custom domain; until then Vercel's production URL is used.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://my-portfolio-v2-two-phi.vercel.app')
).replace(/\/$/, '')

export const SITE_NAME = 'Fozan Javaid'
export const SITE_TITLE = 'Fozan Javaid | Full-Stack AI Engineer'
export const SITE_DESCRIPTION =
  'Full-stack AI engineer building production AI systems with TypeScript, Next.js, FastAPI and PostgreSQL: RAG, multi-agent apps, real-time voice and payments.'

// Structured data so search engines understand who the site is about.
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/icon.png`,
  jobTitle: 'Full-Stack AI Engineer',
  email: `mailto:${CONTACT_EMAIL}`,
  worksFor: { '@type': 'Organization', name: 'Ralico Ltd' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'FAST-NUCES' },
  address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' },
  knowsAbout: ['TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL', 'Retrieval-augmented generation', 'Multi-agent systems', 'Voice AI'],
  sameAs: [LINKEDIN_URL, GITHUB_URL]
}
