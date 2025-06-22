// SkillCard.jsx (or .tsx)
'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import useInView from '../../hooks/useInView'

type SkillCardType = {
  src: string
  name: string
  value: number
  delay: number
}

const SkillCard: React.FC<SkillCardType> = ({ src, name, value, delay }) => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2)

  const springValue = useSpring(0, { stiffness: 100, damping: 20 })
  const displayedValue = useTransform(springValue, latest => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    } else {
      springValue.set(0)
    }
  }, [isInView, value, springValue])

  return (
    <motion.div
      ref={ref}
      className='lg:w-60 w-48'
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: 'easeOut' }}
    >
      <div className='py-14 lg:px-12 text-white text-center border border-solid border-[rgba(255,255,255,0.05)] rounded-tr-[45px] rounded-bl-[45px] '>
        <div>
          <div className='lg:h-28 h-24 w-24 lg:w-28 rounded-full flex items-center bg-white m-auto'>
            <Image
              src={src}
              width={80}
              className='m-auto lg:w-20 w-16'
              height={80}
              alt='SkillImg'
            />
          </div>
          <h3 className='text-4xl mt-5 font-bold'>
            <motion.span>{displayedValue}</motion.span>%
          </h3>
        </div>
      </div>
      <h3 className='text-center font-medium text-white text-xl mt-6'>
        {name}
      </h3>
    </motion.div>
  )
}

export default SkillCard
