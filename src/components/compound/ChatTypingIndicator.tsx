'use client'

import React from 'react'
import { motion } from 'framer-motion'

const ChatTypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-background2 px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-custom-orange"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatTypingIndicator
