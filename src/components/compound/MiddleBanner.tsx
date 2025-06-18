import React from 'react'
import Button from '../ui/Button'
import { FaGreaterThan } from 'react-icons/fa'
import { PiGreaterThan, PiGreaterThanBold } from 'react-icons/pi'
import HireMeBtn from './HireMeBtn'
import DirectionalButton from './DirectionalButton'
import { div } from 'framer-motion/client'
import Image from 'next/image'
import BannerImage from './BannerImage'

const MiddleBanner = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex-col border'>
        <h1 className='text-7xl sm:text-8xl md:text-6xl  lg:text-8xl xl:text-9xl 2xl:text-[9rem] font-bold tracking-wider text-white'>
          <span>Hay’ i m</span>
          <br /> <span>Fozan</span>
        </h1>
        <p className='text-white text-lg 2xl:text-xl font-medium tracking-wider mt-4 max-w-2xl'>
          I'am Full-Stack developer with 3+ years of experience in building scalable web applications. I specialize in creating high-performance, user-friendly websites. 
        </p>
        <div className='flex-col flex sm:flex-row gap-5 mt-10'>
          <HireMeBtn />
          <DirectionalButton label='Download CV' />
        </div>
      </div>
      <BannerImage/>
    </div>
  )
}

export default MiddleBanner
