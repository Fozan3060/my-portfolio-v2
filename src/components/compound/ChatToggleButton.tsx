'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoChatbubbleEllipses, IoClose } from 'react-icons/io5'

type ChatToggleButtonProps = {
  isOpen: boolean
  onClick: () => void
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ isOpen, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const horizontal = x < width / 2 ? -1 : 1
    const vertical = y < height / 2 ? -1 : 1
    setTransform({ x: horizontal * 4, y: vertical * 2 })
  }

  const handleMouseLeave = () => setTransform({ x: 0, y: 0 })

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
        bg-gradient-to-br from-[#1A1A1A] to-[#212121]
        shadow-[10px_10px_15px_#0A0A0A,-10px_-10px_15px_#2C2C2C]
        hover:shadow-[12px_12px_20px_#0A0A0A,-12px_-12px_20px_#2C2C2C]
        flex items-center justify-center cursor-pointer
        transition-shadow duration-300"
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <IoClose size={24} className="text-custom-orange" />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <IoChatbubbleEllipses size={24} className="text-custom-orange" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default ChatToggleButton
