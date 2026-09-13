'use client'

import React from 'react'
import Image from 'next/image'
import { LuCpu, LuGamepad2, LuPizza } from 'react-icons/lu'
import SectionWrapper from '../ui/SectionWrapper'
import Wrapper from '../complex/Wrapper'
import useInView from '@/hooks/useInView'

// Email, phone and availability live in the Contact section; this card is the personal side.
const facts = [
  { label: 'Name', value: 'Fozan Javaid' },
  { label: 'Based in', value: 'Karachi, Pakistan (UTC+5)' },
  { label: 'Languages', value: 'English, Urdu' },
  { label: 'Started coding', value: 'During A-Levels' }
]

const interests = [
  {
    icon: LuGamepad2,
    title: 'Gaming',
    text: 'Story-driven, challenging games like Sekiro and God of War.'
  },
  {
    icon: LuCpu,
    title: 'Hardware',
    text: 'NVIDIA and Apple fan, with an RTX 5060 rig for local AI.'
  },
  {
    icon: LuPizza,
    title: 'Food',
    text: 'A self-confessed foodaholic with a soft spot for fast food.'
  }
]

const Personalnfo = () => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15, true)

  return (
    <Wrapper>
      <SectionWrapper>
        <div
          ref={ref}
          className={`mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-white/5 bg-background2 transition-all duration-700 ease-out xl:grid-cols-12 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className='relative flex items-end justify-center overflow-hidden px-6 pt-10 xl:col-span-5 xl:px-10 xl:pt-14'>
            <div
              aria-hidden
              className='grid-pattern absolute inset-0 [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_70%)]'
            />
            <div aria-hidden className='absolute bottom-0 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-custom-orange/15 blur-3xl' />
            <Image
              src='/assets/about.png'
              width={410}
              height={486}
              className='relative h-auto w-48 sm:w-64 xl:w-full xl:max-w-sm'
              alt='3D illustration of Fozan working at his desk'
            />
          </div>

          <div className='border-white/5 p-6 sm:p-10 xl:col-span-7 xl:border-l xl:p-14'>
            <h2 className='text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl'>Beyond the code</h2>
            <p className='mt-5 max-w-2xl leading-relaxed text-text2 sm:text-lg'>
              I&apos;m mostly self-taught. I started coding during A-Levels with a Udemy web development bootcamp, and
              today I lead a company&apos;s platform while finishing my CS degree. What keeps me going is learning new
              technology and turning ideas into working products.
            </p>

            <dl className='mt-8 grid grid-cols-2 gap-x-6 sm:gap-x-8'>
              {facts.map(({ label, value }) => (
                <div key={label} className='border-t border-white/5 py-4'>
                  <dt className='text-sm text-text2'>{label}</dt>
                  <dd className='mt-1 font-medium text-white'>{value}</dd>
                </div>
              ))}
            </dl>

            <ul className='mt-6 grid gap-3 sm:grid-cols-3'>
              {interests.map(({ icon: Icon, title, text }, idx) => (
                <li
                  key={title}
                  style={{ transitionDelay: isInView ? `${200 + idx * 90}ms` : '0ms' }}
                  className={`flex gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-700 ease-out sm:block ${
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <Icon aria-hidden size={20} className='mt-0.5 shrink-0 text-custom-orange sm:mt-0' />
                  <div>
                    <p className='font-semibold text-white sm:mt-3'>{title}</p>
                    <p className='mt-1 text-sm leading-relaxed text-text2'>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default Personalnfo
