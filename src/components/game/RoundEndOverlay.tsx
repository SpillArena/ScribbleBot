import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { useTranslation } from "react-i18next";
import { CheckCircle, XCircle } from "lucide-react";

export default function RoundEndOverlay() {
    const phase = useGameStore((s) => s.phase);
    const word = useGameStore((s) => s.currentWord);
    const wordGuessed = useGameStore((s) => s.wordGuessed);
    const forfeit = useGameStore((s) => s.forfeit);
    const currentRound = useGameStore((s) => s.currentRound);
    const settings = useGameStore((s) => s.settings);
    const nextRound = useGameStore((s) => s.nextRound);
    const resetGame = useGameStore((s) => s.resetGame);
    const setView = useGameStore((s) => s.setView);
    const { t } = useTranslation();

    const isLastRound = currentRound >= settings.rounds;

    const handleContinue = () => {
        if (isLastRound) {
            resetGame();
            setView("landing");
            return;
        }
        nextRound();
    };

    const handleGiveUp = () => {
        resetGame();
        setView("landing");
    };

    return (
        <AnimatePresence>
            {phase === "roundEnd" && (
                <motion.div
                    className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                >
                    <div className="flex flex-col gap-4 px-6 py-5 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-2xl backdrop-blur-md">
                        {/* Status row */}
                        <div className="flex items-center gap-3">
                            {wordGuessed ? (
                                <CheckCircle size={22} className="text-green-400 shrink-0" />
                            ) : (
                                <XCircle size={22} className="text-red-400 shrink-0" />
                            )}
                            <p className="text-sm font-semibold text-white/70 uppercase tracking-widest">
                                {wordGuessed ? t("game.correct") : t("game.gaveUp")}
                            </p>
                        </div>

                        {/* Word reveal — hidden when forfeiting */}
                        {!forfeit && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {word.split("").map((char, i) =>
                                    char === " " ? (
                                        <div key={i} className="w-3" />
                                    ) : (
                                        <motion.div
                                            key={i}
                                            className="flex flex-col items-center gap-1"
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                        >
                                            <span className="text-lg font-black text-white select-none">
                                                {char}
                                            </span>
                                            <div className="w-5 h-0.5 bg-white/30 rounded-full" />
                                        </motion.div>
                                    )
                                )}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleGiveUp}
                                className="flex-1 py-2 rounded-xl text-sm font-semibold text-white-200 bg-red-900 border border-red-400 hover:bg-red-500 transition-colors cursor-pointer"
                            >
                                {t("game.quit")}
                            </button>
                            <button
                                onClick={handleContinue}
                                className="flex-1 py-2 rounded-xl text-sm font-semibold text-white bg-violet-500 hover:bg-violet-400 transition-colors cursor-pointer"
                            >
                                {isLastRound ? t("game.finish") : t("game.continue")}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}