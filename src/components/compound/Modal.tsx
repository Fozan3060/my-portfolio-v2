'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className='relative max-w-6xl semi_md:w-full mx-4 
              bg-gradient-to-br from-[#1A1A1A] to-[#212121] 
              shadow-[10px_10px_15px_#0A0A0A,-10px_-10px_15px_#2C2C2C] 
              rounded-2xl p-7 md:p-10'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <Button
              label='✕'
              onClick={onClose}
              className='bg-gradient-to-br from-[#1A1A1A] to-[#212121] z-50
                absolute top-4 right-4 text-lg cursor-pointer text-white shadow-[4px_4px_10px_#0A0A0A,-4px_-4px_10px_#2C2C2C]
                w-12 aspect-square flex items-center justify-center 
                rounded-full'
            />
            <div className="overflow-x-hidden overflow-y-auto max-h-[70vh] scroll-smooth pr-2 pb-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
