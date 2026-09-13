import { ChatMessage } from '@/types/chat'

// Ollama context window for the chat model. The knowledge base in the system prompt is
// ~12K tokens. 16384 fits fully on an 8 GB GPU only when Ollama runs with
// OLLAMA_FLASH_ATTENTION=1 and OLLAMA_KV_CACHE_TYPE=q8_0.
export const NUM_CTX = 16384

// Longest reply the model may generate.
export const MAX_REPLY_TOKENS = 1536

// Longest single message a visitor may send. Longer messages are cut to this length.
export const MAX_MESSAGE_CHARS = 2000

// The English knowledge base measures 4.06 chars per token. Chat messages get a lower
// ratio because markdown, links, and non-English text pack more tokens per character.
// Re-measure SYSTEM_CHARS_PER_TOKEN if the knowledge base changes language or style.
const SYSTEM_CHARS_PER_TOKEN = 4
const MESSAGE_CHARS_PER_TOKEN = 3.5
const TEMPLATE_TOKENS_PER_MESSAGE = 8
const SAFETY_TOKENS = 256

function estimateTokens(text: string, charsPerToken: number): number {
  return Math.ceil(text.length / charsPerToken) + TEMPLATE_TOKENS_PER_MESSAGE
}

/**
 * Keeps the most recent messages that fit beside the system prompt and a full reply.
 *
 * Ollama trims history only far enough for the prompt itself. When the reply then runs
 * past the window, llama.cpp discards the start of the context, which is exactly where
 * the knowledge base lives, and answers stop being grounded. Trimming here first means
 * that never happens. The latest message is always kept.
 */
export function fitHistory(systemPrompt: string, messages: ChatMessage[]): ChatMessage[] {
  let budget = NUM_CTX - MAX_REPLY_TOKENS - SAFETY_TOKENS - estimateTokens(systemPrompt, SYSTEM_CHARS_PER_TOKEN)
  if (budget <= 0) {
    console.warn('Chat knowledge base is too large for the context window; sending only the latest message')
  }

  const kept: ChatMessage[] = []
  for (let i = messages.length - 1; i >= 0; i--) {
    const cost = estimateTokens(messages[i].content, MESSAGE_CHARS_PER_TOKEN)
    if (kept.length > 0 && cost > budget) break
    kept.unshift(messages[i])
    budget -= cost
  }

  // A conversation sent to the model must start with a visitor message.
  while (kept.length > 1 && kept[0].role !== 'user') kept.shift()
  return kept
}
