'use client'

import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ChatToggleButton from '../compound/ChatToggleButton'
import ChatWindow from '../compound/ChatWindow'
import { useChat } from '@/hooks/useChat'

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isTyping, sendMessage } = useChat()

  return (
    <>
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            onSendMessage={sendMessage}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
