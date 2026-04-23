# ScribbleBot 🎨

A drawing guessing game where an AI bot draws and you guess the word. Built with React, TypeScript, and Tailwind CSS.

## How It Works

1. **Bot Draws** — An AI bot draws a secret word on the canvas, stroke by stroke
2. **You Guess** — Watch the drawing unfold and type your guess before time runs out
3. **Speed Matters** — The faster you guess correctly, the more points you earn

## Features

- 🤖 AI-powered bot drawing with natural, imperfect strokes
- ⚡ Speed-based scoring system
- 🔤 Classic `_ _ _ _ _` word hint system
- ⚙️ Configurable rounds, time per round, and difficulty
- 🎨 Clean, modern UI with smooth animations

## Tech Stack

- [React 19](https://react.dev/) with the React Compiler
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) — global game state
- [Framer Motion](https://www.framer.com/motion/) — animations and page transitions
- [Vite](https://vitejs.dev/) — build tool

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/scribblebot.git
cd scribblebot
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Game Settings

| Setting | Options |
|---|---|
| Rounds | 3, 5, 10 |
| Time per round | 30s, 60s, 90s |
| Difficulty | Easy, Medium, Hard |

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── HowToPlay.tsx
│   │   └── Settings.tsx
│   ├── _layout.tsx
│   └── LandingPage.tsx
├── store/
│   └── gameStore.ts
├── App.tsx
└── main.tsx
```

## License

MIT