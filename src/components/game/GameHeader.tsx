// src/components/game/GameHeader.tsx
import { useTranslation } from "react-i18next";
import { useGameStore, difficultyTime } from "../../store/gameStore";
import { Timer } from "lucide-react";

export default function GameHeader() {
    const { t } = useTranslation();
    const currentRound = useGameStore((s) => s.currentRound);
    const settings = useGameStore((s) => s.settings);
    const score = useGameStore((s) => s.score);
    const timeLeft = difficultyTime[settings.difficulty]; // placeholder until timer logic

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-black/50 dark:text-white/50">
                {t("game.round")} {currentRound}{" "}
                <span className="text-black/30 dark:text-white/30">
                    {t("game.of")} {settings.rounds}
                </span>
            </p>

            <div className="flex items-center gap-1.5 text-sm font-bold text-violet-400">
                <Timer size={16} />
                {timeLeft}s
            </div>

            <p className="text-sm font-semibold text-black/50 dark:text-white/50">
                {score} pts
            </p>
        </div>
    );
}