import OpenAI from 'openai';

// Initialize OpenAI client
const getOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });
};

// Generate embedding for a single text
export async function getEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();

  try {
    const response = await openai.embeddings.create({
      model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Generate embeddings for multiple texts
export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const openai = getOpenAIClient();

  try {
    const response = await openai.embeddings.create({
      model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
      input: texts,
    });

    return response.data.map((item) => item.embedding);
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw error;
  }
}
