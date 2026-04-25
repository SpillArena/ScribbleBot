// src/lib/leaderboard.ts

export interface LeaderboardEntry {
    username: string;
    score: number;
    difficulty: string;
    rounds: number;
    date: string; // ISO string
}

const KEY = "scribblebot_leaderboard";
const MAX_ENTRIES = 20;

export function getLeaderboard(): LeaderboardEntry[] {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveScore(entry: LeaderboardEntry): void {
    const current = getLeaderboard();
    const updated = [...current, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_ENTRIES);
    localStorage.setItem(KEY, JSON.stringify(updated));
}

export function clearLeaderboard(): void {
    localStorage.removeItem(KEY);
}