// src/App.tsx
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "./store/gameStore";
import { useThemeStore } from "./store/themeStore";
import LandingPage from "./components/LandingPage";
import GamePage from "./components/game/GamePage";

export default function App() {
  const view = useGameStore((s) => s.view);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AnimatePresence mode="wait">
      {view === "landing" && <LandingPage key="landing" />}
      {view === "game" && <GamePage key="game" />}
    </AnimatePresence>
  );
}