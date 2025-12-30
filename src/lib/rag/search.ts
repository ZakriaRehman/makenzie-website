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

// Retrieve relevant context for a query
export async function retrieveContext(
  query: string,
  topK: number = 4,
  scoreThreshold: number = 0.7
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

Use the following context from our documentation to answer the user's question. If the context doesn't contain relevant information, provide a helpful response based on your general knowledge about healthcare IT services.

CONTEXT:
${context}

USER QUESTION: ${query}

Please provide a helpful and accurate response:`;
}
