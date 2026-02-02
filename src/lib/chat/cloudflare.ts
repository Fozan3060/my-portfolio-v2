import { ChatMessage } from '@/types/chat'
import { ChatProvider } from './provider'

export class CloudflareProvider implements ChatProvider {
  private accountId: string
  private apiToken: string
  private model: string

  constructor() {
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID || ''
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN || ''
    this.model = '@cf/meta/llama-3.1-8b-instruct'

    if (!this.accountId || !this.apiToken) {
      throw new Error('Cloudflare credentials not configured')
    }
  }

  async chat({
    messages,
  }: {
    messages: ChatMessage[]
    stream?: boolean
  }): Promise<ReadableStream<Uint8Array>> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run/${this.model}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        stream: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Cloudflare AI error: ${error}`)
    }

    if (!response.body) {
      throw new Error('No response body from Cloudflare')
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
        const lines = text.split('\n').filter((line) => line.startsWith('data: '))

        for (const line of lines) {
          const jsonStr = line.replace('data: ', '')

          if (jsonStr === '[DONE]') {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            continue
          }

          try {
            const json = JSON.parse(jsonStr)
            if (json.response) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content: json.response })}\n\n`)
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
