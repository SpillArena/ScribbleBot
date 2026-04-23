// src/components/game/GamePage.tsx
import { motion } from "framer-motion";
import Layout from "../_layout";
import WordHint from "./WordHint";
import DrawingCanvas from "./DrawingCanvas";
import GuessList from "./GuessList";
import GuessInput from "./GuessInput";
import GameHeader from "./GameHeader";
import { useEffect } from "react";

export default function GamePage() {
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    return (
        <Layout>
            <motion.div
                className="mx-auto max-w-5xl px-6 py-6 flex flex-col gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Round / Timer / Score */}
                <GameHeader />

                {/* Word hint */}
                <motion.div
                    className="flex items-center justify-center py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <WordHint />
                </motion.div>

                {/* Main game area */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
                >
                    {/* Canvas */}
                    <DrawingCanvas />

                    {/* Right panel: guess log + input */}
                    <div className="flex flex-col gap-3 min-h-[500px]">
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