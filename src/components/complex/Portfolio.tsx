'use client'

import React, { useEffect, useState } from 'react'
import Logo from '../ui/Logo'
import SectionHeading from '../ui/SectionHeading'
import SectionWrapper from '../ui/SectionWrapper'
import Wrapper from './Wrapper'
import PortfolioCard from './PortfolioCard'
import { getPortfolioProjects } from '../../../queries'
import { SanityProject } from '@/types/sanity'

const Portfolio = () => {
  const [projects, setProjects] = useState<SanityProject[]>([])

  useEffect(() => {
    getPortfolioProjects().then(setProjects)
    console.log(getPortfolioProjects())
  }, [])

  return (
    <Wrapper sectionId='portfolio'>
      <SectionWrapper>
        <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='Portfolio' />
        <div className='flex flex-wrap justify-center gap-6'>
          {projects.map(project => (
            <PortfolioCard key={project._id} project={project} />
          ))}
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default Portfolio
