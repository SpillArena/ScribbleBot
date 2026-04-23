// src/components/game/GamePage.tsx
import { motion } from "framer-motion";
import { useEffect } from "react";
import Layout from "../_layout";
import WordHint from "./WordHint";
import DrawingCanvas from "./DrawingCanvas";
import GuessList from "./GuessList";
import GuessInput from "./GuessInput";
import GameHeader from "./GameHeader";
import CountdownOverlay from "./CountdownOverlay";
import RoundEndOverlay from "./RoundEndOverlay";
import { useRoundTimer } from "../../hooks/useRoundTimer";
import { useGameStore } from "../../store/gameStore";

export default function GamePage() {
    const setPhase = useGameStore((s) => s.setPhase);
    useRoundTimer();

    useEffect(() => {
        setPhase("countdown");
    }, [setPhase]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    return (
        <Layout>
            <motion.div
                className="mx-auto max-w-5xl w-full px-6 py-6 flex flex-col gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <GameHeader />

                <motion.div
                    className="flex items-center justify-center py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <WordHint />
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 w-full min-w-0"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
                >
                    <div className="relative min-w-0">
                        <CountdownOverlay />
                        <RoundEndOverlay />
                        <DrawingCanvas />
                    </div>

                    <div className="flex flex-col gap-3 min-h-[500px] min-w-0">
                        <div className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 overflow-hidden flex flex-col">
                            <GuessList />
                        </div>
                        <GuessInput />
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    );
}