'use client'

import React from 'react'
import HireMeBtn from './HireMeBtn'
import DirectionalButton from './DirectionalButton'
import BannerImage from './BannerImage'
import useInView from '@/hooks/useInView'

const MiddleBanner = () => {
  const { ref: ref1, isInView: inView1 } = useInView<HTMLHeadingElement>(
    0.2,
    true
  )
  const { ref: ref2, isInView: inView2 } = useInView<HTMLHeadingElement>(
    0.2,
    true
  )

  return (
    <div className='flex items-center justify-center'>
      <div className='flex-col'>
        <div className='text-7xl sm:text-8xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[9rem] font-bold tracking-wider text-white'>
          <div className='overflow-hidden h-fit'>
            <h1
              ref={ref1}
              className={`inline-block transition-transform duration-500 h-fit ${
                inView1 ? 'translate-y-0' : '2xl:translate-y-24 translate-y-10'
              }`}
            >
              Hay’ i m
            </h1>
          </div>
          <div className='overflow-hidden h-fit'>
            <h1
              ref={ref2}
              className={`inline-block transition-transform duration-500 delay-200 ${
                inView2 ? 'translate-y-0' : '2xl:translate-y-24 translate-y-10'
              }`}
            >
              Fozan
            </h1>
          </div>
        </div>
        <div className='h-fit overflow-hidden'>
          <p
            className={`text-white text-lg 2xl:text-xl font-medium tracking-wider mt-4 max-w-2xl inline-block transition-transform duration-500 h-fit delay-300 ${
              inView1 ? 'translate-y-0' : ' translate-y-24 sm:translate-y-16'
            }`}
          >
            {
              "I'm a Full-Stack developer with 3+ years of experience in building scalable web applications. I specialize in creating high-performance, user-friendly websites."
            }
          </p>
        </div>

        <div className={`flex-col overflow-hidden flex sm:flex-row gap-5 mt-10 transition-transform duration-500 delay-400 ${
              inView1 ? 'translate-y-0' : 'translate-y-8'
            }`}>
          <HireMeBtn />
          <DirectionalButton label='Download CV' />
        </div>
      </div>
      <BannerImage />
    </div>
  )
}

export default MiddleBanner
