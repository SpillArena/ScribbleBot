// src/components/game/DrawingCanvas.tsx
import { useRef, useEffect } from "react";

export default function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Fill white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    return (
        <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg">
            <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full h-full block"
            />
        </div>
    );
}