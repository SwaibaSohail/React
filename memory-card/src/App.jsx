import { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import './App.css';

const POKEMON_COUNT = 12;

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    setLoading(true);
    try {
      const ids = shuffle([...Array(151).keys()].map((i) => i + 1)).slice(0, POKEMON_COUNT);
      const results = await Promise.all(
        ids.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())
        )
      );
      const pokemonCards = results.map((p) => ({
        id: p.id,
        name: p.name,
        image:
          p.sprites.other['official-artwork'].front_default ||
          p.sprites.front_default,
      }));
      setCards(shuffle(pokemonCards));
    } catch (err) {
      console.error('Failed to fetch pokemon', err);
    } finally {
      setLoading(false);
    }
  }

  function handleCardClick(id) {
    if (gameOver) return;

    if (clickedIds.includes(id)) {
      setGameOver(true);
      setWon(false);
      if (currentScore > bestScore) setBestScore(currentScore);
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
      setClickedIds([...clickedIds, id]);
      setCards((prev) => shuffle([...prev]));

      if (newScore === POKEMON_COUNT) {
        setGameOver(true);
        setWon(true);
      }
    }
  }

  function handleRestart() {
    setClickedIds([]);
    setCurrentScore(0);
    setGameOver(false);
    setWon(false);
    setCards((prev) => shuffle([...prev]));
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="pokeball" />
          <p>Loading Pokemon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header currentScore={currentScore} bestScore={bestScore} />

      {gameOver && (
        <div className="overlay">
          <div className="overlay-box">
            <h2>{won ? 'You Won!' : 'Game Over!'}</h2>
            <p>
              {won
                ? 'You clicked every card exactly once!'
                : `You scored ${currentScore} point${currentScore !== 1 ? 's' : ''}.`}
            </p>
            <button className="restart-btn" onClick={handleRestart}>
              Play Again
            </button>
          </div>
        </div>
      )}

      <GameBoard cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}
