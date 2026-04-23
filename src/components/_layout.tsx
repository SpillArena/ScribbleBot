// src/components/ui/_layout.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import DrawingBackground from "./ui/DrawingBackground";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <motion.div
            className="relative min-h-screen flex flex-col text-[var(--fg)] isolate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <DrawingBackground />
            <Header />
            <main className="relative flex-1 z-10">{children}</main>
            <Footer />
        </motion.div>
    );
}