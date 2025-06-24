'use client';

import useInView from '@/hooks/useInView'
import React from 'react'

type SectionHeadingType = {
  heading: string
}

const SectionHeading: React.FC<SectionHeadingType> = ({ heading }) => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2, true)
  return (
    <h2
    ref={ref}
      className={`
        text-custom-orange sm:text-xl font-[600] text-center mb-10 transition-all duration-700 ease-out
        ${
          isInView
            ? 'opacity-100 translate-y-0 scale-y-100'
            : 'opacity-0 translate-y-12 scale-y-125'
        }
      `}
    >
      {heading}
    </h2>
  )
}
export default SectionHeading
