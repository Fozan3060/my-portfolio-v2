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
  link: string
  img: string
}

const PortfolioModal: React.FC<PortfolioModalType> = ({
  isOpen,
  setIsOpen,
  skills,
  description,
  name,
  link,
  img
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className='flex sm:w-[26rem]  lg:w-full m-auto semi_md:flex-row flex-col gap-16'>
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
            <h2 className='text-2xl  font-semibold text-custom-orange'>
              {name}
            </h2>
            <p className='text-text2 mt-4 mb-6 lg:text-lg'>{description}</p>
            <div className='flex mb-10 semi_md:mb-0 semi_md:text-sm lg:text-base items-center flex-wrap gap-2 '>
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

          <a href={link} className='w-32'>
            <DirectionalButton>
              <span className='flex items-center justify-center gap-3 '>
                <span>View Project</span>
                <FaArrowUpRightFromSquare size={20} />
              </span>
            </DirectionalButton>
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default PortfolioModal
