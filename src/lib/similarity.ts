// src/lib/similarity.ts

function levenshtein(a: string, b: string): number {
    const m = a.length, n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
        Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = a[i-1] === b[j-1]
                ? dp[i-1][j-1]
                : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
}

export type ProximityResult = "correct" | "close" | "none";

export function getProximity(guess: string, answer: string): ProximityResult {
    const g = guess.trim().toLowerCase();
    const a = answer.trim().toLowerCase();

    if (g === a) return "correct";

    const dist = levenshtein(g, a);
    const maxLen = Math.max(g.length, a.length);
    const similarity = 1 - dist / maxLen;

    // "close" if ≥70% similar, or off by just 1–2 chars on short words
    if (similarity >= 0.7 || (maxLen <= 6 && dist <= 1) || (maxLen > 6 && dist <= 2)) {
        return "close";
    }

    return "none";
}