'use client'

import React, { useEffect, useState } from 'react'
import HireMeBtn from './HireMeBtn'
import DirectionalButton from './DirectionalButton'
import BannerImage from './BannerImage'
import useInView from '@/hooks/useInView'
import { SanityHero } from '@/types/sanity'
import { getHeroData, getPortfolioProjects } from '../../../queries'
import { SiNextdotjs, SiTypescript, SiVercel } from 'react-icons/si'

const roles = ['AI/LLM Developer', 'AI Full Stack Engineer', 'Problem Solver']

const MiddleBanner = () => {
  const [herodata, setHeroData] = useState<SanityHero>()
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  useEffect(() => {
    getHeroData().then(setHeroData)
    console.log(getPortfolioProjects())
  }, [])

  // Rotating titles effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  const { ref: ref1, isInView: inView1 } = useInView<HTMLHeadingElement>(
    0.2,
    true
  )
  const { ref: ref2, isInView: inView2 } = useInView<HTMLHeadingElement>(
    0.2,
    true
  )

  return (
    <div className='flex items-center justify-center'>
      <div className='flex-col w-full md:w-[650px]'>
        <div className='text-7xl sm:text-8xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[9rem] font-bold tracking-wider text-white'>
          <div className='overflow-hidden h-fit'>
            <h1
              ref={ref1}
              className={`inline-block transition-all duration-700 ease-out h-fit ${
                inView1 ? 'translate-y-0 opacity-100' : '2xl:translate-y-24 translate-y-10 opacity-0'
              }`}
            >
              Hay' i m
            </h1>
          </div>
          <div className='overflow-hidden h-fit'>
            <h1
              ref={ref2}
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
              inView1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
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

        {/* Quick Stats */}
        <div
          className={`mt-10 transition-all duration-700 ease-out ${
            inView1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '850ms' }}
        >
          <div className='flex flex-wrap items-center gap-2 sm:gap-6 text-white/80'>
            <div className='flex items-center gap-1 sm:gap-2'>
              <span className='text-lg sm:text-2xl font-bold text-custom-orange'>4+</span>
              <span className='text-xs sm:text-sm'>Years Experience</span>
            </div>
            <span className='hidden sm:block w-1 h-1 rounded-full bg-white/40'></span>
            <div className='flex items-center gap-1 sm:gap-2'>
              <span className='text-lg sm:text-2xl font-bold text-custom-orange'>50+</span>
              <span className='text-xs sm:text-sm'>Clients</span>
            </div>
            <span className='hidden sm:block w-1 h-1 rounded-full bg-white/40'></span>
            <div className='flex items-center gap-1 sm:gap-2'>
              <span className='text-lg sm:text-2xl font-bold text-custom-orange'>20+</span>
              <span className='text-xs sm:text-sm'>Projects</span>
            </div>
          </div>
        </div>

        {/* Tech Stack with Icons */}
        <div
          className={`mt-6 transition-all duration-700 ease-out ${
            inView1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <p className='text-text2 text-xs mb-3 tracking-wider uppercase'>Tech Stack</p>
          <div className='flex flex-wrap items-center gap-2 sm:gap-4'>
            {[
              { name: 'Next.js', IconComponent: SiNextdotjs },
              { name: 'TypeScript', IconComponent: SiTypescript, color: '#3178C6' },
              { name: 'LLM/RAG', icon: '🧠' },
              { name: 'Vercel', IconComponent: SiVercel },
              { name: 'Docker', icon: '🐳' },
              { name: 'Stripe', icon: '💳' },
              { name: 'OAuth', icon: '🔐' },
              { name: 'Playwright', icon: '🎭' }
            ].map((tech) => (
              <div
                key={tech.name}
                className='group flex items-center gap-2 px-3 py-2 rounded-lg bg-background2/60 border border-border/50 hover:border-custom-orange/50 hover:bg-background2 transition-all duration-300 cursor-default'
                title={tech.name}
              >
                {tech.IconComponent ? (
                  <tech.IconComponent className='w-5 h-5' style={{ color: tech.color || 'white' }} />
                ) : (
                  <span className='text-lg'>{tech.icon}</span>
                )}
                <span className='text-sm text-white/80 group-hover:text-white'>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BannerImage />
    </div>
  )
}

export default MiddleBanner
