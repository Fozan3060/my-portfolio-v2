import React from 'react'
import { MdDialpad } from 'react-icons/md'
import VerticalText from './VerticalText'
import Image from 'next/image'

const LeftBanner = () => {
  return (
 
      <VerticalText className='hidden md:flex gap-10 origin-bottom-left items-center tracking-wider left-5 absolute 2xl:left-0 top-16 lg:top-24 2xl:top-0 justify-center'>
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
