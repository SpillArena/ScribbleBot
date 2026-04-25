// src/components/game/CountdownOverlay.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { useTranslation } from "react-i18next";

const STEPS = ["3", "2", "1", "Go!"];

export default function CountdownOverlay() {
    const phase = useGameStore((s) => s.phase);
    const view = useGameStore((s) => s.view);
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (phase !== "countdown" || view !== "game") return;

        const timers = [
            setTimeout(() => setVisible(true), 0),
            setTimeout(() => setStep(0), 0),
            setTimeout(() => setStep(1), 1000),
            setTimeout(() => setStep(2), 2000),
            setTimeout(() => setStep(3), 3000),
            setTimeout(() => setVisible(false), 3700),
        ];

        return () => {
            timers.forEach(clearTimeout);
            setVisible(false);
        };
    }, [phase, view]);

    const current = STEPS[step];
    const isGo = current === "Go!";

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

                    {/* Ripple ring */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`ring-${current}`}
                            className={`absolute rounded-full border-4 ${isGo ? "border-green-400" : "border-white/30"
                                }`}
                            initial={{ width: 120, height: 120, opacity: 0.8 }}
                            animate={{ width: 340, height: 340, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </AnimatePresence>

                    {/* Number / Go! */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            className="relative flex flex-col items-center gap-4"
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 2, filter: "blur(8px)" }}
                            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <span
                                className={`text-[120px] leading-none font-black select-none tracking-tight ${isGo
                                        ? "text-green-400 drop-shadow-[0_0_40px_rgba(74,222,128,0.8)]"
                                        : "text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                    }`}
                            >
                                {isGo ? t("game.go") : current}
                            </span>

                            {!isGo && (
                                <motion.p
                                    className="text-white/50 text-lg font-medium tracking-widest uppercase"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {t("game.getReady")}
                                </motion.p>
                            )}

                            {/* Disclaimer — shown on numbers, hidden on Go! */}
                            {!isGo && (
                                <motion.p
                                    className="text-white/30 text-sm font-medium"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {t("hero.wordLanguageDisclaimer")}
                                </motion.p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}