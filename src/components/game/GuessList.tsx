// src/components/game/GuessList.tsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGameStore } from "../../store/gameStore";
import { CircleCheck, CircleX } from "lucide-react";

export default function GuessList() {
    const guesses = useGameStore((s) => s.guesses);
    const username = useGameStore((s) => s.username);
    const { t } = useTranslation();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [guesses]);

    return (
        <div className="flex flex-col h-full">
            <p className="text-xs font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider mb-2">
                {t("game.guessLog")}
            </p>
            <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1">
                <AnimatePresence initial={false}>
                    {guesses.length === 0 && (
                        <p className="text-xs text-black/30 dark:text-white/30 text-center mt-4">
                            ...
                        </p>
                    )}
                    {guesses.map((g, i) => (
                        <motion.div
                            key={i}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${g.correct
                                    ? "bg-green-500/10 border border-green-500/20"
                                    : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                                }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            {g.correct ? (
                                <CircleCheck size={14} className="text-green-400 shrink-0" />
                            ) : (
                                <CircleX size={14} className="text-black/20 dark:text-white/20 shrink-0" />
                            )}
                            <span className="font-semibold text-black/50 dark:text-white/50 shrink-0">
                                {username}:
                            </span>
                            <span
                                className={
                                    g.correct
                                        ? "text-green-400 font-bold"
                                        : "text-black/70 dark:text-white/70"
                                }
                            >
                                {g.text}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}