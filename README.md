# React Projects

A collection of React projects built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

---

## Projects

### 1. CV Builder

> `cv-builder/`

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

> `memory-card/`

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

> `shopping-cart/`

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
React_Projects/
├── cv-builder/       # CV/résumé builder with PDF export
├── memory-card/      # Pokemon memory card game
└── shopping-cart/    # NexCart — mock e-commerce store
```
