'use client'

import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import DirectionalButton from './DirectionalButton'
import useInView from '@/hooks/useInView'

const FormEmail: React.FC = () => {
  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>(0.2, true)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    const { target } = e
    const { name, value } = target

    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const serviceId = process.env.GATSBY_EMAILJS_SERVICE_ID
    const templateId = process.env.GATSBY_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.GATSBY_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('Missing EmailJS environment variables.')
      alert('Email service is not configured properly. Please contact the site administrator.')
      return
    }

    setLoading(true)

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message
        },
        publicKey
      )
      .then(() => {
        setLoading(false)
        alert('Thank you. I will get back to you soon!')
        setForm({ name: '', email: '', message: '' })
      })
      .catch((error: any) => {
        setLoading(false)
        console.error('Email sending error:', error)
        alert('Oops! Something went wrong. Please try again.')
      })
  }

  return (
    <motion.div
      ref={inViewRef}
      initial={{ x: '30%', opacity: 0 }}
      animate={hasAnimated ? { x: '0%', opacity: 1 } : { x: '30%', opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      style={{
        boxShadow:
          ' 0px 0px 12px rgba(255, 255, 255, 0.05),  0px 0px 8px rgba(0, 0, 0, 0.18)      '
      }}
      className='bg-background mx-auto xl:mx-0 w-full p-8 sm:w-xl lg:w-[40rem] rounded-2xl'
    >
      <p className='text-custom-orange text-xl mb-2 uppercase'>Get in touch</p>
      <h3 className='text-white text-6xl font-extrabold'>Contact.</h3>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='mt-12 flex flex-col gap-8'
      >
        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Name</span>
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder="What's your good name?"
            className='bg-background2 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
          />
        </label>

        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your email</span>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder="What's your web address?"
            className='bg-background2 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
          />
        </label>

        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Message</span>
          <textarea
            rows={7}
            name='message'
            value={form.message}
            onChange={handleChange}
            placeholder='What you want to say?'
            className='bg-background2 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
          />
        </label>
        <DirectionalButton className='w-64' type='submit'>
          {loading ? 'Sending...' : 'Send'}
        </DirectionalButton>
      </form>
    </motion.div>
  )
}

export default FormEmail