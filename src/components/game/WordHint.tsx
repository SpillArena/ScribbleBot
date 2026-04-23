// src/components/game/WordHint.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

export default function WordHint() {
    const word = useGameStore((s) => s.currentWord);
    const revealedIndices = useGameStore((s) => s.revealedIndices);

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">
            {word.split("").map((char, i) =>
                char === " " ? (
                    <div key={i} className="w-4" />
                ) : (
                    <motion.div
                        key={i}
                        className="flex flex-col items-center gap-1"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                    >
                        <AnimatePresence mode="wait">
                            {revealedIndices.includes(i) ? (
                                <motion.span
                                    key="revealed"
                                    className="text-lg font-bold text-black dark:text-white select-none"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {char}
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="hidden"
                                    className="text-lg font-bold text-transparent select-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {char}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <div className="w-6 h-0.5 bg-black/40 dark:bg-white/40 rounded-full" />
                    </motion.div>
                )
            )}
        </div>
    );
}