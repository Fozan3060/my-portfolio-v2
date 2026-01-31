'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MdArrowOutward } from 'react-icons/md'
import PortfolioModal from '../compound/PortfolioModal'
import useInView from '@/hooks/useInView'
import { SanityProject } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'

type Props = {
  project: SanityProject
}

const MAX_VISIBLE_SKILLS = 3

const PortfolioCard = ({ project }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { ref, isInView } = useInView<HTMLDivElement>(0.2, true)

  const visibleSkills = project.skills?.slice(0, MAX_VISIBLE_SKILLS) || []
  const remainingSkillsCount = (project.skills?.length || 0) - MAX_VISIBLE_SKILLS

  return (
    <>
      <div
        ref={ref}
        className={`w-full sm:w-96 rounded-2xl p-7 bg-gradient-to-br from-[#1A1A1A] to-[#212121]
        shadow-[10px_10px_15px_#0A0A0A,-10px_-10px_15px_#2C2C2C]
        transition-all duration-700 ease-out flex flex-col
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Image */}
        <div
          className='w-full h-52 rounded-lg overflow-hidden mb-4 cursor-pointer'
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={urlFor(project.image).url()}
            alt={project.projectName}
            width={400}
            height={400}
            className='w-full h-full object-cover transition-transform duration-400 hover:scale-110'
          />
        </div>

        {/* Category */}
        <h3 className='text-custom-orange mb-1 font-bold uppercase text-xs tracking-wide'>
          {project.category}
        </h3>

        {/* Project Name */}
        <h2 className='text-lg font-semibold text-text3 mb-3'>
          {project.projectName}
        </h2>

        {/* Description - truncated to 2 lines */}
        <p className='text-text2 text-sm mb-4 line-clamp-2'>
          {project.description}
        </p>

        {/* Skills */}
        <div className='flex flex-wrap gap-2 mb-5'>
          {visibleSkills.map(skill => (
            <span
              key={skill}
              className='bg-background text-xs py-1.5 px-3 text-text2 rounded-full'
            >
              {skill}
            </span>
          ))}
          {remainingSkillsCount > 0 && (
            <span className='bg-background text-xs py-1.5 px-3 text-custom-orange rounded-full'>
              +{remainingSkillsCount} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button
          onClick={() => setIsOpen(true)}
          className='mt-auto w-full py-2.5 rounded-lg bg-transparent border border-custom-orange/50 text-custom-orange text-sm font-semibold
          hover:bg-custom-orange hover:text-background transition-all duration-300 cursor-pointer
          flex items-center justify-center gap-2'
        >
          View Details
          <MdArrowOutward className='text-base' />
        </button>
      </div>

      <PortfolioModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        skills={project.skills}
        description={project.description}
        category={project.category}
        link={project.link}
        name={project.projectName}
        img={project.image}
      />
    </>
  )
}

export default PortfolioCard
