// src/components/ui/LandingPage.tsx
import Layout from "./_layout";
import Hero from "./landing/Hero";
import HowToPlay from "./landing/HowToPlay";
import Settings from "./landing/Settings";
import UsernameInput from "./landing/UsernameInput";

export default function LandingPage() {
    return (
        <Layout>
            <div className="mx-auto max-w-2xl px-6 py-12 flex flex-col gap-6">
                <Hero />
                <UsernameInput />
                <Settings />
                <HowToPlay />
            </div>
        </Layout>
    );
}