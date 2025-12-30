/**
 * RAG System Test Script
 * Tests Qdrant connection, document retrieval, and embeddings
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

import { getQdrantClient } from '../src/lib/rag/vectorStore';
import { retrieveContext } from '../src/lib/rag/search';

async function testRAGSystem() {
  console.log('🧪 Testing RAG System...\n');

  // Test 1: Check environment variables
  console.log('1️⃣ Checking environment variables...');
  const requiredVars = ['QDRANT_URL', 'QDRANT_API_KEY', 'OPENAI_API_KEY'];
  const missing = requiredVars.filter(v => !process.env[v]);

  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '));
    process.exit(1);
  }
  console.log('✅ All environment variables present\n');

  // Test 2: Connect to Qdrant
  console.log('2️⃣ Testing Qdrant connection...');
  try {
    const client = getQdrantClient();
    const collections = await client.getCollections();
    console.log('✅ Connected to Qdrant');
    console.log('📚 Collections:', collections.collections.map(c => c.name).join(', '));

    // Check if documents collection exists
    const hasDocuments = collections.collections.some(c => c.name === 'documents');
    if (!hasDocuments) {
      console.error('❌ "documents" collection not found!');
      console.log('💡 Run: npm run ingest-docs -- documents');
      process.exit(1);
    }
    console.log('✅ "documents" collection found\n');
  } catch (error) {
    console.error('❌ Qdrant connection failed:', error);
    process.exit(1);
  }

  // Test 3: Check document count
  console.log('3️⃣ Checking document count...');
  try {
    const client = getQdrantClient();
    const collectionInfo = await client.getCollection('documents');
    console.log('✅ Collection has', collectionInfo.points_count, 'documents\n');

    if (collectionInfo.points_count === 0) {
      console.error('❌ No documents in collection!');
      console.log('💡 Run: npm run ingest-docs -- documents');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Failed to get collection info:', error);
    process.exit(1);
  }

  // Test 4: Test RAG retrieval with sample queries
  console.log('4️⃣ Testing RAG retrieval...\n');

  const testQueries = [
    "What is the company address?",
    "How can I contact Makenzie?",
    "What services do you offer?"
  ];

  for (const query of testQueries) {
    console.log(`\n🔍 Query: "${query}"`);
    try {
      const result = await retrieveContext(query);
      console.log(`📊 Found ${result.results.length} relevant documents`);

      if (result.results.length > 0) {
        console.log('📄 Top result (score:', result.results[0].score.toFixed(3), '):');
        console.log('   ', result.results[0].content.substring(0, 150) + '...');
      } else {
        console.log('⚠️ No documents found for this query');
      }
    } catch (error) {
      console.error('❌ Retrieval failed:', error);
    }
  }

  console.log('\n\n✅ RAG System Test Complete!');
}

testRAGSystem()
  .then(() => {
    console.log('\n💡 If you see documents retrieved above, RAG is working!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
