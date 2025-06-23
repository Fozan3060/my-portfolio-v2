'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useInView from '@/hooks/useInView'

const sociallinks = [FaLinkedinIn, FaGithub]

const FormBanner = () => {
  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>(0.2, true)

  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return (
    <motion.div
      ref={inViewRef}
      initial={{ x: '-20%', opacity: 0 }}
      animate={hasAnimated ? { x: '0%', opacity: 1 } : { x: '-20%', opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className='bg-background sm:w-xl rounded-2xl mx-auto xl:mx-0 shadow-2xl'
      style={{
        boxShadow:
          ' 0px 0px 12px rgba(255, 255, 255, 0.05),  0px 0px 8px rgba(0, 0, 0, 0.18)  '
      }}
    >
      <div className='p-10'>
        <Image
          src={'/assets/contact.png'}
          width={800}
          height={400}
          className='rounded-xl'
          alt='FormBannerImg'
        />

        <h2 className='text-3xl font-semibold text-white mt-6 mb-2'>Fozan Javaid</h2>
        <h3 className='text-xl text-text1 font-semibold mb-3'>Full-stack Developer</h3>
        <p className='text-xl text-text1 mb-4'>
          I am available for freelance work. Connect with me via and call in to
          my account.
        </p>
        <div className='text-xl'>
          <span className='text-text1'>Phone:</span>{' '}
          <span className='text-text3'>+923322440974</span>
        </div>
        <div className='text-xl mt-1'>
          <span className='text-text1'>Email:</span>{' '}
          <span className='text-text3'>Fozanjavaid111@gmail.com</span>
        </div>
        <p className='text-lg mt-8 uppercase text-text1 mb-4'>Find Me</p>
        <div className='flex gap-6'>
          {sociallinks.map((Icon, index) => (
            <div
              key={index}
              className='rounded-lg flex justify-center items-center w-20 h-20 text-white bg-background2 hover:bg-custom-orange p-3 transition-colors duration-300 cursor-pointer'
            >
              <Icon size={28} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FormBanner