'use client'

import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { LuBookOpen, LuBriefcase, LuDownload, LuGraduationCap } from 'react-icons/lu'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import Logo from '../ui/Logo'
import useInView from '@/hooks/useInView'
import { SanityHero } from '@/types/sanity'
import { getHeroData } from '../../../queries'

type Role = {
  title: string
  company: string
  location?: string
  workType?: string
  date?: string
  current?: boolean
  highlight?: string
  points: string[]
  tags: string[]
}

const experience: Role[] = [
  {
    title: 'Lead/Platform Developer',
    company: 'Ralico Ltd',
    location: 'UK',
    workType: 'Hybrid',
    current: true,
    points: [
      'Sole owner of the codebase and infrastructure for a UK-registered solar company.',
      'Building First Light, an AI solar advisor with a real-time voice pipeline.',
      'Next.js and FastAPI on Vercel and Railway, backed by Neon Postgres.'
    ],
    tags: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'LiveKit', 'Claude']
  },
  {
    title: 'Freelance Full Stack Developer',
    company: 'Self-employed',
    date: 'Since Jun 2024',
    highlight: '99.9% uptime',
    points: [
      'Delivered the Merchantra e-commerce app and a Twitter scraper backend.',
      'Built with FastAPI, Selenium, MongoDB and Docker.',
      'Kept AWS EC2 deployments at 99.9% uptime.'
    ],
    tags: ['FastAPI', 'Selenium', 'MongoDB', 'Docker', 'AWS EC2']
  },
  {
    title: 'Full Stack Developer',
    company: 'OnlyGamers Inc',
    location: 'Norway',
    workType: 'Remote',
    date: 'Jan 2024 - Apr 2024',
    highlight: '+45% engagement',
    points: [
      'Built a gaming community platform with Google OAuth, email and social sign-in.',
      'Shipped subscription-based creator monetization, lifting user engagement by 45%.',
      'Added profile customization with avatar and banner cropping, with media on AWS S3.',
      'Optimized the backend with DynamoDB and GraphQL APIs.'
    ],
    tags: ['OAuth', 'AWS S3', 'DynamoDB', 'GraphQL']
  },
  {
    title: 'React Front-end Developer',
    company: 'Creative Squad Inc',
    location: 'Canada',
    workType: 'Remote',
    date: 'Jan 2023 - May 2023',
    highlight: '+30% usability',
    points: [
      'Converted Figma designs into responsive, interactive React interfaces.',
      'Improved UI/UX with Bootstrap 5 and SwiperJS, boosting usability by 30%.'
    ],
    tags: ['React', 'Figma', 'Bootstrap 5', 'SwiperJS']
  }
]

const education = {
  degree: 'BS Computer Science',
  school: 'FAST-NUCES',
  location: 'Karachi',
  date: 'Jul 2023 - 2027',
  points: [
    'Final year project: RefactorAgent, an agent for verified, repo-scale migration of React class components to hooks.',
    'Working on a research paper on security in multi-agent LLM systems.',
    'Core coursework in data structures, algorithms and full-stack development.'
  ]
}

const courses = [
  { name: 'The Web Developer Bootcamp', provider: 'Udemy, Colt Steele' },
  { name: 'React Complete Guide', provider: 'Udemy' }
]

// Tailwind can't see class names built at runtime, so stagger with an inline delay instead.
const reveal = (inView: boolean, delayMs: number, extraClasses = '') => ({
  className: `transition-all duration-700 ease-out ${
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  } ${extraClasses}`,
  style: { transitionDelay: inView ? `${delayMs}ms` : '0ms' }
})

const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15, true)
  return (
    <div ref={ref} {...reveal(isInView, delay, className)}>
      {children}
    </div>
  )
}

const ColumnTitle = ({ icon: Icon, title }: { icon: IconType; title: string }) => (
  <h3 className='flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-text3'>
    <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-custom-orange/10 text-custom-orange ring-1 ring-custom-orange/20'>
      <Icon aria-hidden size={18} />
    </span>
    {title}
  </h3>
)

