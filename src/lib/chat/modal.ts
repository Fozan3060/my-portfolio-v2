import { ChatMessage } from '@/types/chat'
import { ChatProvider } from './provider'

export class ModalProvider implements ChatProvider {
  private endpoint: string

  constructor() {
    this.endpoint =
      process.env.MODAL_ENDPOINT ||
      'https://fozan3060--fozan-assistant-chat.modal.run'
  }

  async chat({
    messages,
  }: {
    messages: ChatMessage[]
    stream?: boolean
  }): Promise<ReadableStream<Uint8Array>> {
    // Convert messages to history format for Modal API
    const history: [string, string][] = []
    let currentMessage = ''

    // Build history from messages (skip system message, Modal has its own)
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      if (msg.role === 'system') continue

      if (msg.role === 'user') {
        if (i === messages.length - 1) {
          // Last message is the current query
          currentMessage = msg.content
        } else {
          // Find the next assistant message for this user message
          const nextMsg = messages[i + 1]
          if (nextMsg && nextMsg.role === 'assistant') {
            history.push([msg.content, nextMsg.content])
            i++ // Skip the assistant message we just used
          }
        }
      }
    }

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: currentMessage,
        history,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Modal error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    // Convert to streaming format (simulate streaming for consistent UX)
    return this.createStreamFromResponse(data.response || '')
  }

  private createStreamFromResponse(text: string): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder()
    const words = text.split(' ')
    let index = 0

    return new ReadableStream({
      async pull(controller) {
        if (index >= words.length) {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
          return
        }

        // Send a few words at a time for natural streaming feel
        const chunk = words.slice(index, index + 3).join(' ')
        index += 3

        // Add space if not at end
        const content = index < words.length ? chunk + ' ' : chunk

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))

        // Small delay between chunks for natural feel
        await new Promise((resolve) => setTimeout(resolve, 30))
      },
    })
  }

  /**
   * Ping the endpoint to keep it warm
   * Call this periodically (e.g., every 5 min) to avoid cold starts
   */
  async keepWarm(): Promise<boolean> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'ping' }),
      })
      return response.ok
    } catch {
      return false
    }
  }
}
