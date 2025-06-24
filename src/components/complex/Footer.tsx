'use client'

import React from 'react'
import Wrapper from './Wrapper'
import NavigationLinks from '../compound/NavigationLinks'
import SocialLinks from '../ui/SocialLinks'
import { TbArrowUpRight } from 'react-icons/tb'

const Footer = () => {
  return (
    <div className='bg-background2 pt-16'>
      <Wrapper>
        <div className='max-w-6xl w-full m-auto'>
          <div className='lg:flex-row gap-y-3 lg:gap-y-0 flex flex-col justify-between lg:items-center mb-10 '>
            <NavigationLinks className='flex flex-wrap gap-x-10 gap-y-2' />
            <div className='flex gap-5'>
              <SocialLinks />
            </div>
          </div>
          <div className='bg-white py-5 sm:py-10 rounded-t-3xl px-8'>
            <div className='flex flex-col md:flex-row gap-y-2 md:gap-y-0  justify-between'>
              <a
                className='font-medium text-lg flex items-center gap-2 hover:text-custom-orange cursor-pointer transition-colors duration-300'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span>Back To The Top</span>
                <TbArrowUpRight className='inline-block text-2xl' />
              </a>
              <p className='font-medium text-lg'>
                © 2025. All rights reserved by Fozan Javaid
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Footer
