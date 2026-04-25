// src/components/game/DrawingCanvas.tsx
import { useRef, useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { fetchStrokes, type StrokeData } from "../../lib/quickDraw";
import { useBotDrawing } from "../../hooks/useBotDrawing";

export default function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const currentWord = useGameStore((s) => s.currentWord);
    const phase = useGameStore((s) => s.phase);
    const [strokes, setStrokes] = useState<StrokeData>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!currentWord) return;
        let cancelled = false;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        fetchStrokes(currentWord)
            .then((data) => {
                if (!cancelled) {
                    setStrokes(data);
                    setIsLoading(false);
                }
            })
            .catch(console.error);

        Promise.resolve().then(() => {
            if (!cancelled) setIsLoading(true);
        });

        return () => {
            cancelled = true;
            setStrokes([]);
        };
    }, [currentWord]);

    // Only pass strokes to the drawing hook when the round is active
    useBotDrawing(canvasRef, phase === "playing" ? strokes : []);

    return (
        <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg">
            {isLoading && phase !== "playing" && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <span className="text-sm text-gray-400">Laster tegning...</span>
                </div>
            )}
            <canvas
                ref={canvasRef}
                width={800}
                height={650}
                className="w-full h-full block bg-white"
            />
        </div>
    );
}