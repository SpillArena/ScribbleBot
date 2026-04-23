// src/components/game/DrawingCanvas.tsx
import { useRef, useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { fetchStrokes } from "../../lib/quickDraw";
import { useBotDrawing } from "../../hooks/useBotDrawing";

type Stroke = [number[], number[], number[]?];

export default function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const currentWord = useGameStore((s) => s.currentWord);
    const [strokes, setStrokes] = useState<Stroke[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    useEffect(() => {
        if (!currentWord) return;
        let cancelled = false;

        fetchStrokes(currentWord)
            .then((data) => {
                if (!cancelled) setStrokes(data);
            })
            .catch(console.error);

        return () => {
            cancelled = true;
            setStrokes([]);
        };
    }, [currentWord]);

    useBotDrawing(canvasRef, strokes);

    return (
        <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg">
            <canvas
                ref={canvasRef}
                width={800}
                height={650}
                className="w-full h-full block bg-white"
            />
        </div>
    );
}