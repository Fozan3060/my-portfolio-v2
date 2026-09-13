'use client'

import React, { useEffect, useState } from 'react'
import HireMeBtn from './HireMeBtn'
import DirectionalButton from './DirectionalButton'
import BannerImage from './BannerImage'
import useInView from '@/hooks/useInView'
import { SanityHero } from '@/types/sanity'
import { getHeroData } from '../../../queries'
import { SiFastapi, SiNextdotjs, SiPostgresql, SiRailway, SiTypescript, SiVercel } from 'react-icons/si'
import { LuArrowUpRight, LuSparkles } from 'react-icons/lu'
import { openChat } from '@/lib/chatEvents'
import ToolChip, { Tool } from '../ui/ToolChip'

const coreStack: Tool[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Vercel', icon: SiVercel },
  { name: 'Railway', icon: SiRailway }
]

const roles = ['AI/LLM Developer', 'AI Full Stack Engineer', 'Problem Solver']

const MiddleBanner = () => {
  const [herodata, setHeroData] = useState<SanityHero>()
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  useEffect(() => {
    getHeroData().then(setHeroData)
  }, [])

  // Rotating titles effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  // Observe the clipping wrappers, not the headings: a heading starts shifted down inside
  // its overflow-hidden wrapper, so on short screens too little of it is visible to trigger.
  const { ref: ref1, isInView: inView1 } = useInView<HTMLDivElement>(
    0.2,
    true
  )
  const { ref: ref2, isInView: inView2 } = useInView<HTMLDivElement>(
    0.2,
    true
  )

  return (
    <div className='flex items-center justify-center'>
      <div className='flex-col w-full md:w-[650px]'>
        <div className='text-6xl min-[360px]:text-7xl sm:text-8xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[length:clamp(6.5rem,14vh,9rem)] font-bold tracking-wider whitespace-nowrap text-white'>
          <div ref={ref1} className='overflow-hidden h-fit'>
            <h1
              className={`inline-block transition-all duration-700 ease-out h-fit ${
                inView1 ? 'translate-y-0 opacity-100' : '2xl:translate-y-24 translate-y-10 opacity-0'
              }`}
            >
              Hay&apos; i m
            </h1>
          </div>
          <div ref={ref2} className='overflow-hidden h-fit'>
            <h1
              className={`inline-block transition-all duration-700 ease-out delay-150 ${
                inView2 ? 'translate-y-0 opacity-100' : '2xl:translate-y-24 translate-y-10 opacity-0'
              }`}
            >
              Fozan
            </h1>
          </div>
        </div>

        {/* Rotating Title */}
        <div className='mt-3 h-8'>
          <p
            className={`text-custom-orange text-lg sm:text-xl font-semibold tracking-wide transition-all duration-700 ease-out delay-300 ${
              inView1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {roles[currentRoleIndex]}
          </p>
        </div>

        {/* Description - fixed height to prevent layout shift */}
        <div className='min-h-[80px] mt-4'>
          <p
            className={`text-white text-lg 2xl:text-xl font-medium tracking-wider max-w-2xl transition-all duration-700 ease-out delay-500 ${
              inView1 && herodata?.description ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {herodata?.description}
          </p>
        </div>

        <div
          className={`flex-col flex sm:flex-row gap-5 mt-6 transition-all duration-700 ease-out delay-700 ${
            inView1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <HireMeBtn />
          <DirectionalButton
            onClick={() => {
              if (herodata?.cv?.asset?.url) {
                window.open(herodata.cv.asset.url, '_blank')
              }
            }}
            label='Download CV'
          />
        </div>

        {/* The numbers live in About Me; the hero points visitors at the assistant instead. */}
        <div
          className={`mt-8 2xl:mt-6 transition-all duration-700 ease-out ${
            inView1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '850ms' }}
        >
          <button
            type='button'
            onClick={openChat}
            className='group flex w-full max-w-md cursor-pointer items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-background2/60 p-3 pr-4 text-left backdrop-blur-sm transition-colors duration-300 hover:border-custom-orange/40 hover:bg-background2'
          >
            <span className='relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-custom-orange/10 text-custom-orange ring-1 ring-custom-orange/25'>
              <LuSparkles size={20} />
              <span className='absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-custom-orange opacity-60 motion-reduce:animate-none' />
                <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-custom-orange' />
              </span>
            </span>
            <span className='min-w-0 flex-1'>
              <span className='block text-sm font-semibold text-white min-[400px]:text-base'>Ask my AI assistant about me</span>
              <span className='block text-xs text-text2 sm:text-sm'>A Llama 3.1 8B I fine-tuned on my own profile</span>
            </span>
            <LuArrowUpRight
              size={20}
              className='shrink-0 text-text2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-custom-orange'
            />
          </button>
        </div>

        {/* Core stack */}
        <div
          className={`mt-6 transition-all duration-700 ease-out ${
            inView1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <p className='text-text2 text-xs mb-3 tracking-wider uppercase'>Core stack</p>
          <ul className='flex flex-wrap items-center gap-2'>
            {coreStack.map((tool) => (
              <ToolChip key={tool.name} tool={tool} />
            ))}
          </ul>
        </div>
      </div>
      <BannerImage />
    </div>
  )
}

export default MiddleBanner
