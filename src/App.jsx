import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from './assets/QRcode.jpeg'
import Swal from 'sweetalert2';
import './App.css';
import GameBoard from './components/GameBoard';
import Header from './components/Header';

const cardImages = [
  { src: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d', matched: false },
  { src: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1', matched: false },
  { src: 'https://plus.unsplash.com/premium_photo-1669725687221-6fe12c2da6b1?q=80&w=687&auto=format&fit=crop', matched: false },
  { src: 'https://plus.unsplash.com/premium_photo-1675700415013-48ade09d842a?q=80&w=687&auto=format&fit=crop', matched: false },
  { src: 'https://images.unsplash.com/photo-1524473994769-c1bbbf30e944?q=80&w=1170&auto=format&fit=crop', matched: false },
  { src: 'https://images.unsplash.com/photo-1558981012-236ee58eb5c9?q=80&w=1084&auto=format&fit=crop', matched: false },
  { src: 'https://plus.unsplash.com/premium_photo-1661962754715-d081d9ec53a3?q=80&w=687&auto=format&fit=crop', matched: false },
  { src: 'https://images.unsplash.com/photo-1473167052083-3d31fa1f6776?q=80&w=737&auto=format&fit=crop', matched: false },
  { src: 'https://images.unsplash.com/photo-1676291763547-28280fe179e2?q=80&w=1170&auto=format&fit=crop', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [animation, setAnimation] = useState(null);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(() => parseInt(localStorage.getItem('bestTime')) || null);
  const timerRef = useRef(null);

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
    setTime(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setAnimation('success');
        setCards((prev) =>
          prev.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setAnimation('fail');
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

 useEffect(() => {
  const allMatched = cards.length > 0 && cards.every((card) => card.matched);
  if (allMatched) {
    clearInterval(timerRef.current);

    if (!bestTime || time < bestTime) {
      localStorage.setItem('bestTime', time.toString());
      setBestTime(time);
    }

   const isMobile = window.innerWidth <= 768; // You can tweak the breakpoint

Swal.fire({
  title: '🎉 You Won!',
  html: `
    <p>⏱ Time: <b>${time}</b> seconds</p>
    ${
      bestTime && time >= bestTime
        ? `<p>🏆 Best: <b>${bestTime}</b> seconds</p>`
        : '<p>🔥 New Best Time!</p>'
    }
    <br/>
    ${
      isMobile
        ? ` <p>Click below to spread some chai love</p><a href="upi://pay?pa=mr.danishibrahim-2@okhdfcbank&pn=Danish%20Ibrahim&cu=INR" 
              style="display:inline-block; padding: 10px 20px; background:#4CAF50; color:white; font-weight:bold; border-radius:30px; text-decoration:none;">
              ☕💛 Buy Me a Chai 💛☕
           </a>`
        : `<img src=${QRCode} alt="UPI QR Code" style="max-width:200px; margin-top:15px;" />
           <p>☕💛 Spread some chai love 💛☕ Scan the QR with any UPI app💛☕</p>`
    }
  `,
  confirmButtonText: 'Play Again',
}).then((res) => {
  if (res.isConfirmed) shuffleCards();
});

  }
}, [cards]);


  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleChoice = (card) => {
    if (!disabled) {
      if (card === choiceOne) return;
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
    setTimeout(() => setAnimation(null), 1500);
  };

  return (
    <div className="container">
      <Header shuffleCards={shuffleCards} time={time} bestTime={bestTime} />
      <div className="game-container">
        <GameBoard
          cards={cards}
          handleChoice={handleChoice}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          disabled={disabled}
        />
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
