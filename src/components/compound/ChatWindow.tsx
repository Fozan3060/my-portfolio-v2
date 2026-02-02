'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ChatTypingIndicator from './ChatTypingIndicator'
import { ChatMessage as ChatMessageType } from '@/types/chat'

type ChatWindowProps = {
  messages: ChatMessageType[]
  isTyping: boolean
  isWarming?: boolean
  onSendMessage: (message: string) => void
  onClose: () => void
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isTyping,
  isWarming,
  onSendMessage,
  onClose,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh]
        bg-gradient-to-br from-[#1A1A1A] to-[#212121]
        shadow-[10px_10px_15px_#0A0A0A,-10px_-10px_15px_#2C2C2C]
        rounded-2xl flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-custom-orange/20 flex items-center justify-center">
            <span className="text-custom-orange text-lg font-semibold">AI</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Fozan&apos;s Assistant</h3>
            <p className="text-text2 text-xs">
              {isWarming ? 'Warming up AI...' : 'Ask me anything about Fozan'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-background2 flex items-center justify-center
            hover:bg-custom-orange/20 transition-colors duration-300"
        >
          <IoClose size={18} className="text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-background2 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="text-center text-text2 mt-8">
            <p className="text-lg mb-2">Hi there! 👋</p>
            <p className="text-sm">Ask me about Fozan&apos;s skills, services, or projects.</p>
          </div>
        )}
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isTyping && <ChatTypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={isTyping} />
    </motion.div>
  )
}

export default ChatWindow
