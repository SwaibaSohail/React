import Card from './Card';
import './GameBoard.css';

export default function GameBoard({ cards, onCardClick }) {
  return (
    <div className="gameboard">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          image={card.image}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
