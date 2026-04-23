// src/components/landing/UsernameInput.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRound, CircleCheck, CircleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGameStore } from "../../store/gameStore";
import { RESERVED_USERNAME_TERMS } from "../../lib/reservedUsernames";

function validate(value: string, t: (k: string) => string): string | null {
    if (value.length < 2) return t("username.tooShort");
    if (value.length > 16) return t("username.tooLong");
    if (!/^[a-zA-Z0-9_æøåÆØÅ]+$/.test(value)) return t("username.invalidChars");
    if (
        RESERVED_USERNAME_TERMS.some((w) =>
            value.toLowerCase().includes(w.toLowerCase())
        )
    )
        return t("username.profanity");
    return null;
}

export default function UsernameInput() {
    const { t } = useTranslation();
    const setUsername = useGameStore((s) => s.setUsername);
    const username = useGameStore((s) => s.username);

    const [value, setValue] = useState(username);
    const [touched, setTouched] = useState(false);

    const validationError = validate(value, t);
    const error = touched ? validationError : null;
    const isValid = validationError === null && value.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setUsername(e.target.value);
        if (!touched) setTouched(true);
    };

    return (
        <motion.section
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold">{t("username.title")}</h2>
            </div>

            <div className="relative">
                {/* Left icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30">
                    <UserRound size={18} />
                </div>

                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={() => setTouched(true)}
                    placeholder={t("username.placeholder")}
                    maxLength={16}
                    spellCheck={false}
                    className={`w-full bg-black/5 dark:bg-white/5 border rounded-xl px-4 py-3 pl-11 pr-11 text-sm font-medium placeholder:text-black/30 dark:placeholder:text-white/30 outline-none transition-colors ${error
                            ? "border-red-400 focus:border-red-400"
                            : isValid
                                ? "border-green-400 focus:border-green-400"
                                : "border-black/10 dark:border-white/10 focus:border-violet-400"
                        }`}
                />

                {/* Right status icon */}
                <AnimatePresence mode="wait">
                    {isValid && (
                        <motion.div
                            key="valid"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <CircleCheck size={18} />
                        </motion.div>
                    )}
                    {error && (
                        <motion.div
                            key="error"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <CircleAlert size={18} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Error message */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        className="text-xs text-red-400 flex items-center gap-1.5 -mt-2"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Character count */}
            <p
                className={`text-xs text-right -mt-2 transition-colors ${value.length > 14
                        ? "text-red-400"
                        : "text-black/30 dark:text-white/30"
                    }`}
            >
                {value.length}/16
            </p>
        </motion.section>
    );
}