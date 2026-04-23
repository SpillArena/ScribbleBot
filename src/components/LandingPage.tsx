// src/components/LandingPage.tsx
import Layout from "./_layout";
import Hero from "./landing/Hero";
import HowToPlay from "./landing/HowToPlay";
import Settings from "./landing/Settings";

export default function LandingPage() {
    return (
        <Layout>
            <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col gap-24">
                <Hero />
                <HowToPlay />
                <Settings />
            </div>
        </Layout>
    );
}