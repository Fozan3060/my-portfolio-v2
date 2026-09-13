'use client'

import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { LuCircleAlert, LuCircleCheck, LuSend } from 'react-icons/lu'
import DirectionalButton from './DirectionalButton'
import { CONTACT_EMAIL } from '@/lib/contact'

type Fields = { name: string; email: string; message: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY: Fields = { name: '', email: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = ({ name, email, message }: Fields) => {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Please enter a valid email address.'
  if (!message.trim()) errors.message = 'Please write a message.'
  return errors
}

const inputClasses = (invalid: boolean) =>
  `w-full rounded-xl border bg-background2 px-4 py-3 text-white outline-none transition-colors duration-300 placeholder:text-text2/60 focus:ring-2 ${
    invalid
      ? 'border-red-400/60 focus:border-red-400/70 focus:ring-red-400/15'
      : 'border-white/10 focus:border-custom-orange/60 focus:ring-custom-orange/15'
  }`

const ContactForm = () => {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sentTo, setSentTo] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof Fields]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (status === 'sent' || status === 'error') setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) return

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) {
      console.warn('Contact form: EmailJS environment variables are missing.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: fields.name.trim(),
          email: fields.email.trim(),
          description: fields.message.trim(),
          time: new Date().toLocaleString()
        },
        publicKey
      )
      setSentTo(fields.name.trim().split(/\s+/)[0])
      setFields(EMPTY)
      setStatus('sent')
    } catch (error) {
      console.warn('Contact form: sending failed.', error)
      setStatus('error')
    }
  }

  const field = (name: keyof Fields) => ({
    id: `contact-${name}`,
    name,
    value: fields[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    className: inputClasses(Boolean(errors[name]))
  })

  const fieldError = (name: keyof Fields) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className='mt-2 text-sm text-red-300'>
        {errors[name]}
      </p>
    )

  return (
    <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-5'>
      <div className='grid gap-5 sm:grid-cols-2'>
        <div>
          <label htmlFor='contact-name' className='mb-2 block text-sm font-medium text-text3'>
            Name
          </label>
          <input {...field('name')} type='text' autoComplete='name' maxLength={100} placeholder='Your name' />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor='contact-email' className='mb-2 block text-sm font-medium text-text3'>
            Email
          </label>
          <input {...field('email')} type='email' autoComplete='email' maxLength={254} placeholder='you@company.com' />
          {fieldError('email')}
        </div>
      </div>

      <div>
        <label htmlFor='contact-message' className='mb-2 block text-sm font-medium text-text3'>
          Message
        </label>
        <textarea
          {...field('message')}
          rows={6}
          maxLength={2000}
          placeholder='Tell me about your project, role or question.'
          className={`${inputClasses(Boolean(errors.message))} resize-y`}
        />
        {fieldError('message')}
      </div>

      <div aria-live='polite'>
        {status === 'sent' && (
          <p className='flex items-start gap-3 rounded-xl border border-custom-orange/25 bg-custom-orange/10 px-4 py-3 text-sm text-text3'>
            <LuCircleCheck aria-hidden size={18} className='mt-0.5 shrink-0 text-custom-orange' />
            Thanks{sentTo ? `, ${sentTo}` : ''}! Your message is on its way. I will get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className='flex items-start gap-3 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-text3'>
            <LuCircleAlert aria-hidden size={18} className='mt-0.5 shrink-0 text-red-300' />
            <span>
              Your message couldn&apos;t be sent. Please try again, or email me at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className='text-white underline underline-offset-2'>
                {CONTACT_EMAIL}
              </a>
              .
            </span>
          </p>
        )}
      </div>

      <DirectionalButton type='submit' disabled={status === 'sending'} className='w-full sm:w-fit'>
        <span className='flex items-center gap-2'>
          {status === 'sending' ? 'Sending...' : 'Send message'}
          <LuSend aria-hidden size={18} />
        </span>
      </DirectionalButton>
    </form>
  )
}

export default ContactForm
