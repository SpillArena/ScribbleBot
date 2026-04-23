// src/components/landing/Settings.tsx
import { motion } from "framer-motion";
import { useGameStore, type Difficulty } from "../../store/gameStore";

const roundOptions = [3, 5, 10];
const timeOptions = [30, 60, 90];
const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];

export default function Settings() {
    const settings = useGameStore((s) => s.settings);
    const updateSettings = useGameStore((s) => s.updateSettings);

    return (
        <motion.section
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <h2 className="text-3xl font-bold text-center">Settings</h2>

            <div className="flex flex-col gap-6 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                        Rounds
                    </label>
                    <div className="flex gap-3">
                        {roundOptions.map((r) => (
                            <button
                                key={r}
                                onClick={() => updateSettings({ rounds: r })}
                                className={`px-5 py-2 rounded-xl font-bold transition-colors cursor-pointer ${settings.rounds === r
                                        ? "bg-violet-500 text-white"
                                        : "bg-white/10 text-white/60 hover:bg-white/20"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                        Time per Round
                    </label>
                    <div className="flex gap-3">
                        {timeOptions.map((t) => (
                            <button
                                key={t}
                                onClick={() => updateSettings({ timePerRound: t })}
                                className={`px-5 py-2 rounded-xl font-bold transition-colors cursor-pointer ${settings.timePerRound === t
                                        ? "bg-violet-500 text-white"
                                        : "bg-white/10 text-white/60 hover:bg-white/20"
                                    }`}
                            >
                                {t}s
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                        Difficulty
                    </label>
                    <div className="flex gap-3">
                        {difficultyOptions.map((d) => (
                            <button
                                key={d}
                                onClick={() => updateSettings({ difficulty: d })}
                                className={`px-5 py-2 rounded-xl font-bold capitalize transition-colors cursor-pointer ${settings.difficulty === d
                                        ? "bg-violet-500 text-white"
                                        : "bg-white/10 text-white/60 hover:bg-white/20"
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}