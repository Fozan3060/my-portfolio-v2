'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown, { Components } from 'react-markdown'
import { ChatMessage as ChatMessageType } from '@/types/chat'

type ChatMessageProps = {
  message: ChatMessageType
}

// The model answers in markdown (bold, lists, links). react-markdown never renders raw
// HTML by default, so model output can't inject markup into the page.
const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  ul: ({ children }) => <ul className="mb-2 last:mb-0 list-disc pl-5 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 last:mb-0 list-decimal pl-5 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="pl-0.5">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-custom-orange underline underline-offset-2">
      {children}
    </a>
  ),
  code: ({ children }) => <code className="rounded bg-background px-1 py-0.5 text-[0.85em]">{children}</code>,
  h1: ({ children }) => <p className="mb-2 font-semibold text-white">{children}</p>,
  h2: ({ children }) => <p className="mb-2 font-semibold text-white">{children}</p>,
  h3: ({ children }) => <p className="mb-2 font-semibold text-white">{children}</p>,
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-custom-orange text-background rounded-br-sm'
            : 'bg-background2 text-white rounded-bl-sm'
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="text-sm leading-relaxed break-words">
            <ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ChatMessage
