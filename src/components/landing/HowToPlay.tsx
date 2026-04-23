// src/components/landing/HowToPlay.tsx
import { motion } from "framer-motion";
import { Bot, Brain, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: { icon: LucideIcon; title: string; description: string }[] = [
    {
        icon: Bot,
        title: "Bot Draws",
        description:
            "An AI bot draws a secret word on the canvas, stroke by stroke.",
    },
    {
        icon: Brain,
        title: "You Guess",
        description:
            "Watch the drawing unfold and type your guess before time runs out.",
    },
    {
        icon: Zap,
        title: "Speed Matters",
        description: "The faster you guess correctly, the more points you earn.",
    },
];

export default function HowToPlay() {
    return (
        <motion.section
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
        >
            <h2 className="text-3xl font-bold text-center">How to Play</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        className="flex flex-col items-center text-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                    >
                        <step.icon size={36} className="text-violet-400" />
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                        <p className="text-sm text-white/50">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}