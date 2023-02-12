import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard/SingleCard';
import { Card } from './types/Card.model';

const cardImages: Card[] = [
  { "src": "/img/helmet-1.png", matched: false, },
  { "src": "/img/potion-1.png", matched: false, },
  { "src": "/img/sword-1.png", matched: false, },
  { "src": "/img/scroll-1.png", matched: false, },
  { "src": "/img/shield-1.png", matched: false, },
  { "src": "/img/ring-1.png", matched: false, },
];

function App() {
  const [cards, setCards] = useState<Array<Card>>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card>();
  const [choiceTwo, setChoiceTwo] = useState<Card>();
  const [disabled, setDisabled] = useState(false);
  
  // shuffle the order of the cards
  const shuffleCards = () => {
    const shuffledCards: Card[] = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map(card => ({ ...card, id: Math.random() }));
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card: Card) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
  }

  // compare two selected cards
  useEffect(
    () => {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map((card) => {
              if (card.src === choiceOne.src || card.src === choiceTwo.src) 
                return { ...card, matched: true };
              else 
                return card;
            });
          });
          resetChoices();
        } 
        else {
          setTimeout(() => resetChoices(), 1000);
        }
      }
    },
    [choiceOne, choiceTwo]
  );

  // calculates a user's success rate per turn
  const calculateSuccessPercentage = (): number => {
    const TurnsWithMatches = (cards.filter(card => { return card.matched }).length)/2;
    return +((TurnsWithMatches/turns)*100).toFixed(2);
  }

  // resets choices and increments user's turn
  const resetChoices = () => {
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // starts a new game automatically
  useEffect(
    () => {
      shuffleCards();
    },
    []
  );

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={ shuffleCards }>New Game</button>

      <div className="card-grid">
        { cards.map(card => (
          <SingleCard 
            handleChoice={ handleChoice } 
            card={ card } 
            key={ card.id } 
            flipped={ card === choiceOne || card === choiceTwo || card.matched } 
            disabled={ disabled }
          />
        )) }
      </div>
      <p>
        Turns: { turns }&nbsp;
        { turns > 0 && 
          <span>- Success Rate:&nbsp;
            <span 
              style = {calculateSuccessPercentage() > 0 ? { color: "lime", fontWeight: "bold" } : { color: "red", fontWeight: "bold" }}>
              { calculateSuccessPercentage() }%
            </span>
          </span> }
      </p>
    </div>
  );
}

export default App;
