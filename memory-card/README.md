# Memory Card Game

A Pokemon-themed memory card game built with React. Test your memory by clicking each Pokemon card only once — click the same card twice and it's game over!

## How to Play

- Cards are shuffled and displayed at the start of the game
- Click a card to score a point — the board reshuffles after every click
- **Don't click the same card twice** or the game ends
- Beat your own best score across multiple rounds
- Click all 12 cards without repeating to win

## Features

- 12 random Pokemon fetched from the [PokeAPI](https://pokeapi.co/) on every game load
- Live score tracker and persistent best score
- Cards shuffle on every click to keep you on your toes
- Win detection when all cards are clicked without a repeat
- Animated pokeball loading spinner while fetching data
- Smooth card hover animations
- Fully responsive grid layout

## Tech Stack

- **React** — component-based UI and state management with hooks
- **Vite** — fast dev server and production bundler
- **CSS** — custom styling, no UI libraries
- **PokeAPI** — free public API for Pokemon data and artwork

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Card.jsx          # Individual Pokemon card
│   ├── GameBoard.jsx     # Responsive card grid
│   ├── Header.jsx        # Title, instructions, scoreboard
│   └── ScoreBoard.jsx    # Current score and best score display
├── App.jsx               # Game logic, API fetch, state management
├── App.css               # Layout and overlay styles
└── index.css             # Global reset and background
```

