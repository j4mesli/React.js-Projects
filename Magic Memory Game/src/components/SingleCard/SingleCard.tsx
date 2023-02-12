import React, { useState } from 'react';
import './SingleCard.css';
import { Card } from '../../types/Card.model';

function SingleCard(props: { card: Card, handleChoice: (card: Card) => void, flipped: boolean, disabled: boolean, }) {
  const handleClick = () => {
    // passes whole card elem into the prop method to emit an event, the click listener just EMITS THE CARD ELEM ITSELF, NOT A NEW OBJ
    if (!props.disabled) props.handleChoice(props.card);
  }

  return (
    <div className="card">
        <div className={ props.flipped ? 'flipped' : '' }>
            <img src={ props.card.src } className="front" alt="Card Front" />
            <img src="/img/cover.png" onClick={ handleClick } className="back" alt="Card Back" />
        </div>
    </div>
  );
}

export default SingleCard;