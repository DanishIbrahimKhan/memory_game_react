import React from 'react';

export default function Card({ card, handleChoice, flipped, disabled }) {
  const onClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div className="card cursor-pointer" onClick={onClick}>
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img src={card.src} alt="card front" />
        </div>
        <div className="card-back">?</div>
      </div>
    </div>
  );
}
