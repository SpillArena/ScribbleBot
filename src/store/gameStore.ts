// src/store/gameStore.ts
import { create } from "zustand";

export type Difficulty = "easy" | "medium" | "hard";
export type View = "landing" | "game";

export const difficultyTime: Record<Difficulty, number> = {
    easy: 90,
    medium: 60,
    hard: 30,
};

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
    settings: GameSettings;
    score: number;
    currentRound: number;
    username: string;
    currentWord: string;
    guesses: GuessEntry[];
    setView: (view: View) => void;
    updateSettings: (settings: Partial<GameSettings>) => void;
    setUsername: (username: string) => void;
    setCurrentWord: (word: string) => void;
    addGuess: (guess: GuessEntry) => void;
    resetGame: () => void;
}

const defaultSettings: GameSettings = {
    rounds: 5,
    difficulty: "medium",
};

export const useGameStore = create<GameState>((set) => ({
    view: "landing",
    settings: defaultSettings,
    score: 0,
    currentRound: 1,
    username: "",
    currentWord: "elephant",
    guesses: [],
    setView: (view) => set({ view }),
    updateSettings: (newSettings) =>
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        })),
    setUsername: (username) => set({ username }),
    setCurrentWord: (word) => set({ currentWord: word }),
    addGuess: (guess) =>
        set((state) => ({ guesses: [...state.guesses, guess] })),
    resetGame: () =>
        set({
            score: 0,
            currentRound: 1,
            guesses: [],
            currentWord: "",
            settings: defaultSettings,
            username: "",
        }),
}));