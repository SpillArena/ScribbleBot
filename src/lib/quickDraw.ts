// src/lib/quickDraw.ts
export type Stroke = [number[], number[], number[]?];
export type StrokeData = Stroke[];

export async function fetchStrokes(word: string): Promise<StrokeData> {
    // Requests go to localhost → Vite proxies to GCS server-side (no CORS)
    const url = `/quickdraw/${encodeURIComponent(word)}.ndjson`;

    // Fetch a small byte range to avoid downloading the full file (50–200MB)
    const offset = Math.floor(Math.random() * 40_000_000);
    const response = await fetch(url, {
        headers: { Range: `bytes=${offset}-${offset + 51200}` },
    });

    // 206 = Partial Content (success for range requests)
    if (!response.ok && response.status !== 206) {
        throw new Error(`No stroke data found for "${word}"`);
    }

    const text = await response.text();
    const lines = text.split("\n").filter((l) => l.trim().length > 0);

    if (lines.length < 2) {
        throw new Error(`Not enough data in range for "${word}", retrying...`);
    }

    // First and last lines may be truncated — use one from the middle
    for (let i = 1; i < lines.length - 1; i++) {
        try {
            const parsed = JSON.parse(lines[i]);
            if (parsed.drawing) return parsed.drawing as StrokeData;
        } catch {
            continue;
        }
    }

    throw new Error(`Could not parse drawing for "${word}"`);
}