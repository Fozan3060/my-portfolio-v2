import React from 'react'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import DirectionalButton from './DirectionalButton'
import Modal from './Modal'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type PortfolioModalType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  skills: string[]
  description: string
  name: string
  category: string
  link: string
  img: string
}

const PortfolioModal: React.FC<PortfolioModalType> = ({
  isOpen,
  setIsOpen,
  skills,
  description,
  name,
  category,
  link,
  img
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className='flex sm:w-[26rem] lg:w-full m-auto semi_md:flex-row flex-col gap-16 overflow-hidden'>
        <Image
          src={urlFor(img).url()}
          width={800}
          height={800}
          priority
          className='lg:w-[28rem]  xl:w-[30rem] h-auto rounded-lg'
          alt='ProjectImage'
        />
        <div className='flex flex-col justify-between'>
          <div>
            <span className='text-custom-orange text-xs font-bold uppercase tracking-wide'>
              {category}
            </span>
            <h2 className='text-2xl font-semibold text-text3 mt-1'>
              {name}
            </h2>
            <p className='text-text2 mt-4 mb-8 lg:text-lg'>{description}</p>
            <div className='flex mb-10 semi_md:mb-6 semi_md:text-sm lg:text-base items-center flex-wrap gap-3'>
              {skills.map(skill => (
                <span
                  key={skill}
                  className='bg-background  py-2 px-6 cursor-pointer hover:bg-custom-orange transition-colors duration-300 hover:text-background font-medium text-center text-nowrap text-white rounded-3xl'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className='overflow-hidden py-2 -my-2 px-3 -mx-3'>
            <a href={link} className='w-32 block'>
              <DirectionalButton>
                <span className='flex items-center justify-center gap-3 '>
                  <span>View Project</span>
                  <FaArrowUpRightFromSquare size={20} />
                </span>
              </DirectionalButton>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PortfolioModal
