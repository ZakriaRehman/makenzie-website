import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as Blob
    const language = formData.get('language') as string | null

    if (!audio) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 })
    }

    // Convert blob to file for OpenAI API
    const file = new File([audio], 'audio.webm', { type: audio.type })

    // Use Whisper API for transcription
    const response = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: language || undefined, // Auto-detect if not provided
      response_format: 'json',
    })

    return NextResponse.json({
      text: response.text,
      language: language || 'auto'
    })
  } catch (error: any) {
    console.error('STT error:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    )
  }
}
