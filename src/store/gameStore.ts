// src/store/gameStore.ts
import { create } from "zustand";
import { saveScore } from "../lib/leaderbord";

export type Difficulty = "easy" | "medium" | "hard";
export type View = "landing" | "game";
export type GamePhase = "countdown" | "playing" | "roundEnd";

export const difficultyTime: Record<Difficulty, number> = {
    easy: 90,
    medium: 60,
    hard: 30,
};

const FALLBACK_WORDS: string[] = [
    "apple", "banana", "cat", "dog", "house", "car", "tree", "fish",
    "bird", "clock", "pizza", "guitar", "elephant", "bicycle", "mountain",
    "rainbow", "umbrella", "volcano", "keyboard", "airplane",
];

let wordPool: string[] = [...FALLBACK_WORDS];

export async function initWordBank(): Promise<void> {
    try {
        const res = await fetch(
            "https://raw.githubusercontent.com/googlecreativelab/quickdraw-dataset/master/categories.txt"
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const text = await res.text();
        const words = text.trim().split("\n").filter(Boolean);
        if (words.length > 0) wordPool = words;
    } catch {
        console.warn("Could not fetch Quick Draw categories, using fallback word list.");
    }
}

export function getWordPool(): string[] {
    return wordPool;
}

function pickRandomWord(previousWord?: string): string {
    if (wordPool.length === 0) return "";
    if (wordPool.length === 1) return wordPool[0];

    let next = wordPool[Math.floor(Math.random() * wordPool.length)];
    while (next === previousWord) {
        next = wordPool[Math.floor(Math.random() * wordPool.length)];
    }
    return next;
}

export interface GuessEntry {
    text: string;
    correct: boolean;
    timestamp: number;
    proximity: "correct" | "close" | "none";
}

interface GameSettings {
    rounds: number;
    difficulty: Difficulty;
}

interface GameState {
    view: View;
    phase: GamePhase;
    settings: GameSettings;
    score: number;
    currentRound: number;
    username: string;
    currentWord: string;
    guesses: GuessEntry[];
    timeLeft: number;
    revealedIndices: number[];
    wordGuessed: boolean;
    forfeit: boolean;
    setView: (view: View) => void;
    setPhase: (phase: GamePhase) => void;
    updateSettings: (settings: Partial<GameSettings>) => void;
    setUsername: (username: string) => void;
    setCurrentWord: (word: string) => void;
    addGuess: (guess: GuessEntry) => void;
    setTimeLeft: (time: number) => void;
    setRevealedIndices: (indices: number[]) => void;
    setWordGuessed: (guessed: boolean) => void;
    setForfeit: (forfeit: boolean) => void;
    startGame: () => void;
    nextRound: () => void;
    resetGame: () => void;
    forfeitRound: () => void;
}

const defaultSettings: GameSettings = {
    rounds: 5,
    difficulty: "medium",
};

export const useGameStore = create<GameState>((set) => ({
    view: "landing",
    phase: "countdown",
    settings: defaultSettings,
    score: 0,
    currentRound: 1,
    username: "",
    currentWord: pickRandomWord(),
    guesses: [],
    timeLeft: 0,
    revealedIndices: [],
    wordGuessed: false,
    forfeit: false,
    setView: (view) => set({ view }),
    setPhase: (phase) => set({ phase }),
    updateSettings: (newSettings) =>
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        })),
    setUsername: (username) => set({ username }),
    setCurrentWord: (word) => set({ currentWord: word }),
    addGuess: (guess) =>
        set((state) => ({ guesses: [...state.guesses, guess] })),
    setTimeLeft: (timeLeft) => set({ timeLeft }),
    setRevealedIndices: (revealedIndices) => set({ revealedIndices }),
    setWordGuessed: (wordGuessed) => set({ wordGuessed }),
    setForfeit: (forfeit) => set({ forfeit }),
    startGame: () =>
        set(() => ({
            view: "game",
            phase: "countdown",
            score: 0,
            currentRound: 1,
            currentWord: pickRandomWord(),
            guesses: [],
            timeLeft: 0,
            revealedIndices: [],
            wordGuessed: false,
            forfeit: false,
        })),
    nextRound: () =>
        set((state) => ({
            phase: "countdown",
            currentRound: state.currentRound + 1,
            currentWord: pickRandomWord(state.currentWord),
            guesses: [],
            timeLeft: 0,
            revealedIndices: [],
            wordGuessed: false,
            forfeit: false,
        })),
    resetGame: () =>
        set((state) => {
            saveScore({
                username: state.username || "Anonym",
                score: state.score,
                difficulty: state.settings.difficulty,
                rounds: state.settings.rounds,
                date: new Date().toISOString(),
            });
            return {
                score: 0,
                currentRound: 1,
                guesses: [],
                currentWord: "",
                phase: "countdown",
                timeLeft: 0,
                revealedIndices: [],
                wordGuessed: false,
                forfeit: false,
                settings: defaultSettings,
                username: "",
                view: "landing",
            };
        }),
    forfeitRound: () =>
    set(() => ({
        phase: "roundEnd",
        forfeit: true,
        timeLeft: 0,
        wordGuessed: false,
    })),
}));