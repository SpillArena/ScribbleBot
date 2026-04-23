// src/store/gameStore.ts
import { create } from "zustand";

export type Difficulty = "easy" | "medium" | "hard";
export type View = "landing" | "game";

export const difficultyTime: Record<Difficulty, number> = {
    easy: 90,
    medium: 60,
    hard: 30,
};

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
    setView: (view: View) => void;
    updateSettings: (settings: Partial<GameSettings>) => void;
    setUsername: (username: string) => void;
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
    currentRound: 0,
    username: "",
    setView: (view) => set({ view }),
    updateSettings: (newSettings) =>
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        })),
    setUsername: (username) => set({ username }),
    resetGame: () =>
        set({ score: 0, currentRound: 0, settings: defaultSettings, username: "" }),
}));