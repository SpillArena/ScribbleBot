// src/lib/quickDraw.ts
export type Stroke = [number[], number[], number[]?];
export type StrokeData = Stroke[];

function isGoodDrawing(parsed: { recognized: boolean; drawing: StrokeData }): boolean {
    if (!parsed.recognized) return false;
    const strokeCount = parsed.drawing.length;
    if (strokeCount < 3 || strokeCount > 25) return false;
    const totalPoints = parsed.drawing.reduce((sum, [xs]) => sum + xs.length, 0);
    if (totalPoints < 20 || totalPoints > 600) return false;
    return true;
}

async function fetchChunk(url: string, offset: number, size = 65536): Promise<string> {
    const response = await fetch(url, {
        headers: { Range: `bytes=${offset}-${offset + size - 1}` },
    });
    if (!response.ok && response.status !== 206) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.text();
}

function parseChunk(text: string): StrokeData | null {
    const lines = text.split("\n").filter((l) => l.trim().length > 0);
    // Skip first and last lines — likely incomplete due to byte range cut
    const candidates = lines.slice(1, lines.length - 1).sort(() => Math.random() - 0.5);
    for (const line of candidates) {
        try {
            const parsed = JSON.parse(line);
            if (parsed.drawing && isGoodDrawing(parsed)) return parsed.drawing as StrokeData;
        } catch { continue; }
    }
    return null;
}

export async function fetchStrokes(word: string): Promise<StrokeData> {
    const url = `/quickdraw/${encodeURIComponent(word)}.ndjson`;
    const FILE_SIZE = 50_000_000; // ~50MB, safe upper bound
    const CHUNK = 65536;
    const MAX_ATTEMPTS = 8;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        // First 2 attempts always use the start of the file (guaranteed complete lines)
        const offset = attempt < 2
            ? attempt * CHUNK
            : Math.floor(Math.random() * (FILE_SIZE - CHUNK));

        try {
            const text = await fetchChunk(url, offset, CHUNK);
            const result = parseChunk(text);
            if (result) return result;
        } catch { continue; }
    }

    throw new Error(`Could not find a recognized drawing for "${word}" after ${MAX_ATTEMPTS} attempts`);
}