// src/store/gameStore.ts
import { create } from "zustand";

export type Difficulty = "easy" | "medium" | "hard";
export type View = "landing" | "game";
export type GamePhase = "countdown" | "playing" | "roundEnd";

export const difficultyTime: Record<Difficulty, number> = {
    easy: 90,
    medium: 60,
    hard: 30,
};

export const wordBank: Record<Difficulty, string[]> = {
    easy: [
        "apple",
        "house",
        "dog",
        "cat",
        "tree",
        "car",
        "pizza",
        "banana",
        "ball",
        "sun",
        "book",
        "clock",
    ],
    medium: [
        "elephant",
        "backpack",
        "mountain",
        "keyboard",
        "airplane",
        "umbrella",
        "chocolate",
        "robot",
        "volcano",
        "dinosaur",
        "bicycle",
        "treasure map",
    ],
    hard: [
        "photosynthesis",
        "constellation",
        "metamorphosis",
        "architecture",
        "bioluminescence",
        "kaleidoscope",
        "cartographer",
        "symphony orchestra",
        "jurisdiction",
        "cryptography",
        "microprocessor",
        "intercontinental",
    ],
};

function pickRandomWord(difficulty: Difficulty, previousWord?: string): string {
    const pool = wordBank[difficulty];
    if (pool.length === 0) return "";

    if (pool.length === 1) return pool[0];

    let next = pool[Math.floor(Math.random() * pool.length)];
    while (next === previousWord) {
        next = pool[Math.floor(Math.random() * pool.length)];
    }
    return next;
}

export interface GuessEntry {
    text: string;
    correct: boolean;
    timestamp: number;
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
    setView: (view: View) => void;
    setPhase: (phase: GamePhase) => void;
    updateSettings: (settings: Partial<GameSettings>) => void;
    setUsername: (username: string) => void;
    setCurrentWord: (word: string) => void;
    addGuess: (guess: GuessEntry) => void;
    setTimeLeft: (time: number) => void;
    setRevealedIndices: (indices: number[]) => void;
    setWordGuessed: (guessed: boolean) => void;
    startGame: () => void;
    nextRound: () => void;
    resetGame: () => void;
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
    currentWord: pickRandomWord(defaultSettings.difficulty),
    guesses: [],
    timeLeft: 0,
    revealedIndices: [],
    wordGuessed: false,
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
    startGame: () =>
        set((state) => ({
            view: "game",
            phase: "countdown",
            score: 0,
            currentRound: 1,
            currentWord: pickRandomWord(state.settings.difficulty),
            guesses: [],
            timeLeft: 0,
            revealedIndices: [],
            wordGuessed: false,
        })),
    nextRound: () =>
        set((state) => ({
            phase: "countdown",
            currentRound: state.currentRound + 1,
            currentWord: pickRandomWord(state.settings.difficulty, state.currentWord),
            guesses: [],
            timeLeft: 0,
            revealedIndices: [],
            wordGuessed: false,
        })),
    resetGame: () =>
        set({
            score: 0,
            currentRound: 1,
            guesses: [],
            currentWord: "",
            phase: "roundEnd", 
            timeLeft: 0,
            revealedIndices: [],
            wordGuessed: false,
            settings: defaultSettings,
            username: "",
            view: "landing",
        }),
}));