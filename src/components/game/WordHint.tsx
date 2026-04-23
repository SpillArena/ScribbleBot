// src/components/game/WordHint.tsx
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

export default function WordHint() {
    const word = useGameStore((s) => s.currentWord);

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
                        <span className="text-lg font-bold text-transparent select-none">
                            {char}
                        </span>
                        <div className="w-6 h-0.5 bg-black/40 dark:bg-white/40 rounded-full" />
                    </motion.div>
                )
            )}
        </div>
    );
}