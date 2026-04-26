// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/quickdraw": {
                target: "https://storage.googleapis.com/quickdraw_dataset/full/simplified",
                changeOrigin: true,
                secure: false,
                headers: {
                    "Origin": "https://storage.googleapis.com",
                },
                rewrite: (path: string) => path.replace(/^\/quickdraw/, ""),
            },
        },
    },
});