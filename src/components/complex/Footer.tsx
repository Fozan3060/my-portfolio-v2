'use client'

import React from 'react'
import Image from 'next/image'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { LuArrowUp, LuMail } from 'react-icons/lu'
import Wrapper from './Wrapper'
import { links } from '../compound/NavigationLinks'
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/contact'

const socials = [
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: FaLinkedinIn, external: true },
  { label: 'GitHub', href: GITHUB_URL, icon: FaGithub, external: true },
  { label: 'Email', href: `mailto:${CONTACT_EMAIL}`, icon: LuMail, external: false }
]

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const Footer = () => {
  return (
    <footer className='border-t border-white/5 bg-background2'>
      <Wrapper>
        <div className='mx-auto max-w-7xl py-12 sm:py-14'>
          <div className='grid gap-10 md:grid-cols-12'>
            <div className='md:col-span-5'>
              <Image src='/assets/logo.png' alt='Fozan Javaid' width={375} height={302} className='h-auto w-16' />
              <p className='mt-4 max-w-sm text-sm leading-relaxed text-text2'>
                Full-stack TypeScript engineer building AI-powered web applications. The assistant on this site is a
                Llama 3.1 8B I fine-tuned myself.
              </p>
            </div>

            <nav aria-label='Footer' className='md:col-span-4'>
              <p className='text-sm font-medium text-text3'>Sections</p>
              <ul className='mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5'>
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => scrollToSection(e, href)}
                      className='text-sm text-text2 transition-colors duration-300 hover:text-white'
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='md:col-span-3'>
              <p className='text-sm font-medium text-text3'>Elsewhere</p>
              <ul className='mt-4 flex gap-3'>
                {socials.map(({ label, href, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className='flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-text3 transition-colors duration-300 hover:border-custom-orange/40 hover:text-custom-orange'
                    >
                      <Icon aria-hidden size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='mt-12 flex flex-col-reverse gap-4 border-t border-white/5 pt-6 text-sm text-text2 sm:flex-row sm:items-center sm:justify-between'>
            <p suppressHydrationWarning>© {new Date().getFullYear()} Fozan Javaid</p>
            <button
              type='button'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='inline-flex w-fit cursor-pointer items-center gap-2 transition-colors duration-300 hover:text-white'
            >
              Back to top
              <LuArrowUp aria-hidden size={16} />
            </button>
          </div>
        </div>
      </Wrapper>
    </footer>
  )
}

export default Footer
