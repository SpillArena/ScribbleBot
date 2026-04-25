// src/lib/quickDraw.ts
export type Stroke = [number[], number[], number[]?];
export type StrokeData = Stroke[];

export async function fetchStrokes(word: string): Promise<StrokeData> {
    const url = `/quickdraw/${encodeURIComponent(word)}.ndjson`;
    const MAX_ATTEMPTS = 5;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const offset = Math.floor(Math.random() * 40_000_000);
        const response = await fetch(url, {
            headers: { Range: `bytes=${offset}-${offset + 51200}` },
        });

        if (!response.ok && response.status !== 206) {
            throw new Error(`No stroke data found for "${word}"`);
        }

        const text = await response.text();
        const lines = text.split("\n").filter((l) => l.trim().length > 0);

        if (lines.length < 2) continue;

        // Try each line in the chunk, prefer recognized drawings
        for (let i = 1; i < lines.length - 1; i++) {
            try {
                const parsed = JSON.parse(lines[i]);
                if (parsed.drawing && parsed.recognized === true) {
                    return parsed.drawing as StrokeData;
                }
            } catch {
                continue;
            }
        }
        // No recognized drawing found in this chunk — retry with new offset
    }

    throw new Error(`Could not find a recognized drawing for "${word}" after ${MAX_ATTEMPTS} attempts`);
}