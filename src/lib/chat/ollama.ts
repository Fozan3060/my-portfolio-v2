import { ChatMessage } from '@/types/chat'
import { ChatProvider } from './provider'

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
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`)
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

    return new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read()

        if (done) {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
          return
        }

        const text = decoder.decode(value)
        const lines = text.split('\n').filter(Boolean)

        for (const line of lines) {
          try {
            const json = JSON.parse(line)
            if (json.message?.content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content: json.message.content })}\n\n`)
              )
            }
          } catch {
            // Skip malformed lines
          }
        }
      },
      cancel() {
        reader.cancel()
      },
    })
  }
}
