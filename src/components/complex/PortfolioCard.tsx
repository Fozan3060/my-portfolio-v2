'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { LuArrowUpRight, LuExpand } from 'react-icons/lu'
import PortfolioModal from '../compound/PortfolioModal'
import useInView from '@/hooks/useInView'
import { SanityProject } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'
import { hostOf } from '@/lib/url'

type Props = {
  project: SanityProject
}

const MAX_VISIBLE_SKILLS = 4

const PortfolioCard = ({ project }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { ref, isInView } = useInView<HTMLDivElement>(0.15, true)

  const skills = project.skills ?? []
  const visibleSkills = skills.slice(0, MAX_VISIBLE_SKILLS)
  const remainingSkillsCount = skills.length - visibleSkills.length

  return (
    <>
      <article
        ref={ref}
        className={`group flex flex-col rounded-3xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#212121] p-3 transition-all duration-700 ease-out hover:border-white/10 sm:p-4 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <button
          type='button'
          onClick={() => setIsOpen(true)}
          aria-label={`View details for ${project.projectName}`}
          className='relative block aspect-[16/10] cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-background'
        >
          <Image
            src={urlFor(project.image).width(1200).url()}
            alt={project.projectName}
            fill
            sizes='(min-width: 768px) 50vw, 100vw'
            className='object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
          />
        </button>

        <div className='flex flex-1 flex-col px-2 pb-2 pt-5 sm:px-3'>
          <p className='text-xs font-medium text-custom-orange'>{project.category}</p>
          <h3 className='mt-1.5 text-xl font-semibold text-white sm:text-2xl'>{project.projectName}</h3>
          <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-text2 sm:text-base'>{project.description}</p>

          <ul className='mt-4 flex flex-wrap gap-2'>
            {visibleSkills.map((skill) => (
              <li key={skill} className='rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-xs text-text3'>
                {skill}
              </li>
            ))}
            {remainingSkillsCount > 0 && (
              <li className='rounded-md px-2 py-1 text-xs text-text2'>+{remainingSkillsCount} more</li>
            )}
          </ul>

          <div className='mt-auto flex flex-wrap items-center gap-3 pt-6'>
            {project.link && (
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-xl bg-custom-orange px-4 py-2.5 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-90'
              >
                Visit live site
                <LuArrowUpRight aria-hidden size={16} />
              </a>
            )}
            <button
              type='button'
              onClick={() => setIsOpen(true)}
              className='inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-text3 transition-colors duration-300 hover:border-white/20 hover:text-white'
            >
              <LuExpand aria-hidden size={15} />
              Details
            </button>
            {project.link && <span className='ml-auto hidden text-xs text-text2 sm:inline'>{hostOf(project.link)}</span>}
          </div>
        </div>
      </article>

      <PortfolioModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        skills={skills}
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
