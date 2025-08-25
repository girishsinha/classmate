// scripts/processCourse.ts
import path from "path";
import fs from "fs";
import { cleanVTT } from "../lib/vttCleaner.js";
import { chunkText } from "../lib/chunker.js";
import { embedAndStore } from "../lib/embedder.js";

async function processCourse(courseId, courseDir) {
    let called = 1;
    console.log(courseDir)
    const files = fs.readdirSync(courseDir).filter(f => f.endsWith(".vtt"));

    for (const file of files) {
        console.log(called++);
        const filePath = path.join(courseDir, file);

        // Step 1: Clean VTT
        const cleaned = cleanVTT(filePath);
        // console.log(cleaned[cleaned.length - 1])
        // Step 2: Chunk
        const docs = await chunkText(cleaned, file);
        // console.log("chunked",  docs)


        // Step 3: Embed + Store
        await embedAndStore(docs);
        console.log("embedded & stored")
    }
}

// Run for one course
processCourse("nodejs_basics", "python/10 Chapter Subtitles")
    .then(() => console.log("🚀 Course processing complete"))
    .catch(console.error);
