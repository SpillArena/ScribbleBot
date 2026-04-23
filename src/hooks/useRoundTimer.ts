// src/hooks/useRoundTimer.ts
import { useEffect, useRef } from "react";
import { useGameStore, difficultyTime } from "../store/gameStore";

export function useRoundTimer() {
    const phase = useGameStore((s) => s.phase);
    const setPhase = useGameStore((s) => s.setPhase);
    const settings = useGameStore((s) => s.settings);
    const currentWord = useGameStore((s) => s.currentWord);
    const setTimeLeft = useGameStore((s) => s.setTimeLeft);
    const setRevealedIndices = useGameStore((s) => s.setRevealedIndices);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clear = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Start countdown phase then transition to playing
    useEffect(() => {
        if (phase !== "countdown") return;

        const total = difficultyTime[settings.difficulty];
        setTimeLeft(total);
        setRevealedIndices([]);

        // Countdown runs for 4 seconds (3, 2, 1, Go!)
        // then flips to playing
        const timeout = setTimeout(() => {
            setPhase("playing");
        }, 4000);

        return () => clearTimeout(timeout);
    }, [phase, settings.difficulty, setPhase, setTimeLeft, setRevealedIndices]);

    // Timer + letter reveal during playing phase
    useEffect(() => {
        if (phase !== "playing") return;

        const total = difficultyTime[settings.difficulty];
        setTimeLeft(total);

        const letterIndices = currentWord
            .split("")
            .map((char, i) => (char !== " " ? i : null))
            .filter((i): i is number => i !== null);

        // Reveal ~half the letters evenly over the round duration
        const maxReveals = Math.floor(letterIndices.length / 2);
        const revealInterval = (total * 1000) / (maxReveals + 1);
        let revealsGiven = 0;

        intervalRef.current = setInterval(() => {
            setTimeLeft(
                useGameStore.getState().timeLeft - 1 <= 0
                    ? 0
                    : useGameStore.getState().timeLeft - 1
            );

            // Check if it's time to reveal another letter
            const elapsed =
                (total - useGameStore.getState().timeLeft) * 1000;
            const shouldReveal =
                revealsGiven < maxReveals &&
                elapsed >= revealInterval * (revealsGiven + 1);

            if (shouldReveal) {
                const current = useGameStore.getState().revealedIndices;
                const remaining = letterIndices.filter(
                    (i) => !current.includes(i)
                );
                if (remaining.length > 0) {
                    const pick =
                        remaining[Math.floor(Math.random() * remaining.length)];
                    setRevealedIndices([...current, pick]);
                    revealsGiven++;
                }
            }

            if (useGameStore.getState().timeLeft <= 0) {
                clear();
                setPhase("roundEnd");
            }
        }, 1000);

        return clear;
    }, [phase, settings.difficulty, currentWord, setPhase, setTimeLeft, setRevealedIndices]);
}