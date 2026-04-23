// src/lib/quickdraw.ts
type Stroke = [number[], number[], number[]?];
type StrokeData = Stroke[];

const BASE_URL =
    "https://storage.googleapis.com/quickdraw_dataset/full/simplified";

// Fetches NDJSON, picks a random drawing for the word
export async function fetchStrokes(word: string): Promise<StrokeData> {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(word)}.ndjson`);
    if (!response.ok) throw new Error(`No stroke data found for "${word}"`);

    const text = await response.text();
    const lines = text.trim().split("\n");
    const random = lines[Math.floor(Math.random() * lines.length)];
    const parsed = JSON.parse(random);

    return parsed.drawing as StrokeData;
}