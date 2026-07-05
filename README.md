# React Projects

A collection of React projects built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

**🔗 Live: [reactapps99.netlify.app](https://reactapps99.netlify.app/)** — all three apps served from one site.

| App | Live |
|-----|------|
| CV Builder | [/cv-builder](https://reactapps99.netlify.app/cv-builder/) |
| Memory Card Game | [/memory-card](https://reactapps99.netlify.app/memory-card/) |
| NexCart — Shopping Cart | [/shopping-cart](https://reactapps99.netlify.app/shopping-cart/) |

---

## Projects

### 1. CV Builder

> `cv-builder/` · [Live demo](https://reactapps99.netlify.app/cv-builder/)

A live-preview CV/résumé builder. Fill in your details and download a polished PDF instantly.

**Features:**
- Live preview updates as you type
- Sections for General Info, Summary, Education, Experience, Projects, and Skills
- Add, edit, and remove multiple entries per section
- One-click PDF download via browser print dialog

**Stack:** React · Vite · CSS

```bash
cd cv-builder && npm install && npm run dev
```

---

### 2. Memory Card Game

> `memory-card/` · [Live demo](https://reactapps99.netlify.app/memory-card/)

A Pokemon-themed memory game. Click every card once — click the same one twice and it's game over.

**Features:**
- 12 random Pokemon fetched from [PokeAPI](https://pokeapi.co/) on every load
- Cards shuffle after every click to keep you guessing
- Live score + persistent best score tracker
- Win state when all 12 cards clicked without a repeat
- Animated loading spinner, card hover effects, responsive grid

**Stack:** React · Vite · CSS · PokeAPI

```bash
cd memory-card && npm install && npm run dev
```

---

### 3. NexCart — Shopping Cart

> `shopping-cart/` · [Live demo](https://reactapps99.netlify.app/shopping-cart/)

A dark-themed mock e-commerce store. Browse products from the FakeStore API, manage a cart, and review your order.

**Features:**
- Product catalog fetched from [FakeStore API](https://fakestoreapi.com)
- Add to cart, adjust quantities, remove items
- Live cart badge in navbar showing item count
- Order summary with subtotal
- Loading and error states with retry
- 37 tests with Vitest + React Testing Library

**Stack:** React · Vite · React Router v7 · Tailwind CSS v4 · Vitest · RTL · PropTypes

```bash
cd shopping-cart && npm install && npm run dev
```

---

## Repo Structure

```
React/
├── landing/          # Static hub page linking to all three apps
├── cv-builder/       # CV/résumé builder with PDF export
├── memory-card/      # Pokemon memory card game
├── shopping-cart/    # NexCart — mock e-commerce store
├── build-all.sh      # Builds all apps into one dist/ for deploy
└── netlify.toml      # Single-site Netlify config
```

---

## Deployment

All three apps deploy to **one** Netlify site at [reactapps99.netlify.app](https://reactapps99.netlify.app/). `build-all.sh` builds each app into its own subfolder of `dist/`, behind a shared landing page. Each app sets a Vite `base` path so its assets resolve under its subpath.
