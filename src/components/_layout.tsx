// src/components/ui/_layout.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <motion.div
            className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </motion.div>
    );
}