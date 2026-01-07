import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { text, language } = await req.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Use 'nova' voice - natural, clear, female voice that works great for all languages
    const response = await openai.audio.speech.create({
      model: 'tts-1', // Fast and cost-effective
      voice: 'nova',  // Female, soft-spoken, natural voice
      input: text,
      response_format: 'mp3',
    })

    // Convert response to buffer
    const buffer = Buffer.from(await response.arrayBuffer())

    // Return audio with proper headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (error: any) {
    console.error('TTS error:', error)
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    )
  }
}
