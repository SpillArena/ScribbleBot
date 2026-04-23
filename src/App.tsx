// src/App.tsx
import { useGameStore } from "./store/gameStore";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./components/LandingPage";

export default function App() {
  const view = useGameStore((s) => s.view);

  return (
    <AnimatePresence mode="wait">
      {view === "landing" && <LandingPage key="landing" />}
      {view === "game" && (
        <div key="game" className="text-white">
          Game page coming soon
        </div>
      )}
    </AnimatePresence>
  );
}