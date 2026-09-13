import { NextRequest, NextResponse } from 'next/server'
import { getAIProvider } from '@/lib/chat/provider'
import { getSystemPrompt } from '@/lib/chat/systemPrompt'
import { fitHistory, MAX_MESSAGE_CHARS } from '@/lib/chat/limits'
import { withQuestionNotes } from '@/lib/chat/questionNotes'
import { ChatMessage } from '@/types/chat'

export const runtime = 'nodejs'

// Only visitor and assistant turns are accepted. A client-sent "system" message could
// otherwise override the real instructions and make the bot say false things.
function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null

  const messages: ChatMessage[] = []
  for (const item of input) {
    if (!item || typeof item !== 'object') continue
    const { role, content } = item as { role?: unknown; content?: unknown }
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue
    const trimmed = content.trim()
    if (!trimmed) continue
    messages.push({ role, content: trimmed.slice(0, MAX_MESSAGE_CHARS) })
  }
  return messages
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 })
  }

  const messages = sanitizeMessages((body as { messages?: unknown } | null)?.messages)
  if (!messages) {
    return NextResponse.json({ error: 'Messages array is required' }, { status: 400 })
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'The last message must be a non-empty user message' }, { status: 400 })
  }

  const last = messages[messages.length - 1]
  messages[messages.length - 1] = { ...last, content: withQuestionNotes(last.content) }

  try {
    const provider = await getAIProvider()
    const systemPrompt = getSystemPrompt()

    const stream = await provider.chat({
      messages: [{ role: 'system', content: systemPrompt }, ...fitHistory(systemPrompt, messages)],
      stream: true,
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    // Log the details server-side only; upstream error text shouldn't reach visitors.
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
