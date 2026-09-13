import React from 'react'
import Image from 'next/image'
import { LuArrowUpRight } from 'react-icons/lu'
import Modal from './Modal'
import { urlFor } from '@/sanity/lib/image'
import { hostOf } from '@/lib/url'

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
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} label={name}>
      <div className='grid gap-8 lg:grid-cols-2 lg:gap-10'>
        <div className='overflow-hidden rounded-2xl border border-white/5 bg-background'>
          <Image
            src={urlFor(img).width(1400).url()}
            width={1400}
            height={900}
            sizes='(min-width: 1024px) 40vw, 90vw'
            loading='eager'
            className='h-auto max-h-[60vh] w-full object-cover object-top'
            alt={name}
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-xs font-medium text-custom-orange'>{category}</p>
          <h2 className='mt-1.5 text-2xl font-semibold text-white sm:text-3xl'>{name}</h2>
          <p className='mt-4 leading-relaxed text-text2'>{description.trim()}</p>

          <p className='mt-8 text-sm font-medium text-text3'>Built with</p>
          <ul className='mt-3 flex flex-wrap gap-2'>
            {skills.map(skill => (
              <li key={skill} className='rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-sm text-text3'>
                {skill}
              </li>
            ))}
          </ul>

          {link && (
            <div className='mt-8 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-8'>
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-xl bg-custom-orange px-5 py-3 font-semibold text-background transition-opacity duration-300 hover:opacity-90'
              >
                Visit live site
                <LuArrowUpRight aria-hidden size={18} />
              </a>
              <span className='text-sm text-text2'>{hostOf(link)}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default PortfolioModal
