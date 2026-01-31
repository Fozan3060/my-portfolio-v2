'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Logo from '../ui/Logo'
import SectionHeading from '../ui/SectionHeading'
import SectionWrapper from '../ui/SectionWrapper'
import Wrapper from './Wrapper'
import PortfolioCard from './PortfolioCard'
import { getPortfolioProjects } from '../../../queries'
import { SanityProject } from '@/types/sanity'

type FilterCategory = 'all' | 'fullstack' | 'ai'

const TAB_WIDTH_DESKTOP = 130
const TAB_WIDTH_MOBILE = 105

const Portfolio = () => {
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 400)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    getPortfolioProjects().then(setProjects)
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    if (activeFilter === 'ai') {
      return projects.filter(p =>
        p.category.toLowerCase().includes('ai')
      )
    }
    // fullstack - exclude AI projects
    return projects.filter(p =>
      !p.category.toLowerCase().includes('ai')
    )
  }, [projects, activeFilter])

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'ai', label: 'AI/LLM Full Stack' },
  ]

  const activeIndex = filters.findIndex(f => f.key === activeFilter)
  const tabWidth = isMobile ? TAB_WIDTH_MOBILE : TAB_WIDTH_DESKTOP

  return (
    <Wrapper sectionId='portfolio'>
      <SectionWrapper>
        <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='Portfolio' />

        {/* Filter Tabs */}
        <div className='flex justify-center mb-10'>
          <div className='relative inline-flex bg-background2 rounded-full p-1 sm:p-1.5 border border-border'>
            {/* Sliding indicator */}
            <div
              className='absolute top-1 bottom-1 sm:top-1.5 sm:bottom-1.5 bg-custom-orange rounded-full transition-all duration-300 ease-out'
              style={{
                left: `${activeIndex * tabWidth + (isMobile ? 4 : 6)}px`,
                width: `${tabWidth}px`
              }}
            />
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`relative z-10 py-2 sm:py-2.5 rounded-full font-semibold text-center whitespace-nowrap transition-colors duration-300 cursor-pointer
                  ${activeFilter === filter.key
                    ? 'text-background'
                    : 'text-text2 hover:text-text3'
                  }`}
                style={{
                  width: `${tabWidth}px`,
                  fontSize: isMobile ? '11px' : '14px'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-wrap justify-center gap-6'>
          {filteredProjects.map(project => (
            <PortfolioCard key={project._id} project={project} />
          ))}
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default Portfolio
