// // lib/vttCleaner.ts
import fs from "fs";
import webvtt from "node-webvtt";

export function cleanVTT(filePath) {
    // const raw = fs.readFileSync(filePath, "utf-8");

    const vttData = fs.readFileSync(filePath, 'utf8');
    const parsed = webvtt.parse(vttData);


    return mergeByPunctuation(parsed.cues);
}


function mergeByPunctuation(cues) {
    const merged = [];
    let buffer = null;

    for (const cue of cues) {
        if (!buffer) {
            buffer = { ...cue };
            continue;
        }

        buffer.text += ' ' + cue.text;
        buffer.end = cue.end;

        if (/[.?!]$/.test(cue.text.trim())) {
            merged.push({ ...buffer });
            buffer = null;
        }
    }

    if (buffer) merged.push(buffer); // flush last chunk
    return merged;
}

