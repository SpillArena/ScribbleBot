// src/components/landing/Hero.tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <motion.section
            className="flex flex-col items-center text-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <img src={logo} alt="ScribbleBot logo" className="w-24 h-24" />
            <h1 className="text-6xl font-extrabold tracking-tight">
                Scribble<span className="text-violet-400">Bot</span>
            </h1>
            <p className="text-lg text-black/50 dark:text-white/60 max-w-md">
                {t("hero.subtitle")}
            </p>
            <p className="text-md text-center text-gray-400 dark:text-gray-500 mt-2">
                {t("hero.wordLanguageDisclaimer")}
            </p>
        </motion.section>
    );
}