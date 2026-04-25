// src/components/ui/Header.tsx
import { Sun, Moon, Globe, ChevronLeft, Flag } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useGameStore } from "../../store/gameStore";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const toggleTheme = useThemeStore((s) => s.toggleTheme);
    const theme = useThemeStore((s) => s.theme);
    const { t, i18n } = useTranslation();
    const view = useGameStore((s) => s.view);
    const forfeitRound = useGameStore((s) => s.forfeitRound);
    const [showConfirm, setShowConfirm] = useState(false);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "no" ? "en" : "no");
    };

    const handleForfeitConfirm = () => {
        forfeitRound(); // ends round → shows RoundEndOverlay with word revealed
        setShowConfirm(false);
    };

    const handleNavAction = () => {
        if (view === "game") {
            setShowConfirm(true);
        } else {
            window.location.href = "https://spillarena.no";
        }
    };

    const isGameActive = view === "game";

    return (
        <>
            <header className="w-full border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm sticky top-0 z-50">
                <div className="mx-auto max-w-4xl px-6 py-3 flex items-center justify-between">
                    <button
                        onClick={handleNavAction}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${isGameActive
                                ? "text-red-500 hover:text-red-400"
                                : "text-black/60 dark:text-white/60 hover:text-violet-500 dark:hover:text-violet-400"
                            }`}
                    >
                        {isGameActive ? (
                            <>
                                <Flag size={15} />
                                {t("nav.forfeit")}
                            </>
                        ) : (
                            <>
                                <ChevronLeft size={15} />
                                {t("nav.backToArena")}
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            title="Switch language"
                        >
                            <Globe size={15} />
                            {i18n.language === "no" ? "EN" : "NO"}
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            title="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Forfeit confirm modal */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowConfirm(false)}
                        />
                        <motion.div
                            className="relative bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-4"
                            initial={{ opacity: 0, scale: 0.92, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 8 }}
                            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <div className="flex flex-col gap-1">
                                <h2 className="text-base font-bold text-black dark:text-white">
                                    {t("nav.forfeitConfirm")}
                                </h2>
                                <p className="text-sm text-black/50 dark:text-white/50">
                                    {t("nav.forfeitWarning")}
                                </p>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    {t("nav.forfeitCancel")}
                                </button>
                                <button
                                    onClick={handleForfeitConfirm}
                                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-400 text-white transition-colors cursor-pointer"
                                >
                                    {t("nav.forfeitYes")}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}