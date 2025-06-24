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

const PortfolioCard = ({ project }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { ref, isInView } = useInView<HTMLDivElement>(0.2, true)
  console.log(urlFor(project.image))
  return (
    <>
      <div
        ref={ref}
        className={`w-full sm:w-96 rounded-2xl p-7 bg-gradient-to-br from-[#1A1A1A] to-[#212121]
        shadow-[10px_10px_15px_#0A0A0A,-10px_-10px_15px_#2C2C2C] 
        transition-all duration-700 ease-out 
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div
          className='w-full h-64 rounded-lg overflow-hidden mb-4'
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={urlFor(project.image).url()}
            alt={project.projectName}
            width={400}
            height={400}
            className='w-full h-full cursor-pointer transition-transform duration-400 hover:scale-110'
          />
        </div>

        <h3 className='text-custom-orange mb-2 font-bold uppercase text-sm tracking-wide'>
          {project.category}
        </h3>

        <h2
          className='text-xl font-semibold text-text1 hover:text-custom-orange transition-colors duration-500 cursor-pointer group'
          onClick={() => setIsOpen(true)}
        >
          <span>
            {project.projectName}
            <MdArrowOutward className='transition-transform inline-block scale-0 ease-out group-hover:scale-125 group-hover:translate-x-1 ml-3 duration-300 mb-1' />
          </span>
        </h2>
      </div>

      <PortfolioModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        skills={project.skills}
        description={project.description}
        link={project.link}
        name={project.projectName}
        img={project.image}
      />
    </>
  )
}

export default PortfolioCard
