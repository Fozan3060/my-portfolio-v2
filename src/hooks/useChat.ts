'use client'

import { useState, useCallback, useRef } from 'react'
import { ChatMessage } from '@/types/chat'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isWarming, setIsWarming] = useState(false)
  const hasPrewarmed = useRef(false)

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: ChatMessage = { role: 'user', content }
      setMessages((prev) => [...prev, userMessage])
      setIsTyping(true)
      setError(null)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response')
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('No response body')
        }

        const decoder = new TextDecoder()
        let assistantContent = ''

        // Add placeholder for assistant message
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter((line) => line.startsWith('data: '))

          for (const line of lines) {
            const data = line.replace('data: ', '')
            if (data === '[DONE]') continue

            try {
              const json = JSON.parse(data)
              if (json.content) {
                assistantContent += json.content
                setMessages((prev) => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                  }
                  return updated
                })
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        // Remove the empty assistant message on error
        setMessages((prev) => prev.filter((m) => m.content !== ''))
      } finally {
        setIsTyping(false)
      }
    },
    [messages]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  // Prewarm the AI container when chat is opened
  const prewarm = useCallback(async () => {
    if (hasPrewarmed.current) return
    hasPrewarmed.current = true
    setIsWarming(true)

    try {
      await fetch('/api/chat/warm', { method: 'GET' })
    } catch {
      // Silently fail - prewarming is best effort
    } finally {
      setIsWarming(false)
    }
  }, [])

  return {
    messages,
    isTyping,
    isWarming,
    error,
    sendMessage,
    clearMessages,
    prewarm,
  }
}
