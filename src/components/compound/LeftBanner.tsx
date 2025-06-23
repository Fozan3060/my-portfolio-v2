'use client'

import React from 'react'
import { MdDialpad } from 'react-icons/md'
import VerticalText from './VerticalText'
import Image from 'next/image'
import useInView from '@/hooks/useInView'

const LeftBanner = () => {
  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>(0.2, true)

  return (
    <VerticalText
      ref={inViewRef}
      className={`hidden md:flex gap-10 origin-bottom-left items-center tracking-wider left-5 absolute 2xl:left-0 top-16 lg:top-24 2xl:top-0 justify-center
  transition-transform duration-700 ease-out ${isInView ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'}`}
    >
      <MdDialpad size={29} color='white' className='transform rotate-270' />
      <h3 className='hover:text-custom-orange mr-5 text-white cursor-pointer transition-colors duration-300'>
        03322440974
      </h3>
      <h3 className='text-text1 font-medium  uppercase'>Scroll</h3>
      <Image
        src='/assets/scrolldown.png'
        alt='Scroll Down'
        width={50}
        height={5}
        className='transform absolute rotate-270 -right-40'
      />
    </VerticalText>
  )
}

export default LeftBanner
