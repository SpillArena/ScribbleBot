
// src/components/landing/Settings.tsx
import { motion } from "framer-motion";
import { Paintbrush, Clock3, Clock6, Clock9 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
    useGameStore,
    type Difficulty,
    difficultyTime,
} from "../../store/gameStore";



const roundOptions = [3, 5, 10];

const difficultyOptions: {
    value: Difficulty;
    descKey: string;
    icon: LucideIcon;
}[] = [
        { value: "easy", descKey: "easyDesc", icon: Clock9 },
        { value: "medium", descKey: "mediumDesc", icon: Clock6 },
        { value: "hard", descKey: "hardDesc", icon: Clock3 },
    ];


export default function Settings() {
    const settings = useGameStore((s) => s.settings);
    const updateSettings = useGameStore((s) => s.updateSettings);
    const startGame = useGameStore((s) => s.startGame);
    const { t } = useTranslation();
    const username = useGameStore((s) => s.username);
    const canPlay = /^[a-zA-Z0-9_æøåÆØÅ]{2,16}$/.test(username);

    const timeForDifficulty = difficultyTime[settings.difficulty];

    return (
        <motion.section
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold">{t("settings.title")}</h2>
                <p className="text-sm text-black/50 dark:text-white/40 mt-1">
                    {t("settings.subtitle")}
                </p>
            </div>

            <div className="flex flex-col gap-5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
                {/* Rounds */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-black/50 dark:text-white/50 uppercase tracking-wider">
                        {t("settings.rounds")}
                    </label>
                    <div className="flex gap-2">
                        {roundOptions.map((r) => (
                            <button
                                key={r}
                                onClick={() => updateSettings({ rounds: r })}
                                className={`px-5 py-2 rounded-xl font-bold transition-colors cursor-pointer ${settings.rounds === r
                                    ? "bg-violet-500 text-white"
                                    : "bg-black/10 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/20 dark:hover:bg-white/20"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-black/50 dark:text-white/50 uppercase tracking-wider">
                        {t("settings.difficulty")}
                    </label>
                    <div className="flex flex-col gap-2">
                        {difficultyOptions.map(({ value, descKey, icon: Icon }) => (
                            <button
                                key={value}
                                onClick={() => updateSettings({ difficulty: value })}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-colors cursor-pointer text-left ${settings.difficulty === value
                                    ? "bg-violet-500 text-white"
                                    : "bg-black/10 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/20 dark:hover:bg-white/20"
                                    }`}
                            >
                                <span className="capitalize">{t(`settings.${value}`)}</span>
                                <span
                                    className={`flex items-center gap-1 text-xs font-normal ${settings.difficulty === value
                                        ? "text-white/70"
                                        : "text-black/40 dark:text-white/40"
                                        }`}
                                >
                                    <Icon size={12} />
                                    {t(`settings.${descKey}`)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary + Play */}
                <div className="flex items-center justify-between pt-2 border-t border-black/10 dark:border-white/10">
                    <p className="text-sm text-black/40 dark:text-white/40">
                        {settings.rounds} {t("settings.rounds").toLowerCase()} ·{" "}
                        {timeForDifficulty}s
                    </p>
                    <motion.button
                        onClick={() => canPlay && startGame()}
                        disabled={!canPlay}
                        className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl shadow-lg transition-colors ${canPlay
                            ? "bg-violet-500 hover:bg-violet-400 shadow-violet-500/30 text-white cursor-pointer"
                            : "bg-black/10 dark:bg-white/10 shadow-none text-black/30 dark:text-white/30 cursor-not-allowed"
                            }`}
                        whileHover={canPlay ? { scale: 1.04 } : {}}
                        whileTap={canPlay ? { scale: 0.97 } : {}}
                    >
                        <Paintbrush size={18} />
                        {t("settings.play")}
                    </motion.button>
                </div>
            </div>
        </motion.section>
    );
}