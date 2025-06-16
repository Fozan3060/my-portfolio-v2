import React from 'react'
import { MdDialpad } from 'react-icons/md'
import VerticalText from './VerticalText'
import Image from 'next/image'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const sociallinks = [FaLinkedinIn, FaGithub]

const RightBanner = () => {
  return (
    <VerticalText className='hidden md:flex gap-10 items-center origin-top-right  tracking-wider  absolute right-5 top-72 2xl:right-0 2xl:top-24 justify-center'>
      <h3 className='text-text1 font-medium  uppercase'>Follow Me</h3>
      <Image
        src='/assets/scrolldown.png'
        alt='Scroll Down'
        width={50}
        height={5}
        className='transform absolute rotate-270 -right-40'
      />
      <div className='flex gap-4 absolute -right-96'>
       {sociallinks.map((Icon, index) => (
            <div
              key={index}
              className='rounded-full text-white bg-black hover:bg-custom-orange p-3 transition-colors duration-300 cursor-pointer'
            >
              <Icon size={20} />
            </div>
          ))}
        
      </div>
    </VerticalText>
  )
}

export default RightBanner
