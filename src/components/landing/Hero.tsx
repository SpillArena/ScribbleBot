// src/components/landing/Hero.tsx
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { Paintbrush } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

export default function Hero() {
    const setView = useGameStore((s) => s.setView);
    const { t } = useTranslation();

    return (
        <motion.section
            className="flex flex-col items-center text-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <img src={logo} alt="ScribbleBot logo" className="w-32 h-32" />

            <h1 className="text-6xl font-extrabold tracking-tight">
                Scribble<span className="text-violet-400">Bot</span>
            </h1>

            <p className="text-lg text-black/50 dark:text-white/60 max-w-md">
                {t("hero.subtitle")}
            </p>

            <motion.button
                onClick={() => setView("game")}
                className="mt-4 flex items-center gap-2 px-10 py-4 bg-violet-500 hover:bg-violet-400 text-white text-xl font-bold rounded-2xl shadow-lg shadow-violet-500/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
            >
                <Paintbrush size={22} />
                {t("hero.play")}
            </motion.button>
        </motion.section>
    );
}