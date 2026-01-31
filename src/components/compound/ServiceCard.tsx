'use client';

import React from 'react'
import Tilt from 'react-parallax-tilt'
import useInView from '@/hooks/useInView'
import Image from 'next/image';

export type ServiceCardType = {
  ServiceName: string
  ServiceDescription: string
  ServiceImage: {
    asset: {
      url: string
    }
  }
  index: number
}

const ServiceCard: React.FC<ServiceCardType> = ({
  ServiceName,
  ServiceDescription,
  ServiceImage,
  index
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.5)
  const delay = `${index * 80}ms`

  return (
    <div
      ref={ref}
      data-testid='service-card'
      style={{
        transitionDelay: isInView ? delay : '0ms'
      }}
      className={`h-full ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-all duration-700 ease-out`}
    >
      <Tilt className='h-full p-7 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#212121] shadow-[10px_10px_15px_#0A0A0A,-10px_-10px_15px_#2C2C2C] hover:shadow-[12px_12px_20px_#0A0A0A,-12px_-12px_20px_#2C2C2C] will-change-transform transition-all duration-400 ease-[cubic-bezier(0.03,0.98,0.52,0.99)] perspective-[1000px] group'>
        <div className='w-14 h-14 rounded-xl bg-[#3a3a3a] flex items-center justify-center mb-5 group-hover:bg-[#454545] transition-colors duration-300'>
          <Image width={36} height={36} src={ServiceImage.asset.url} alt={ServiceName} className='object-contain' />
        </div>
        <h3 className='text-lg 2xl:text-xl font-bold text-white mb-3'>{ServiceName}</h3>
        <p className='text-sm 2xl:text-base text-text2 leading-relaxed'>
          {ServiceDescription}
        </p>
      </Tilt>
    </div>
  )
}

export default ServiceCard
