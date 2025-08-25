// import 'dotenv/config';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
// import { QdrantVectorStore } from '@langchain/qdrant';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function queryControler(chats, userQuery) {


    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const pineconeIndex = pinecone.Index("girishindex");

    // Ready the client OpenAI Embedding Model
    const embeddings = new OpenAIEmbeddings({
        model: 'text-embedding-3-small',
        apiKey: process.env.OPENAI_API_KEY
    });
    // console.log(embeddings)
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
        // maxConcurrency: 5,
        // You can pass a namespace here too
        namespace: "courses",
    });

    const vectorSearcher = vectorStore.asRetriever({
        k: 10,
    });
    // console.log(vectorSearcher)
    const relevantChunk = await vectorSearcher.invoke(userQuery);
    // console.log(relevantChunk)
    const SYSTEM_PROMPT = `
    You are an AI assistant who helps resolving students query based on the
    context available to you from a video transcript file with the content.

    Only ans based on the available context from file only.

    the response should be a json object with the following structure:
{"content":"your answer goes here", "reference": "the reference goes here and timestamp is in hh:mm:ss --> hh:mm:ss format if no refrence found leve it empty string"}
    for example:-
    {"content":"Node.js is a C program that includes the V8 engine, which provides an environment to run JavaScript outside the browser. Essentially, Node.js allows you to execute JavaScript code on the server side, rather than in the client's browser. This means you can build scalable network applications using JavaScript on the back end.","Reference":"file 01-node-introduction.vtt, timestaps 00:07:44 --> 00:07:59"}

    be littile funny when user asked out off context question.
    if you don't know the answer, just say "you are cheating dont ask out of syllabus questions"

    Context:
    ${JSON.stringify(relevantChunk)}
  `;
    const prompt = [{ role: 'system', content: SYSTEM_PROMPT },]
    prompt.push(...chats)

    const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: prompt
        // [
        //     { role: 'system', content: SYSTEM_PROMPT },
        //     { role: 'user', content: userQuery },
        // ],
    });
    // return response.choices[0].message.content;
    const rowData = response.choices[0].message.content;
    return JSON.parse(rowData);
    // console.log(`> ${response.choices[0].message.content}`);
}

// chat();