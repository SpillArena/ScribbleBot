// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    no: {
        translation: {
            nav: {
                backToArena: "Tilbake til Arena",
            },
            hero: {
                subtitle: "En bot tegner. Du gjetter. Hvor raskt klarer du det?",
                play: "Spill nå",
            },
            howToPlay: {
                title: "Slik spiller du",
                steps: [
                    {
                        title: "Boten tegner",
                        description:
                            "En AI-bot tegner et hemmelig ord på lerretet, strek for strek.",
                    },
                    {
                        title: "Du gjetter",
                        description:
                            "Se tegningen ta form og skriv inn svaret ditt før tiden renner ut.",
                    },
                    {
                        title: "Fart teller",
                        description:
                            "Jo raskere du gjetter riktig, jo flere poeng får du.",
                    },
                ],
            },
            settings: {
                title: "Innstillinger",
                rounds: "Runder",
                timePerRound: "Tid per runde",
                difficulty: "Vanskelighetsgrad",
                easy: "Lett",
                medium: "Middels",
                hard: "Vanskelig",
            },
            footer: {
                madeBy: "Laget av",
            },
        },
    },
    en: {
        translation: {
            nav: {
                backToArena: "Back to Arena",
            },
            hero: {
                subtitle: "A bot draws. You guess. How fast can you figure it out?",
                play: "Play Now",
            },
            howToPlay: {
                title: "How to Play",
                steps: [
                    {
                        title: "Bot Draws",
                        description:
                            "An AI bot draws a secret word on the canvas, stroke by stroke.",
                    },
                    {
                        title: "You Guess",
                        description:
                            "Watch the drawing unfold and type your guess before time runs out.",
                    },
                    {
                        title: "Speed Matters",
                        description:
                            "The faster you guess correctly, the more points you earn.",
                    },
                ],
            },
            settings: {
                title: "Settings",
                rounds: "Rounds",
                timePerRound: "Time per Round",
                difficulty: "Difficulty",
                easy: "Easy",
                medium: "Medium",
                hard: "Hard",
            },
            footer: {
                madeBy: "Made by",
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "no",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;