import { ChatMessage } from '@/types/chat'

export interface ChatProvider {
  chat(options: {
    messages: ChatMessage[]
    stream?: boolean
  }): Promise<ReadableStream<Uint8Array>>
}

export async function getAIProvider(): Promise<ChatProvider> {
  const isProduction = process.env.NODE_ENV === 'production'
  const forceLocal = process.env.FORCE_LOCAL_AI === 'true'

  if (isProduction && !forceLocal) {
    const { CloudflareProvider } = await import('./cloudflare')
    return new CloudflareProvider()
  }

  const { OllamaProvider } = await import('./ollama')
  return new OllamaProvider()
}
