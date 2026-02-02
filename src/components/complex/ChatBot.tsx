'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import ChatToggleButton from '../compound/ChatToggleButton'
import ChatWindow from '../compound/ChatWindow'
import { useChat } from '@/hooks/useChat'

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isTyping, isWarming, sendMessage, prewarm } = useChat()

  // Prewarm the AI container when chat is opened
  useEffect(() => {
    if (isOpen) {
      prewarm()
    }
  }, [isOpen, prewarm])

  return (
    <>
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            isWarming={isWarming}
            onSendMessage={sendMessage}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
