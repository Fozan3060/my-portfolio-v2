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
  const useModal = process.env.USE_MODAL_AI === 'true'

  // Use Modal in production (fine-tuned model)
  if ((isProduction || useModal) && !forceLocal) {
    const { ModalProvider } = await import('./modal')
    return new ModalProvider()
  }

  // Use Ollama locally (also fine-tuned model)
  const { OllamaProvider } = await import('./ollama')
  return new OllamaProvider()
}
