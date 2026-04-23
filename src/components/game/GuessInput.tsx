// src/components/game/GuessInput.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGameStore } from "../../store/gameStore";
import { Send } from "lucide-react";

export default function GuessInput() {
    const { t } = useTranslation();
    const [value, setValue] = useState("");
    const addGuess = useGameStore((s) => s.addGuess);
    const currentWord = useGameStore((s) => s.currentWord);
    const setWordGuessed = useGameStore((s) => s.setWordGuessed);
    const setPhase = useGameStore((s) => s.setPhase);
    const phase = useGameStore((s) => s.phase);

    const submit = () => {
        const trimmed = value.trim();
        if (!trimmed || phase !== "playing") return;

        const correct = trimmed.toLowerCase() === currentWord.toLowerCase();
        addGuess({ text: trimmed, correct, timestamp: Date.now() });
        setValue("");

        if (correct) {
            setWordGuessed(true);
            setPhase("roundEnd");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") submit();
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("game.guess")}
                autoComplete="off"
                spellCheck={false}
                disabled={phase !== "playing"}
                className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-black/30 dark:placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
                onClick={submit}
                disabled={phase !== "playing"}
                className="flex items-center gap-2 px-4 py-2.5 bg-violet-500 hover:bg-violet-400 text-white font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send size={16} />
                {t("game.submit")}
            </button>
        </div>
    );
}