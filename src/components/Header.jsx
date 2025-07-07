import React from 'react';

export default function Header({ shuffleCards, time, bestTime }) {
  return (
    <div className="header" style={{ textAlign: 'center', padding: '1rem' }}>
      {/* <h1 style={{ fontSize: '2rem' }}>🧠 Memory Game</h1> */}
      <button onClick={shuffleCards} style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
        🔁 New Game
      </button>
      <div>
        <p>⏱ Time: {time}s</p>
        {bestTime !== null && <p>🏆 Best: {bestTime}s</p>}
      </div>
    </div>
  );
}
