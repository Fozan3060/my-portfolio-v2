import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import './globals.css'
import ChatBot from '@/components/complex/ChatBot'
import Preloader from '@/components/complex/Preloader'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site'

// Bricolage Grotesque gives headings some character; Instrument Sans keeps body copy easy to read.
const display = Bricolage_Grotesque({ subsets: ['latin'], axes: ['opsz'], variable: '--font-bricolage' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument' })

// Icons and share images come from the file conventions in this folder (favicon.ico, icon.png,
// apple-icon.png, opengraph-image.jpg, twitter-image.jpg), so they aren't repeated here.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    'Fozan Javaid',
    'Full-Stack AI Engineer',
    'AI engineer',
    'Full-stack developer',
    'Next.js',
    'TypeScript',
    'FastAPI',
    'PostgreSQL',
    'RAG',
    'Multi-agent systems',
    'Voice AI',
    'Karachi'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false }
}

export const viewport: Viewport = {
  themeColor: '#121212',
  colorScheme: 'dark'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${display.variable} ${body.variable}`}>
      <body className='antialiased bg-background font-sans'>
        <Preloader />
        {children}
        <ChatBot />
      </body>
    </html>
  )
}
