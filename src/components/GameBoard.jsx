import Card from "./Card";

export default function GameBoard({ cards, handleChoice, disabled, choiceOne, choiceTwo }) {
  const isFlipped = (card) =>
    card === choiceOne || card === choiceTwo || card.matched;

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={isFlipped(card)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
