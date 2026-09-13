'use client'

import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { LuArrowUpRight, LuCheck, LuCopy, LuMail, LuMapPin, LuPhone, LuSparkles } from 'react-icons/lu'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import Logo from '../ui/Logo'
import ContactForm from '../compound/ContactForm'
import useInView from '@/hooks/useInView'
import { openChat } from '@/lib/chatEvents'
import { CONTACT_EMAIL, CONTACT_PHONE, GITHUB_URL, LINKEDIN_URL } from '@/lib/contact'

type Channel = {
  icon: IconType
  label: string
  value: string
  href: string
  external?: boolean
  copyable?: boolean
}

const channels: Channel[] = [
  { icon: LuMail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, copyable: true },
  { icon: LuPhone, label: 'Phone', value: '+92 332 2440974', href: `tel:${CONTACT_PHONE}` },
  { icon: FaLinkedinIn, label: 'LinkedIn', value: 'in/fozan-javaid', href: LINKEDIN_URL, external: true },
  { icon: FaGithub, label: 'GitHub', value: 'Fozan3060', href: GITHUB_URL, external: true }
]

// Tailwind can't see class names built at runtime, so stagger with an inline delay instead.
const reveal = (inView: boolean, delayMs: number, extraClasses = '') => ({
  className: `transition-all duration-700 ease-out ${
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  } ${extraClasses}`,
  style: { transitionDelay: inView ? `${delayMs}ms` : '0ms' }
})

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${text}`
    }
  }

  return (
    <button
      type='button'
      onClick={copy}
      aria-label={copied ? 'Email copied' : 'Copy email address'}
      className='flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-xs font-medium text-text3 transition-colors duration-300 hover:border-custom-orange/40 hover:text-white'
    >
      {copied ? <LuCheck aria-hidden size={14} className='text-custom-orange' /> : <LuCopy aria-hidden size={14} />}
      <span aria-live='polite' className='hidden sm:inline'>
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  )
}

const ContactUs = () => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15, true)

  return (
    <Wrapper sectionId='contact'>
      <SectionWrapper>
        <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='Contact Us' />

        <div ref={ref} className='mx-auto grid max-w-7xl grid-cols-1 gap-4 xl:grid-cols-12'>
          <div {...reveal(isInView, 0, 'xl:col-span-5')}>
            <div className='relative h-full overflow-hidden rounded-3xl border border-white/5 bg-background2 p-5 sm:p-8'>
              <div
                aria-hidden
                className='grid-pattern absolute inset-0 [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_left,#000_10%,transparent_65%)]'
              />
              <div aria-hidden className='absolute -left-20 -top-20 h-64 w-64 rounded-full bg-custom-orange/15 blur-3xl' />

              <div className='relative'>
                <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-text3'>
                  <span aria-hidden className='h-2 w-2 rounded-full bg-custom-orange' />
                  Get in touch
                </span>
                <h2 className='mt-5 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl'>
                  Let&apos;s build something <span className='text-custom-orange'>together</span>
                </h2>
                <p className='mt-4 leading-relaxed text-text2'>
                  Have a project, a role or a question? Send a message, or reach me directly.
                </p>

                <ul className='mt-8 space-y-3'>
                  {channels.map(({ icon: Icon, label, value, href, external, copyable }) => (
                    <li
                      key={label}
                      className='group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-2.5 pr-3 transition-colors duration-300 hover:border-custom-orange/30'
                    >
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className='flex min-w-0 flex-1 items-center gap-3'
                      >
                        <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-custom-orange/10 text-custom-orange ring-1 ring-custom-orange/20'>
                          <Icon aria-hidden size={18} />
                        </span>
                        <span className='min-w-0'>
                          <span className='block text-[11px] uppercase tracking-[0.2em] text-text2'>{label}</span>
                          <span className='block text-sm font-medium text-white [overflow-wrap:anywhere] sm:text-base'>{value}</span>
                        </span>
                      </a>
                      {copyable ? (
                        <CopyButton text={value} />
                      ) : (
                        <LuArrowUpRight
                          aria-hidden
                          size={18}
                          className='shrink-0 text-text2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-custom-orange'
                        />
                      )}
                    </li>
                  ))}
                </ul>

                <div className='mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between'>
                  <p className='flex items-center gap-2 text-sm text-text2'>
                    <LuMapPin aria-hidden size={16} className='text-custom-orange' />
                    Karachi, Pakistan (UTC+5)
                  </p>
                  <button
                    type='button'
                    onClick={openChat}
                    className='inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-text3 transition-colors duration-300 hover:text-custom-orange'
                  >
                    <LuSparkles aria-hidden size={16} className='text-custom-orange' />
                    Ask my AI assistant
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div {...reveal(isInView, 120, 'xl:col-span-7')}>
            <div className='h-full rounded-3xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#212121] p-5 sm:p-8'>
              <h3 className='text-2xl font-bold text-white'>Send a message</h3>
              <p className='mb-8 mt-2 text-text2'>Fill in the form and it lands straight in my inbox.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default ContactUs
