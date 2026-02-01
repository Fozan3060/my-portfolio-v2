import { NextRequest, NextResponse } from 'next/server'
import { getAIProvider } from '@/lib/chat/provider'
import { SYSTEM_PROMPT } from '@/lib/chat/systemPrompt'
import { ChatMessage } from '@/types/chat'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 })
    }

    const provider = await getAIProvider()

    const fullMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ]

    const stream = await provider.chat({
      messages: fullMessages,
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
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
