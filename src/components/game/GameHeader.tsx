// src/components/game/GameHeader.tsx
import { useTranslation } from "react-i18next";
import { useGameStore, difficultyTime } from "../../store/gameStore";
import { getCategory } from "../../lib/wordCategories";
import { Timer } from "lucide-react";

export default function GameHeader() {
    const { t, i18n } = useTranslation();
    const currentRound = useGameStore((s) => s.currentRound);
    const settings = useGameStore((s) => s.settings);
    const score = useGameStore((s) => s.score);
    const timeLeft = useGameStore((s) => s.timeLeft);
    const currentWord = useGameStore((s) => s.currentWord);
    const phase = useGameStore((s) => s.phase);
    const total = difficultyTime[settings.difficulty];

    const isLow = timeLeft <= total * 0.25;
    const isCritical = timeLeft <= 10;

    const category = phase === "playing"
        ? getCategory(currentWord, i18n.language)
        : null;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center">
                {/* Left — round indicator */}
                <p className="flex-1 text-sm font-semibold text-black/50 dark:text-white/50">
                    {t("game.round")} {currentRound}{" "}
                    <span className="text-black/30 dark:text-white/30">
                        {t("game.of")} {settings.rounds}
                    </span>
                </p>

                {/* Center — timer */}
                <div
                    className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${isCritical
                            ? "text-red-500 animate-pulse"
                            : isLow
                                ? "text-orange-400"
                                : "text-violet-400"
                        }`}
                >
                    <Timer size={16} />
                    {timeLeft}s
                </div>

                {/* Right — score */}
                <p className="flex-1 text-sm font-semibold text-black/50 dark:text-white/50 text-right">
                    {score} pts
                </p>
            </div>

            {/* Category hint */}
            {category && (
                <p className="w-full text-xs text-center text-black/30 dark:text-white/30 tracking-wide">
                    {t("game.category")}:{" "}
                    <span className="font-semibold text-violet-400/70">{category}</span>
                </p>
            )}
        </div>
    );
}