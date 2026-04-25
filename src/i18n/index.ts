// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    no: {
        translation: {
            nav: {
                forfeit: "Gi opp",
                forfeitConfirm: "Gi opp runden?",
                forfeitWarning: "Du vil ikke få poeng for denne runden",
                forfeitYes: "Ja, gi opp",
                forfeitCancel: "Fortsett å spille",
                backToArena: "Tilbake til arenaen"
            },
            hero: {
                subtitle: "En bot tegner. Du gjetter. Hvor raskt klarer du det?",
                play: "Spill nå",
                wordLanguageDisclaimer: "Ordene er alltid på engelsk"
            },
            howToPlay: {
                title: "Slik spiller du",
                steps: [
                    {
                        title: "Boten tegner",
                        description:
                            "En robot tegner et hemmelig ord på lerretet, strek for strek.",
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
            username: {
                title: "Hva skal vi kalle deg?",
                placeholder: "Skriv inn brukernavn...",
                tooShort: "Brukernavnet må være minst 2 tegn",
                tooLong: "Brukernavnet kan ikke være mer enn 16 tegn",
                invalidChars: "Kun bokstaver, tall og understrek er tillatt",
                profanity: "Det brukernavnet er ikke tillatt",
            },
            settings: {
                title: "Velg innstillinger",
                subtitle: "Tilpass spillet før du starter",
                rounds: "Antall runder",
                difficulty: "Vanskelighetsgrad",
                easy: "Lett",
                medium: "Middels",
                hard: "Vanskelig",
                easyDesc: "90 sekunder per runde",
                mediumDesc: "60 sekunder per runde",
                hardDesc: "30 sekunder per runde",
                play: "Start spill",
            },
            footer: { madeBy: "Laget av" },
            game: {
                round: "Runde",
                of: "av",
                timeLeft: "Tid igjen",
                guess: "Gjett ordet...",
                submit: "Gjett",
                correct: "Riktig!",
                gaveUp: "Ordet var",
                guessLog: "Gjetninger",
                go: "Gå!",
                getReady: "Gjør deg klar",
                quit: "Avslutt",
                continue: "Neste runde",
                finish: "Avslutt",
                forfeited: "Ga opp runden",
            },
            leaderboard: {
                title: "Toppliste",
                reset: "Nullstill",
                confirmQuestion: "Er du sikker?",
                confirmYes: "Ja, slett",
                confirmCancel: "Avbryt",
                empty: "Ingen resultater ennå. Spill et spill!",
                rounds: "runder",
                difficulty: {
                    easy: "Lett",
                    medium: "Middels",
                    hard: "Vanskelig"
                }
            }
        },
    },
    en: {
        translation: {
            nav: {
                forfeit: "Forfeit",
                forfeitConfirm: "Forfeit the round?",
                forfeitWarning: "You will not earn any points for this round.",
                forfeitYes: "Yes, give up",
                forfeitCancel: "Continue playing",
                backToArena: "Back to the arena"
            },
            hero: {
                subtitle:
                    "A bot draws. You guess. How fast can you figure it out?",
                play: "Play Now",
                wordLanguageDisclaimer: "Words are always in English"
            },
            howToPlay: {
                title: "How to Play",
                steps: [
                    {
                        title: "Bot Draws",
                        description:
                            "A bot draws a secret word on the canvas, stroke by stroke.",
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
            username: {
                title: "What should we call you?",
                placeholder: "Enter username...",
                tooShort: "Username must be at least 2 characters",
                tooLong: "Username cannot exceed 16 characters",
                invalidChars: "Only letters, numbers and underscores allowed",
                profanity: "That username is not allowed",
            },
            settings: {
                title: "Choose Settings",
                subtitle: "Customize your game before you start",
                rounds: "Number of Rounds",
                difficulty: "Difficulty",
                easy: "Easy",
                medium: "Medium",
                hard: "Hard",
                easyDesc: "90 seconds per round",
                mediumDesc: "60 seconds per round",
                hardDesc: "30 seconds per round",
                play: "Start Game",
            },
            footer: { madeBy: "Made by" },
            game: {
                round: "Round",
                of: "of",
                timeLeft: "Time left",
                guess: "Guess the word...",
                submit: "Guess",
                correct: "Correct!",
                gaveUp: "The word was",
                guessLog: "Guesses",
                go: "Go!",
                getReady: "Get ready",
                quit: "Quit",
                continue: "Next round",
                finish: "Finish",
                forfeited: "Forfeited the round",
            },
            leaderboard: {
                title: "Leaderboard",
                reset: "Reset",
                confirmQuestion: "Are you sure?",
                confirmYes: "Yes, delete",
                confirmCancel: "Cancel",
                empty: "No results yet. Play a game!",
                rounds: "rounds",
                difficulty: {
                    easy: "Easy",
                    medium: "Medium",
                    hard: "Hard"
                }
            }
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