// src/hooks/useBotDrawing.ts
import { useEffect, useRef, useCallback } from "react";
import { useGameStore, difficultyTime, type Difficulty } from "../store/gameStore";
import type { StrokeData } from "../lib/quickDraw";

const CANVAS_SIZE = 255;

const completionRange: Record<Difficulty, [number, number]> = {
    easy:   [1.00, 1.00], // always finishes
    medium: [1.00, 1.00], // always finishes
    hard:   [1.00, 1.00], // always finishes
};

// How fast the bot draws (fraction of round time used)
const durationFactor: Record<Difficulty, number> = {
    easy:   0.35, // fastest — finishes well before time runs out
    medium: 0.50, // moderate pace
    hard:   0.65, // slowest — draws right up until near the end
};

function randomInRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

interface ScaledStroke {
    x: number[];
    y: number[];
}

export function useBotDrawing(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    strokes: StrokeData
) {
    const difficulty = useGameStore((s) => s.settings.difficulty);
    const animationRef = useRef<number | null>(null);

    const cancel = useCallback(() => {
        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || strokes.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const totalDuration = difficultyTime[difficulty] * 1000 * durationFactor[difficulty];
        const scaleX = canvas.width / CANVAS_SIZE;
        const scaleY = canvas.height / CANVAS_SIZE;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000";

        const scaled: ScaledStroke[] = strokes.map(([xs, ys]) => ({
            x: xs.map((v) => v * scaleX),
            y: ys.map((v) => v * scaleY),
        }));

        const totalPoints = scaled.reduce((acc, s) => acc + s.x.length, 0);

        // Pick a completion fraction for this round — fixed at draw() call time
        const [minC, maxC] = completionRange[difficulty];
        const completion = randomInRange(minC, maxC);
        const pointLimit = Math.floor(totalPoints * completion);

        const pointsPerMs = pointLimit / totalDuration;

        let globalPoint = 0;
        let lastTime: number | null = null;

        const resolve = (pos: number) => {
            let remaining = pos;
            for (let si = 0; si < scaled.length; si++) {
                const len = scaled[si].x.length;
                if (remaining < len - 1) {
                    return { si, pi: Math.floor(remaining), t: remaining % 1 };
                }
                remaining -= len - 1;
            }
            const last = scaled[scaled.length - 1];
            return { si: scaled.length - 1, pi: last.x.length - 1, t: 0 };
        };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const step = (timestamp: number) => {
            if (lastTime === null) lastTime = timestamp;
            const delta = Math.min(timestamp - lastTime, 50);
            lastTime = timestamp;

            const prevPoint = globalPoint;
            globalPoint = Math.min(globalPoint + delta * pointsPerMs, pointLimit);

            const prev = resolve(prevPoint);
            const curr = resolve(globalPoint);

            ctx.beginPath();

            const startX = lerp(
                scaled[prev.si].x[prev.pi],
                scaled[prev.si].x[Math.min(prev.pi + 1, scaled[prev.si].x.length - 1)],
                prev.t
            );
            const startY = lerp(
                scaled[prev.si].y[prev.pi],
                scaled[prev.si].y[Math.min(prev.pi + 1, scaled[prev.si].y.length - 1)],
                prev.t
            );
            ctx.moveTo(startX, startY);

            for (let si = prev.si; si <= curr.si; si++) {
                const stroke = scaled[si];
                const fromPi = si === prev.si ? prev.pi + 1 : 0;
                const toPi = si === curr.si ? curr.pi : stroke.x.length - 1;

                for (let pi = fromPi; pi <= toPi; pi++) {
                    if (pi === 0) {
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(stroke.x[0], stroke.y[0]);
                    } else {
                        const prevPx = stroke.x[pi - 1];
                        const prevPy = stroke.y[pi - 1];
                        const midX = (prevPx + stroke.x[pi]) / 2;
                        const midY = (prevPy + stroke.y[pi]) / 2;
                        ctx.quadraticCurveTo(prevPx, prevPy, midX, midY);
                    }
                }
            }

            const endX = lerp(
                scaled[curr.si].x[curr.pi],
                scaled[curr.si].x[Math.min(curr.pi + 1, scaled[curr.si].x.length - 1)],
                curr.t
            );
            const endY = lerp(
                scaled[curr.si].y[curr.pi],
                scaled[curr.si].y[Math.min(curr.pi + 1, scaled[curr.si].y.length - 1)],
                curr.t
            );
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Stop when we've hit the completion cap
            if (globalPoint < pointLimit) {
                animationRef.current = requestAnimationFrame(step);
            }
        };

        animationRef.current = requestAnimationFrame(step);
    }, [canvasRef, strokes, difficulty]);

    useEffect(() => {
        cancel();
        draw();
        return cancel;
    }, [draw, cancel]);
}