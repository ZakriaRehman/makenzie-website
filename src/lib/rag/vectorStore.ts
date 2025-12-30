import { QdrantClient } from '@qdrant/js-client-rest';

const COLLECTION_NAME = 'documents';
const VECTOR_SIZE = 1536; // text-embedding-3-small dimensions

// Initialize Qdrant client
export const getQdrantClient = () => {
  return new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
  });
};

// Search for similar documents
export async function searchSimilar(
  queryEmbedding: number[],
  topK: number = 6,
  scoreThreshold: number = 0.5
) {
  const client = getQdrantClient();

  try {
    const searchResult = await client.search(COLLECTION_NAME, {
      vector: queryEmbedding,
      limit: topK,
      score_threshold: scoreThreshold,
      with_payload: true,
    });

    return searchResult.map((point) => ({
      id: point.id,
      score: point.score || 0,
      content: point.payload?.content as string || '',
      metadata: point.payload?.metadata || {},
    }));
  } catch (error) {
    console.error('Error searching Qdrant:', error);
    return [];
  }
}

// Initialize collection (call once during setup)
export async function initializeCollection() {
  const client = getQdrantClient();

  try {
    // Check if collection exists
    const collections = await client.getCollections();
    const exists = collections.collections.some(
      (col) => col.name === COLLECTION_NAME
    );

    if (!exists) {
      // Create collection
      await client.createCollection(COLLECTION_NAME, {
        vectors: {
          size: VECTOR_SIZE,
          distance: 'Cosine',
        },
      });
      console.log(`Created collection: ${COLLECTION_NAME}`);
    }

    return true;
  } catch (error) {
    console.error('Error initializing Qdrant collection:', error);
    return false;
  }
}

// Upsert document chunks (for adding documents)
export async function upsertChunks(
  chunks: Array<{
    id: string;
    vector: number[];
    payload: {
      content: string;
      metadata?: Record<string, any>;
    };
  }>
) {
  const client = getQdrantClient();

  try {
    const points = chunks.map((chunk) => ({
      id: chunk.id,
      vector: chunk.vector,
      payload: chunk.payload,
    }));

    await client.upsert(COLLECTION_NAME, {
      wait: true,
      points,
    });

    return true;
  } catch (error) {
    console.error('Error upserting chunks to Qdrant:', error);
    return false;
  }
}
