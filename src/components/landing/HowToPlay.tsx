// src/components/landing/HowToPlay.tsx
import { motion } from "framer-motion";
import { Bot, Brain, ClockFading } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons: LucideIcon[] = [Bot, Brain, ClockFading];

export default function HowToPlay() {
    const { t } = useTranslation();
    const steps = t("howToPlay.steps", { returnObjects: true }) as {
        title: string;
        description: string;
    }[];

    return (
        <motion.section
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
        >
            <h2 className="text-3xl font-bold text-center">{t("howToPlay.title")}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {steps.map((step, i) => {
                    const Icon = icons[i];
                    return (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center text-center gap-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <Icon size={36} className="text-violet-400" />
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <p className="text-sm text-black/50 dark:text-white/50">
                                {step.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
}