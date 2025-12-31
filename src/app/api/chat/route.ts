import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { retrieveContext, buildRAGPrompt } from '@/lib/rag/search';

// Use Node.js runtime for Qdrant compatibility
export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, session_id, language = 'en', use_rag = true } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Retrieve RAG context if enabled
    let prompt = message;
    let sources: any[] = [];

    if (use_rag) {
      try {
        console.log('🔍 Retrieving RAG context for:', message);
        const ragContext = await retrieveContext(message);
        console.log(`📚 Found ${ragContext.results.length} relevant documents`);

        if (ragContext.context) {
          prompt = buildRAGPrompt(message, ragContext.context, language);
          sources = ragContext.results.map((r) => ({
            id: r.id,
            score: r.score,
          }));
          console.log('✅ RAG context applied to prompt');
        } else {
          console.log('⚠️ No RAG context found, using standard prompt');
          prompt = buildRAGPrompt(message, '', language);
        }
      } catch (error) {
        console.error('❌ RAG retrieval error:', error);
        // Continue without RAG if it fails
        prompt = buildRAGPrompt(message, '', language);
      }
    } else {
      prompt = buildRAGPrompt(message, '', language);
    }

    // Create streaming chat completion
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_CHAT_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are Marie, an AI assistant for makenzie.co, a leading healthcare IT services provider specializing in HIPAA-compliant AI systems, clinical documentation automation, EHR integration, and healthcare data engineering.

Be helpful, professional, and knowledgeable about healthcare IT topics. Provide accurate information and be concise in your responses.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Create a custom readable stream for Server-Sent Events
    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        try {
          // Send start event
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'start', session_id, message_id: Date.now() })}\n\n`
            )
          );

          // Stream tokens
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: 'token', content })}\n\n`
                )
              );
            }
          }

          // Send sources if available
          if (sources.length > 0) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'sources', sources })}\n\n`
              )
            );
          }

          // Send end event
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'end' })}\n\n`)
          );

          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'error', error: 'Streaming failed' })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
