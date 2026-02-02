import { NextResponse } from 'next/server'

const MODAL_ENDPOINT =
  process.env.MODAL_ENDPOINT || 'https://fozan3060--fozan-assistant-chat.modal.run'

/**
 * Keep-warm endpoint for Modal
 * Call this periodically to prevent cold starts
 * Can be used with:
 * - Vercel Cron Jobs
 * - Client-side prewarming on page load
 * - External monitoring service
 */
export async function GET() {
  try {
    const startTime = Date.now()

    // Send a minimal request to wake up the container
    const response = await fetch(MODAL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'ping' }),
    })

    const elapsed = Date.now() - startTime
    const isWarm = elapsed < 10000 // Consider warm if response under 10s

    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: 'Modal endpoint returned error' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      status: 'ok',
      warm: isWarm,
      responseTime: elapsed,
      message: isWarm ? 'Container is warm' : 'Container was cold, now warming up',
    })
  } catch (error) {
    console.error('Keep-warm error:', error)
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Also support POST for flexibility
export async function POST() {
  return GET()
}
