// src/components/ui/Header.tsx
import { Sun, Moon, Globe, ChevronLeft, Flag } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useGameStore } from "../../store/gameStore";
import { useTranslation } from "react-i18next";

export default function Header() {
    const toggleTheme = useThemeStore((s) => s.toggleTheme);
    const theme = useThemeStore((s) => s.theme);
    const { t, i18n } = useTranslation();
    const view = useGameStore((s) => s.view);
    const resetGame = useGameStore((s) => s.resetGame);
    const setView = useGameStore((s) => s.setView);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "no" ? "en" : "no");
    };

    const handleNavAction = () => {
        if (view === "game") {
            resetGame();
            setView("landing");
        } else {
            window.location.href = "https://spillarena.no";
        }
    };

    const isGameActive = view === "game";

    return (
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

                {/* Right side controls */}
                <div className="flex items-center gap-2">
                    {/* Language switcher */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        title="Switch language"
                    >
                        <Globe size={15} />
                        {i18n.language === "no" ? "EN" : "NO"}
                    </button>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        title="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}