import ScoreBoard from './ScoreBoard';

export default function Header({ currentScore, bestScore }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Memory Card</h1>
        <p className="instructions">Click each card only once. Don&apos;t click the same card twice!</p>
      </div>
      <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
    </header>
  );
}
