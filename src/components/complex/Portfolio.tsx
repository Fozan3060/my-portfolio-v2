'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import SectionHeading from '../ui/SectionHeading'
import SectionWrapper from '../ui/SectionWrapper'
import Wrapper from './Wrapper'
import PortfolioCard from './PortfolioCard'
import useInView from '@/hooks/useInView'
import { getPortfolioProjects } from '../../../queries'
import { SanityProject } from '@/types/sanity'

type FilterCategory = 'all' | 'ai' | 'fullstack'

// Sanity has no ordering field, so lead with the strongest work; anything new goes last.
const FEATURED_ORDER = ['Persona AI', 'Career Coach AI', 'DayOf', 'ShoutOut', 'Merchantra', 'Creative Squad']

const isAiProject = (project: SanityProject) => project.category.toLowerCase().includes('ai')

const rank = (project: SanityProject) => {
  const index = FEATURED_ORDER.findIndex((name) => name.toLowerCase() === project.projectName.toLowerCase())
  return index === -1 ? FEATURED_ORDER.length : index
}

const Portfolio = () => {
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const { ref, isInView } = useInView<HTMLDivElement>(0.2, true)

  useEffect(() => {
    getPortfolioProjects().then((data: SanityProject[]) => setProjects([...data].sort((a, b) => rank(a) - rank(b))))
  }, [])

  const filters = useMemo(
    () => [
      { key: 'all' as const, label: 'All', count: projects.length },
      { key: 'ai' as const, label: 'AI products', count: projects.filter(isAiProject).length },
      { key: 'fullstack' as const, label: 'Full stack', count: projects.filter((p) => !isAiProject(p)).length }
    ],
    [projects]
  )

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ai') return projects.filter(isAiProject)
    if (activeFilter === 'fullstack') return projects.filter((p) => !isAiProject(p))
    return projects
  }, [projects, activeFilter])

  return (
    <Wrapper sectionId='portfolio'>
      <SectionWrapper>
        <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='Portfolio' />

        <div ref={ref} className='mx-auto max-w-7xl'>
          <div
            className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className='text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl xl:text-5xl'>
              Selected <span className='text-custom-orange'>work</span>
            </h2>
            <p className='mt-5 text-base leading-relaxed text-text2 sm:text-lg'>
              Live products I&apos;ve shipped, from AI apps to payments and ticketing platforms.
            </p>
          </div>

          <div className='mt-10 flex justify-center'>
            <div role='tablist' aria-label='Filter projects' className='inline-flex rounded-full border border-white/10 bg-background2 p-1'>
              {filters.map((filter) => {
                const active = activeFilter === filter.key
                return (
                  <button
                    key={filter.key}
                    role='tab'
                    aria-selected={active}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`relative cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-300 sm:px-5 sm:text-sm ${
                      active ? 'text-background' : 'text-text2 hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId='portfolio-filter'
                        className='absolute inset-0 rounded-full bg-custom-orange'
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className='relative'>
                      {filter.label}
                      {projects.length > 0 && (
                        <span className={`ml-1.5 ${active ? 'text-background/70' : 'text-text2/70'}`}>{filter.count}</span>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className='mt-10 grid grid-cols-1 gap-5 md:grid-cols-2'>
            {filteredProjects.map((project) => (
              <PortfolioCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default Portfolio
