'use client'

import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'

type ChatInputProps = {
  onSend: (message: string) => void
  disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border">
      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-background2 text-white placeholder:text-text2
            px-4 py-3 rounded-xl resize-none outline-none
            focus:ring-1 focus:ring-custom-orange/50 transition-all duration-300
            disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="w-12 h-12 rounded-xl bg-custom-orange flex items-center justify-center
            hover:bg-custom-orange/90 transition-colors duration-300
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoSend size={20} className="text-background" />
        </button>
      </div>
    </form>
  )
}

export default ChatInput
