// src/components/ui/Footer.tsx
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import GitHubIcon from "./GitHubIcon";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="w-full border-t border-black/10 dark:border-white/10 mt-24">
            <div className="mx-auto max-w-4xl px-6 py-6 flex items-center justify-center gap-2 text-sm text-black/40 dark:text-white/40">
                <span>{t("footer.madeBy")}</span>
                <a
                    href="https://github.com/EmilB04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-semibold text-black/60 dark:text-white/60 hover:text-violet-500 dark:hover:text-violet-400 transition-colors cursor-pointer"
                >
                    <GitHubIcon size={15} />
                    EmilB04
                    <ExternalLink size={13} />
                </a>
            </div>
        </footer>
    );
}