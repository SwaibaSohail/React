import './Card.css';

export default function Card({ id, name, image, onClick }) {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <div className="card-inner">
        <img src={image} alt={name} />
        <p className="card-name">{name}</p>
      </div>
    </div>
  );
}
