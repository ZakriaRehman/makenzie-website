/**
 * Document Ingestion Script for RAG
 *
 * Usage:
 *   npm run ingest-docs -- path/to/documents
 *   npm run ingest-docs -- path/to/document.pdf
 *
 * Supported formats: .txt, .md, .pdf
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';
import { getEmbeddings } from '../src/lib/rag/embeddings';
import { initializeCollection, upsertChunks } from '../src/lib/rag/vectorStore';

// Simple text chunking function
function chunkText(text: string, chunkSize: number = 500, overlap: number = 50): string[] {
  const chunks: string[] = [];
  const words = text.split(/\s+/);

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim()) {
      chunks.push(chunk.trim());
    }
  }

  return chunks;
}

// Extract text from different file types
function extractTextFromFile(filePath: string): string {
  const ext = extname(filePath).toLowerCase();

  switch (ext) {
    case '.txt':
    case '.md':
      return readFileSync(filePath, 'utf-8');

    case '.pdf':
      console.warn(`PDF parsing not yet implemented. Install 'pdf-parse' package and add PDF support.`);
      console.warn(`For now, convert PDFs to text files or use an online converter.`);
      return '';

    default:
      console.warn(`Unsupported file type: ${ext}`);
      return '';
  }
}

// Get all files from a directory recursively
function getAllFiles(dirPath: string, fileExtensions: string[] = ['.txt', '.md', '.pdf']): string[] {
  const files: string[] = [];

  try {
    const items = readdirSync(dirPath);

    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath, fileExtensions));
      } else if (fileExtensions.includes(extname(item).toLowerCase())) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return files;
}

async function ingestDocuments(pathToDocuments: string) {
  console.log('🚀 Starting document ingestion...\n');

  // Check if path is a file or directory
  const stat = statSync(pathToDocuments);
  const files = stat.isDirectory()
    ? getAllFiles(pathToDocuments)
    : [pathToDocuments];

  if (files.length === 0) {
    console.log('❌ No supported files found.');
    return;
  }

  console.log(`📁 Found ${files.length} file(s) to process:\n`);
  files.forEach(file => console.log(`   - ${file}`));
  console.log();

  // Initialize Qdrant collection
  console.log('🔧 Initializing Qdrant collection...');
  await initializeCollection();
  console.log('✅ Collection ready\n');

  let totalChunks = 0;

  for (const filePath of files) {
    console.log(`📄 Processing: ${filePath}`);

    // Extract text from file
    const text = extractTextFromFile(filePath);
    if (!text) {
      console.log(`   ⚠️  Skipped (empty or unsupported)\n`);
      continue;
    }

    // Split into chunks
    const chunks = chunkText(text);
    console.log(`   📝 Split into ${chunks.length} chunks`);

    // Generate embeddings
    console.log(`   🔮 Generating embeddings...`);
    const embeddings = await getEmbeddings(chunks);

    // Prepare points for Qdrant (use UUID for valid point IDs)
    const points = chunks.map((content, index) => ({
      id: randomUUID(),
      vector: embeddings[index],
      payload: {
        content,
        metadata: {
          source: filePath,
          chunk_index: index,
          total_chunks: chunks.length,
          ingested_at: new Date().toISOString(),
        },
      },
    }));

    // Upload to Qdrant
    console.log(`   ⬆️  Uploading to Qdrant...`);
    await upsertChunks(points);

    totalChunks += chunks.length;
    console.log(`   ✅ Done!\n`);
  }

  console.log(`\n🎉 Ingestion complete!`);
  console.log(`   Files processed: ${files.length}`);
  console.log(`   Total chunks uploaded: ${totalChunks}`);
  console.log(`\n💡 Your RAG chatbot can now answer questions about these documents!`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📚 Document Ingestion Script

Usage:
  npm run ingest-docs -- path/to/documents
  npm run ingest-docs -- path/to/document.pdf

Supported formats: .txt, .md, .pdf

Examples:
  npm run ingest-docs -- ./documents
  npm run ingest-docs -- ./documents/company-info.txt
  `);
  process.exit(1);
}

const pathToDocuments = args[0];

ingestDocuments(pathToDocuments)
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error during ingestion:', error);
    process.exit(1);
  });
