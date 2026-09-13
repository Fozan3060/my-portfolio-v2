'use client'

import React from 'react'
import { IconType } from 'react-icons'
import { LuBrainCircuit, LuCreditCard, LuLayers, LuSmartphone } from 'react-icons/lu'
import SectionHeading from '../ui/SectionHeading'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import Logo from '../ui/Logo'
import useInView from '@/hooks/useInView'

type Offering = {
  icon: IconType
  title: string
  description: string
  // Real projects where this was built, so each claim has something behind it.
  builtIn: string[]
}

const offerings: Offering[] = [
  {
    icon: LuBrainCircuit,
    title: 'AI products',
    description: 'LLM features, retrieval over vector search, multi-agent systems and real-time voice, built into real products.',
    builtIn: ['First Light at Ralico', 'Persona AI', 'Career Coach AI']
  },
  {
    icon: LuLayers,
    title: 'Full-stack SaaS platforms',
    description: 'Web platforms with authentication, subscriptions, dashboards and end-to-end tests in CI.',
    builtIn: ['DayOf', 'OnlyGamers', 'Career Coach AI']
  },
  {
    icon: LuCreditCard,
    title: 'Payments and fintech',
    description: 'Marketplace checkout with Fortis and Commerce.js, and bank account onboarding with Moov.io and Plaid.',
    builtIn: ['ShoutOut']
  },
  {
    icon: LuSmartphone,
    title: 'Offline-first mobile',
    description: 'React Native and Expo apps that keep working without a connection, like offline ticket scanning.',
    builtIn: ['DayOf']
  }
]

const Services: React.FC = () => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15, true)

  return (
    <div className='bg-background2'>
      <Wrapper sectionId='services'>
        <SectionWrapper>
          <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
          <SectionHeading heading='Services' />

          <div ref={ref} className='mx-auto max-w-7xl'>
            <div
              className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <h2 className='text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl xl:text-5xl'>
                What I build
              </h2>
              <p className='mt-5 text-base leading-relaxed text-text2 sm:text-lg'>
                The kinds of products I&apos;ve shipped, and where I built them.
              </p>
            </div>

            <ul className='mt-14 grid grid-cols-1 gap-4 md:grid-cols-2'>
              {offerings.map(({ icon: Icon, title, description, builtIn }, idx) => (
                <li
                  key={title}
                  style={{ transitionDelay: isInView ? `${120 + idx * 80}ms` : '0ms' }}
                  className={`transition-all duration-700 ease-out ${
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <article className='group flex h-full flex-col rounded-3xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#212121] p-6 transition-colors duration-300 hover:border-custom-orange/25 sm:p-8'>
                    <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-custom-orange/10 text-custom-orange ring-1 ring-custom-orange/20 transition-colors duration-300 group-hover:bg-custom-orange/20'>
                      <Icon aria-hidden size={24} />
                    </span>
                    <h3 className='mt-6 text-xl font-semibold text-white sm:text-2xl'>{title}</h3>
                    <p className='mb-6 mt-2 leading-relaxed text-text2'>{description}</p>
                    <div className='mt-auto flex flex-wrap items-center gap-2 border-t border-white/5 pt-5'>
                      <span className='text-xs text-text2'>Built in</span>
                      {builtIn.map((project) => (
                        <span key={project} className='rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-xs text-text3'>
                          {project}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </SectionWrapper>
      </Wrapper>
    </div>
  )
}

export default Services
