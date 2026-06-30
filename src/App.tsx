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
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const isDark =
        theme === "dark" || (theme === "system" && mq.matches);
      root.classList.toggle("dark", isDark);
    };

    apply();

    if (theme === "system") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [theme]);

  return (
    <AnimatePresence mode="wait">
      {view === "landing" && <LandingPage key="landing" />}
      {view === "game" && <GamePage key="game" />}
    </AnimatePresence>
  );
}