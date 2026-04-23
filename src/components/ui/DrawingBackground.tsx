// src/components/ui/DrawingBackground.tsx
import {
    Pencil,
    Paintbrush,
    Pen,
    Ruler,
    Eraser,
    Highlighter,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
    Icon: LucideIcon;
    x: number;
    y: number;
    rotate: number;
    size: number;
    opacity: number;
}

const items: Item[] = [
    { Icon: Pencil, x: 5, y: 8, rotate: -25, size: 16, opacity: 0.07 },
    { Icon: Pencil, x: 88, y: 15, rotate: 40, size: 14, opacity: 0.06 },
    { Icon: Pencil, x: 45, y: 92, rotate: -10, size: 18, opacity: 0.07 },
    { Icon: Pencil, x: 72, y: 78, rotate: 55, size: 13, opacity: 0.05 },
    { Icon: Pencil, x: 93, y: 70, rotate: -30, size: 15, opacity: 0.06 },

    { Icon: Paintbrush, x: 15, y: 35, rotate: 20, size: 16, opacity: 0.07 },
    { Icon: Paintbrush, x: 92, y: 45, rotate: -35, size: 15, opacity: 0.06 },
    { Icon: Paintbrush, x: 60, y: 5, rotate: 15, size: 14, opacity: 0.05 },
    { Icon: Paintbrush, x: 30, y: 85, rotate: -20, size: 17, opacity: 0.07 },

    { Icon: Pen, x: 78, y: 40, rotate: 30, size: 14, opacity: 0.06 },
    { Icon: Pen, x: 10, y: 65, rotate: -45, size: 15, opacity: 0.07 },
    { Icon: Pen, x: 55, y: 68, rotate: 10, size: 13, opacity: 0.05 },
    { Icon: Pen, x: 3, y: 88, rotate: 20, size: 16, opacity: 0.06 },

    { Icon: Ruler, x: 38, y: 18, rotate: -15, size: 16, opacity: 0.06 },
    { Icon: Ruler, x: 82, y: 88, rotate: 25, size: 15, opacity: 0.07 },
    { Icon: Ruler, x: 50, y: 50, rotate: -40, size: 13, opacity: 0.04 },

    { Icon: Eraser, x: 22, y: 52, rotate: -5, size: 15, opacity: 0.06 },
    { Icon: Eraser, x: 68, y: 25, rotate: 12, size: 14, opacity: 0.05 },
    { Icon: Eraser, x: 85, y: 62, rotate: -20, size: 16, opacity: 0.06 },

    { Icon: Highlighter, x: 42, y: 42, rotate: 35, size: 14, opacity: 0.05 },
    { Icon: Highlighter, x: 18, y: 15, rotate: -30, size: 15, opacity: 0.06 },
    { Icon: Highlighter, x: 75, y: 55, rotate: 18, size: 13, opacity: 0.05 },
];

export default function DrawingBackground() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
            {items.map((item, i) => (
                <div
                    key={i}
                    className="absolute text-black dark:text-white"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: `rotate(${item.rotate}deg)`,
                        opacity: item.opacity,
                    }}
                >
                    <item.Icon size={item.size} strokeWidth={1.5} />
                </div>
            ))}
        </div>
    );
}