const Pill = ({ children, accent }: { children: React.ReactNode; accent?: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
      accent
        ? 'bg-custom-orange/10 font-semibold text-custom-orange ring-1 ring-custom-orange/25'
        : 'border border-white/10 bg-white/5 text-text3'
    }`}
  >
    {children}
  </span>
)

const Bullets = ({ points }: { points: string[] }) => (
  <ul className='mt-4 space-y-2'>
    {points.map((point) => (
      <li key={point} className='flex gap-3 text-sm leading-relaxed text-text3'>
        <span aria-hidden className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-custom-orange/70' />
        {point}
      </li>
    ))}
  </ul>
)

const RoleCard = ({ role }: { role: Role }) => (
  <article
    className={`relative overflow-hidden rounded-3xl border p-5 transition-colors duration-300 sm:p-6 ${
      role.current
        ? 'border-custom-orange/20 bg-background2'
        : 'border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#212121] hover:border-white/10'
    }`}
  >
    {role.current && (
      <>
        <div
          aria-hidden
          className='grid-pattern absolute inset-0 [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_right,#000_10%,transparent_65%)]'
        />
        <div aria-hidden className='absolute -right-20 -top-20 h-56 w-56 rounded-full bg-custom-orange/15 blur-3xl' />
      </>
    )}

    <div className='relative'>
      <div className='flex flex-wrap items-center gap-2'>
        {role.date && <Pill>{role.date}</Pill>}
        {role.current && (
          <Pill accent>
            <span aria-hidden className='relative flex h-1.5 w-1.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-custom-orange opacity-60 motion-reduce:animate-none' />
              <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-custom-orange' />
            </span>
            Current role
          </Pill>
        )}
        {role.highlight && <Pill accent>{role.highlight}</Pill>}
      </div>

      <h4 className='mt-4 text-lg font-semibold text-white sm:text-xl'>{role.title}</h4>
      <p className='mt-1 text-sm text-text2'>
        <span className='font-medium text-custom-orange'>{role.company}</span>
        {[role.location, role.workType].filter(Boolean).map((part) => (
          <span key={part}> · {part}</span>
        ))}
      </p>

      <Bullets points={role.points} />

      <ul className='mt-5 flex flex-wrap gap-2'>
        {role.tags.map((tag) => (
          <li key={tag} className='rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-xs text-text2'>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  </article>
)

const Resume: React.FC = () => {
  const [cvUrl, setCvUrl] = useState<string>()
  useEffect(() => {
    getHeroData().then((hero: SanityHero | null) => setCvUrl(hero?.cv?.asset?.url))
  }, [])

  return (
    <Wrapper sectionId='Resume'>
      <SectionWrapper>
        <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='Resume' />

        <Reveal className='mx-auto max-w-3xl text-center'>
          <h2 className='text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl xl:text-5xl'>
            From front-end builds to <span className='whitespace-nowrap text-custom-orange'>leading a platform</span>
          </h2>
          <p className='mt-5 text-base leading-relaxed text-text2 sm:text-lg'>
            4+ years with teams in the UK, Norway and Canada, alongside a CS degree at{' '}
            <span className='whitespace-nowrap'>FAST-NUCES</span>.
          </p>
          {cvUrl && (
            <a
              href={cvUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-custom-orange/40 hover:text-custom-orange'
            >
              <LuDownload aria-hidden size={16} />
              Download full CV
            </a>
          )}
        </Reveal>

        <div className='mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12'>
          <div className='min-w-0 lg:col-span-7'>
            <ColumnTitle icon={LuBriefcase} title='Experience' />
            <div className='relative mt-6'>
              <span
                aria-hidden
                className='absolute bottom-8 left-3 top-8 w-px bg-gradient-to-b from-custom-orange/60 via-white/10 to-white/5 sm:left-5'
              />
              <ol className='space-y-4'>
                {experience.map((role, idx) => (
                  <li key={role.title}>
                    <Reveal delay={idx === 0 ? 0 : 80} className='grid grid-cols-[1.5rem_1fr] gap-3 sm:grid-cols-[2.5rem_1fr] sm:gap-5'>
                      <span className='relative z-10 mt-6 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-background sm:h-10 sm:w-10'>
                        <span
                          className={`h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${role.current ? 'bg-custom-orange shadow-[0_0_12px_#ff9776]' : 'bg-white/30'}`}
                        />
                      </span>
                      <div className='min-w-0'>
                        <RoleCard role={role} />
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className='min-w-0 lg:col-span-5'>
            <div className='space-y-4 lg:sticky lg:top-28'>
              <ColumnTitle icon={LuGraduationCap} title='Education' />
              <Reveal className='pt-2'>
                <article className='relative overflow-hidden rounded-3xl border border-white/5 bg-background2 p-5 sm:p-6'>
                  <div
                    aria-hidden
                    className='grid-pattern absolute inset-0 [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_left,#000_10%,transparent_65%)]'
                  />
                  <div aria-hidden className='absolute -left-20 -top-20 h-56 w-56 rounded-full bg-custom-orange/15 blur-3xl' />
                  <div className='relative'>
                    <Pill>{education.date}</Pill>
                    <h4 className='mt-4 text-lg font-semibold text-white sm:text-xl'>{education.degree}</h4>
                    <p className='mt-1 text-sm text-text2'>
                      <span className='font-medium text-custom-orange'>{education.school}</span> · {education.location}
                    </p>
                    <Bullets points={education.points} />
                  </div>
                </article>
              </Reveal>

              <Reveal delay={100}>
                <article className='rounded-3xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#212121] p-5 sm:p-6'>
                  <h4 className='flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-text3'>
                    <LuBookOpen aria-hidden size={16} className='text-custom-orange' />
                    Courses
                  </h4>
                  <ul className='mt-4 divide-y divide-white/5'>
                    {courses.map((course) => (
                      <li key={course.name} className='py-3 first:pt-0 last:pb-0'>
                        <p className='font-medium text-white'>{course.name}</p>
                        <p className='text-sm text-text2'>{course.provider}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default Resume
