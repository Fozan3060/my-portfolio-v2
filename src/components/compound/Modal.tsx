'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuX } from 'react-icons/lu'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  label?: string
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, label, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
      root.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role='dialog'
            aria-modal='true'
            aria-label={label}
            className='relative w-full max-w-5xl rounded-3xl border border-white/10 bg-background2 p-5 shadow-2xl sm:p-8'
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              type='button'
              aria-label='Close'
              onClick={onClose}
              className='absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-background2 text-white transition-colors duration-300 hover:border-custom-orange/40 hover:text-custom-orange'
            >
              <LuX size={20} />
            </button>
            <div className='max-h-[80vh] overflow-y-auto overflow-x-hidden pr-1 pt-10 lg:pt-0'>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
