// src/store/gameStore.ts
import { create } from "zustand";

export type Difficulty = "easy" | "medium" | "hard";
export type View = "landing" | "game";

interface GameSettings {
    rounds: number;
    timePerRound: number;
    difficulty: Difficulty;
}

interface GameState {
    view: View;
    settings: GameSettings;
    score: number;
    currentRound: number;
    setView: (view: View) => void;
    updateSettings: (settings: Partial<GameSettings>) => void;
    resetGame: () => void;
}

const defaultSettings: GameSettings = {
    rounds: 5,
    timePerRound: 60,
    difficulty: "medium",
};

export const useGameStore = create<GameState>((set) => ({
    view: "landing",
    settings: defaultSettings,
    score: 0,
    currentRound: 0,
    setView: (view) => set({ view }),
    updateSettings: (newSettings) =>
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        })),
    resetGame: () =>
        set({ score: 0, currentRound: 0, settings: defaultSettings }),
}));