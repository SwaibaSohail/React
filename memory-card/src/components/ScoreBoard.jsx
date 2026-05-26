import './ScoreBoard.css';

export default function ScoreBoard({ currentScore, bestScore }) {
  return (
    <div className="scoreboard">
      <div className="score">
        <span className="score-label">Score</span>
        <span className="score-value">{currentScore}</span>
      </div>
      <div className="score">
        <span className="score-label">Best</span>
        <span className="score-value">{bestScore}</span>
      </div>
    </div>
  );
}
