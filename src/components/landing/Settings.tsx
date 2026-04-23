// src/components/landing/Settings.tsx
import { motion } from "framer-motion";
import { useGameStore, type Difficulty } from "../../store/gameStore";
import { useTranslation } from "react-i18next";

const roundOptions = [3, 5, 10];
const timeOptions = [30, 60, 90];
const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];

export default function Settings() {
    const settings = useGameStore((s) => s.settings);
    const updateSettings = useGameStore((s) => s.updateSettings);
    const { t } = useTranslation();

    return (
        <motion.section
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <h2 className="text-3xl font-bold text-center">{t("settings.title")}</h2>

            <div className="flex flex-col gap-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-8">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-black/50 dark:text-white/70 uppercase tracking-wider">
                        {t("settings.rounds")}
                    </label>
                    <div className="flex gap-3">
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

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-black/50 dark:text-white/70 uppercase tracking-wider">
                        {t("settings.timePerRound")}
                    </label>
                    <div className="flex gap-3">
                        {timeOptions.map((t_) => (
                            <button
                                key={t_}
                                onClick={() => updateSettings({ timePerRound: t_ })}
                                className={`px-5 py-2 rounded-xl font-bold transition-colors cursor-pointer ${settings.timePerRound === t_
                                        ? "bg-violet-500 text-white"
                                        : "bg-black/10 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/20 dark:hover:bg-white/20"
                                    }`}
                            >
                                {t_}s
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-black/50 dark:text-white/70 uppercase tracking-wider">
                        {t("settings.difficulty")}
                    </label>
                    <div className="flex gap-3">
                        {difficultyOptions.map((d) => (
                            <button
                                key={d}
                                onClick={() => updateSettings({ difficulty: d })}
                                className={`px-5 py-2 rounded-xl font-bold capitalize transition-colors cursor-pointer ${settings.difficulty === d
                                        ? "bg-violet-500 text-white"
                                        : "bg-black/10 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/20 dark:hover:bg-white/20"
                                    }`}
                            >
                                {t(`settings.${d}`)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}