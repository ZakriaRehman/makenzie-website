import { getEmbedding } from './embeddings';
import { searchSimilar } from './vectorStore';

export interface SearchResult {
  id: string | number;
  score: number;
  content: string;
  metadata: Record<string, any>;
}

export interface RAGContext {
  query: string;
  results: SearchResult[];
  context: string;
}

// Retrieve relevant context for a query (no threshold - get all results)
export async function retrieveContext(
  query: string,
  topK: number = 10,
  scoreThreshold: number = 0
): Promise<RAGContext> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await getEmbedding(query);

    // Search for similar documents
    const results = await searchSimilar(queryEmbedding, topK, scoreThreshold);

    // Build context from results
    const context = results
      .map((result, index) => {
        return `[Document ${index + 1}]\n${result.content}`;
      })
      .join('\n\n');

    return {
      query,
      results,
      context,
    };
  } catch (error) {
    console.error('Error retrieving RAG context:', error);
    return {
      query,
      results: [],
      context: '',
    };
  }
}

// Build RAG prompt with context
export function buildRAGPrompt(query: string, context: string): string {
  if (!context || context.trim().length === 0) {
    // No context available, use standard prompt
    return query;
  }

  return `You are Marie, an AI assistant for makenzie.co, a leading healthcare IT services provider.

IMPORTANT: Use the following context from our company documentation to answer the user's question accurately. This context contains verified information about our company, services, contact details, and offerings. Always prioritize information from the context below.

CONTEXT FROM DOCUMENTATION:
${context}

USER QUESTION: ${query}

Based on the context above, provide a helpful, accurate, and professional response. If the answer is in the context, use it directly. If the context doesn't fully answer the question, acknowledge what information is available and provide helpful guidance.`;
}
