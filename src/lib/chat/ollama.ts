import { ChatMessage } from '@/types/chat'
import { ChatProvider } from './provider'
import { MAX_REPLY_TOKENS, NUM_CTX } from './limits'

export class OllamaProvider implements ChatProvider {
  private baseUrl: string
  private model: string

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
    this.model = process.env.OLLAMA_MODEL || 'llama3.1:8b'
  }

  async chat({
    messages,
  }: {
    messages: ChatMessage[]
    stream?: boolean
  }): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages,
        stream: true,
        options: { num_ctx: NUM_CTX, num_predict: MAX_REPLY_TOKENS },
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status} ${await response.text()}`)
    }

    if (!response.body) {
      throw new Error('No response body from Ollama')
    }

    return this.transformStream(response.body)
  }

  private transformStream(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
    const reader = body.getReader()
    const decoder = new TextDecoder()
    const encoder = new TextEncoder()
    // Ollama sends one JSON object per line, but a network chunk can end mid-line (or
    // mid-character), so keep the unfinished tail until the next chunk arrives.
    let pending = ''

    const toEvent = (line: string): Uint8Array | null => {
      if (!line.trim()) return null
      try {
        const content = JSON.parse(line).message?.content
        return content ? encoder.encode(`data: ${JSON.stringify({ content })}\n\n`) : null
      } catch {
        return null
      }
    }

    return new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read()

        if (done) {
          const last = toEvent(pending + decoder.decode())
          if (last) controller.enqueue(last)
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
          return
        }

        pending += decoder.decode(value, { stream: true })
        const lines = pending.split('\n')
        pending = lines.pop() ?? ''

        for (const line of lines) {
          const event = toEvent(line)
          if (event) controller.enqueue(event)
        }
      },
      cancel() {
        reader.cancel()
      },
    })
  }
}
