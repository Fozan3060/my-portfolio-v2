'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import {
  LuBrainCircuit,
  LuBriefcase,
  LuCalendarClock,
  LuCircleCheckBig,
  LuGraduationCap,
  LuLayers,
  LuMessagesSquare,
  LuRocket,
  LuTelescope,
  LuUsers
} from 'react-icons/lu'
import Logo from '../ui/Logo'
import SectionHeading from '../ui/SectionHeading'
import SectionWrapper from '../ui/SectionWrapper'
import Wrapper from './Wrapper'
import useInView from '@/hooks/useInView'
import { SanityAboutMe } from '@/types/sanity'
import { getAboutMeData } from '../../../queries'

const focusAreas = [
  {
    icon: LuLayers,
    title: 'Full Stack Development',
    text: 'Next.js, TypeScript, FastAPI and PostgreSQL, shipped end to end.'
  },
  {
    icon: LuBrainCircuit,
    title: 'AI/LLM Integration',
    text: 'GPT, Gemini and Claude built into real products.'
  },
  {
    icon: LuMessagesSquare,
    title: 'RAG & Chatbot Systems',
    text: 'Retrieval over vector databases and assistants with memory.'
  }
]

const currently = [
  {
    icon: LuBriefcase,
    label: 'Role',
    title: 'Lead Platform Developer',
    detail: 'Ralico Ltd, a UK solar company'
  },
  {
    icon: LuGraduationCap,
    label: 'Study',
    title: 'BS Computer Science',
    detail: 'FAST-NUCES Karachi, graduating 2027'
  },
  {
    icon: LuTelescope,
    label: 'Exploring',
    title: 'Applied agentic AI',
    detail: 'Evals, retrieval and agent orchestration'
  }
]

const stats = [
  { icon: LuUsers, value: 50, label: 'Satisfied Customers' },
  { icon: LuCalendarClock, value: 4, label: 'Years Experience' },
  { icon: LuRocket, value: 20, label: 'Websites Launched' },
  { icon: LuCircleCheckBig, value: 20, label: 'Completed Projects' }
]

const CountUp = ({ value, start }: { value: number; start: boolean }) => {
  const spring = useSpring(0, { stiffness: 60, damping: 18 })
  const rounded = useTransform(spring, (latest) => Math.round(latest))

  useEffect(() => {
    if (start) spring.set(value)
  }, [start, value, spring])

  return <motion.span>{rounded}</motion.span>
}

// Tailwind can't see class names built at runtime, so stagger with an inline delay instead.
const reveal = (inView: boolean, delayMs: number, extraClasses = '') => ({
  className: `transition-all duration-700 ease-out ${
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  } ${extraClasses}`,
  style: { transitionDelay: inView ? `${delayMs}ms` : '0ms' }
})

const AboutMe = () => {
  const [aboutData, setAboutData] = useState<SanityAboutMe | null>(null)
  useEffect(() => {
    getAboutMeData().then(setAboutData)
  }, [])
  const { ref: storyRef, isInView: storyInView } = useInView<HTMLDivElement>(0.2, true)
  const { ref: panelRef, isInView: panelInView } = useInView<HTMLDivElement>(0.15, true)

  return (
    <Wrapper sectionId='about'>
      <SectionWrapper>
        <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='About Me' />

        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16'>
          <div ref={storyRef} className='flex flex-col justify-center lg:col-span-7'>
            <h2
              {...reveal(
                storyInView,
                0,
                'text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.6rem] xl:text-5xl 2xl:text-[3.4rem]'
              )}
            >
              Crafting <span className='whitespace-nowrap text-custom-orange'>AI-powered</span> web applications with passion and precision
            </h2>

            <p {...reveal(storyInView, 120, 'mt-6 min-h-[5rem] max-w-2xl text-base leading-relaxed text-text2 sm:text-lg')}>
              {aboutData?.description}
            </p>

            <div className='mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
              {focusAreas.map(({ icon: Icon, title, text }, idx) => (
                <div key={title} {...reveal(storyInView, 240 + idx * 100)}>
                  <div className='group flex h-full items-start gap-4 rounded-2xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#212121] p-5 transition-colors duration-300 hover:border-custom-orange/30 sm:block lg:flex xl:block'>
                    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-custom-orange/10 text-custom-orange ring-1 ring-custom-orange/20 transition-colors duration-300 group-hover:bg-custom-orange/20'>
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className='font-semibold text-white sm:mt-4 lg:mt-0 xl:mt-4'>{title}</h3>
                      <p className='mt-1.5 text-sm leading-relaxed text-text2'>{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={panelRef} className='flex flex-col gap-4 lg:col-span-5'>
            <div {...reveal(panelInView, 0)}>
              <div className='relative overflow-hidden rounded-3xl border border-white/5 bg-background2 p-6 sm:p-8'>
                <div
                  aria-hidden
                  className='grid-pattern absolute inset-0 [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_right,#000_15%,transparent_70%)]'
                />
                <div aria-hidden className='absolute -right-16 -top-16 h-56 w-56 rounded-full bg-custom-orange/15 blur-3xl' />

                <div className='relative'>
                  <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-text3'>
                    <span className='relative flex h-2 w-2'>
                      <span className='relative inline-flex h-2 w-2 rounded-full bg-custom-orange' />
                    </span>
                    Right now
                  </span>

                  <ul className='mt-4 divide-y divide-white/5'>
                    {currently.map(({ icon: Icon, label, title, detail }) => (
                      <li key={label} className='flex gap-4 py-4 last:pb-0'>
                        <span className='mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-custom-orange ring-1 ring-white/10'>
                          <Icon size={20} />
                        </span>
                        <div className='min-w-0'>
                          <p className='text-[11px] uppercase tracking-[0.2em] text-text2'>{label}</p>
                          <p className='mt-0.5 font-semibold text-white sm:text-lg'>{title}</p>
                          <p className='text-sm text-text2'>{detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {stats.map(({ icon: Icon, value, label }, idx) => (
                <div key={label} {...reveal(panelInView, 150 + idx * 90)}>
                  <div className='group h-full rounded-2xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#212121] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-custom-orange/30 sm:p-6'>
                    <div className='flex items-start justify-between gap-2'>
                      <p className='whitespace-nowrap font-display text-3xl font-bold tabular-nums text-white min-[400px]:text-4xl sm:text-5xl lg:text-4xl xl:text-5xl'>
                        <CountUp value={value} start={panelInView} />
                        <span className='text-custom-orange'>+</span>
                      </p>
                      <Icon
                        aria-hidden
                        size={22}
                        className='mt-1 shrink-0 text-white/20 transition-colors duration-300 group-hover:text-custom-orange/70'
                      />
                    </div>
                    <p className='mt-2 text-sm text-text2'>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default AboutMe
