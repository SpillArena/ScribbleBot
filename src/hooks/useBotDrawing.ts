// src/hooks/useBotDrawing.ts
import { useEffect, useRef, useCallback } from "react";
import { useGameStore, difficultyTime } from "../store/gameStore";

type Stroke = [number[], number[], number[]?];
type StrokeData = Stroke[];

const CANVAS_SIZE = 255;

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export function useBotDrawing(
    canvasRef: React.RefObject<HTMLCanvasElement | null>, // 👈 fix
    strokes: StrokeData
) {
    const difficulty = useGameStore((s) => s.settings.difficulty);
    const animationRef = useRef<number | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancel = useCallback(() => {
        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || strokes.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const totalDuration = difficultyTime[difficulty] * 1000 * 0.85;
        const scaleX = canvas.width / CANVAS_SIZE;
        const scaleY = canvas.height / CANVAS_SIZE;

        const totalPoints = strokes.reduce((acc, [xs]) => acc + xs.length, 0);
        const msPerPoint = totalDuration / totalPoints;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000";

        let strokeIndex = 0;
        let pointIndex = 0;
        let lastTime: number | null = null;
        let accumulated = 0;

        const step = (timestamp: number) => {
            if (lastTime === null) lastTime = timestamp;
            accumulated += timestamp - lastTime;
            lastTime = timestamp;

            while (accumulated >= msPerPoint) {
                accumulated -= msPerPoint;

                const stroke = strokes[strokeIndex];
                const [xs, ys] = stroke;

                if (pointIndex === 0) {
                    ctx.beginPath();
                    ctx.moveTo(xs[0] * scaleX, ys[0] * scaleY);
                } else {
                    const prevX = xs[pointIndex - 1] * scaleX;
                    const prevY = ys[pointIndex - 1] * scaleY;
                    const currX = xs[pointIndex] * scaleX;
                    const currY = ys[pointIndex] * scaleY;

                    const midX = lerp(prevX, currX, 0.5);
                    const midY = lerp(prevY, currY, 0.5);
                    ctx.quadraticCurveTo(prevX, prevY, midX, midY);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(midX, midY);
                }

                pointIndex++;

                if (pointIndex >= xs.length) {
                    ctx.stroke();
                    strokeIndex++;
                    pointIndex = 0;
                    if (strokeIndex >= strokes.length) return;
                }
            }

            animationRef.current = requestAnimationFrame(step);
        };

        animationRef.current = requestAnimationFrame(step);
    }, [canvasRef, strokes, difficulty]);

    useEffect(() => {
        cancel();
        draw();
        return cancel;
    }, [draw, cancel]);
}