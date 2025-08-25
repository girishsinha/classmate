// lib/embedder.ts
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";

export async function embedAndStore(docs) {
    // console.log(process.env.PINECONE_API_KEY)
    // Initialize Pinecone client
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pinecone.Index("girishindex");

    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: process.env.OPENAI_API_KEY
    });

    // Store in Pinecone
    await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex: index,
        namespace: "courses",
    });

    console.log(`✅ Stored ${docs.length} chunks in Pinecone`);
}
