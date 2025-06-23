'use client'

import React from 'react'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import NavigationLinks from '../compound/NavigationLinks'
import SocialLinks from '../ui/SocialLinks'

const Footer = () => {
  return (
    <div className='bg-background2 pt-16'>
      <Wrapper >
        <div className='max-w-6xl w-full m-auto'>
          <div className='lg:flex-row gap-y-3 lg:gap-y-0 flex flex-col justify-between lg:items-center mb-10 '>
            <NavigationLinks className='flex flex-wrap gap-x-10 gap-y-2' />
            <div className='flex gap-5'>
              <SocialLinks />
            </div>
          </div>
          <div className='bg-white py-10 rounded-t-3xl px-8'>
            <div className='flex flex-col md:flex-row gap-y-2 md:gap-y-0  justify-between'>
              <p className='font-medium text-lg'>Back To The Top</p>
              <p className='font-medium text-lg'>© 2025. All rights reserved by Fozan Javaid</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Footer
