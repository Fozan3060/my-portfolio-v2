'use client';

import React from 'react'
import Tilt from 'react-parallax-tilt'
import useInView from '@/hooks/useInView'

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
      className={`${
        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
      } transition-all duration-700 ease-out`}
    >
      <Tilt className='shadow-2xl p-6 rounded-lg bg-custom-orange will-change-transform transition-[transform] duration-[400ms] ease-[cubic-bezier(0.03,0.98,0.52,0.99)] perspective-[1000px] scale-100'>
        <img src={ServiceImage.asset.url} alt={ServiceName} />
        <h3 className='mt-4 2xl:text-lg font-bold text-white'>{ServiceName}</h3>
        <p className='mt-3 text-sm 2xl:text-base text-white text-opacity-80'>
          {ServiceDescription}
        </p>
      </Tilt>
    </div>
  )
}

export default ServiceCard
