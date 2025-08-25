import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";

export async function chunkText(cleaned, file) {
    const chunked = await Promise.all(
        cleaned.map(async (data) => {
            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 500,
                chunkOverlap: 100,
            });

            return await splitter.createDocuments(
                [data.text],
                [{
                    start: data.start,
                    end: data.end,
                    identifier: data.identifier,
                    file_id: file
                }]
            );
        })
    );

    return chunked.flat(); // Flatten nested arrays of documents
}