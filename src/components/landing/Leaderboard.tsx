// src/components/ui/Leaderboard.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getLeaderboard, clearLeaderboard, type LeaderboardEntry } from "../../lib/leaderbord";

const difficultyColor: Record<string, string> = {
    easy: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    hard: "text-red-600 dark:text-red-400",
};

function formatDate(iso: string, locale: string): string {
    return new Date(iso).toLocaleDateString(locale === "no" ? "nb-NO" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function Leaderboard() {
    const { t, i18n } = useTranslation();
    const [entries, setEntries] = useState<LeaderboardEntry[]>(getLeaderboard);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleClear = () => {
        clearLeaderboard();
        setEntries([]);
        setShowConfirm(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">🏆 {t("leaderboard.title")}</h2>
                {entries.length > 0 && (
                    <div>
                        {showConfirm ? (
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">{t("leaderboard.confirmQuestion")}</span>
                                <button
                                    onClick={handleClear}
                                    className="text-red-500 font-medium hover:underline"
                                >
                                    {t("leaderboard.confirmYes")}
                                </button>
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="text-gray-500 hover:underline"
                                >
                                    {t("leaderboard.confirmCancel")}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                            >
                                {t("leaderboard.reset")}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {entries.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <p className="text-4xl mb-3">📋</p>
                    <p className="text-sm">{t("leaderboard.empty")}</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {entries.map((entry, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm"
                        >
                            {/* Rank */}
                            <span className="w-7 text-center font-bold text-lg">
                                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                            </span>

                            {/* Name */}
                            <span className="flex-1 font-medium truncate">{entry.username}</span>

                            {/* Difficulty */}
                            <span className={`text-xs font-semibold uppercase tracking-wide ${difficultyColor[entry.difficulty]}`}>
                                {t(`leaderboard.difficulty.${entry.difficulty}`, entry.difficulty)}
                            </span>

                            {/* Rounds */}
                            <span className="text-xs text-gray-400">
                                {entry.rounds} {t("leaderboard.rounds")}
                            </span>

                            {/* Score */}
                            <span className="font-bold text-lg tabular-nums w-14 text-right">
                                {entry.score}
                                <span className="text-xs font-normal text-gray-400 ml-1">pts</span>
                            </span>

                            {/* Date */}
                            <span className="text-xs text-gray-400 hidden sm:block w-24 text-right">
                                {formatDate(entry.date, i18n.language)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}