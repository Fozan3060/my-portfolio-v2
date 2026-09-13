import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import './globals.css'
import ChatBot from '@/components/complex/ChatBot'
import Preloader from '@/components/complex/Preloader'

// Bricolage Grotesque gives headings some character; Instrument Sans keeps body copy easy to read.
const display = Bricolage_Grotesque({ subsets: ['latin'], axes: ['opsz'], variable: '--font-bricolage' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument' })

export const metadata: Metadata = {
  title: 'Fozan Javaid | Full-Stack AI Engineer',
  description:
    'Portfolio of Fozan Javaid, a full-stack AI engineer who builds and ships production AI systems with TypeScript, Next.js, FastAPI and PostgreSQL.'
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
