import React from 'react';
import Card from './Card'; // Import the Card component

const CardList = ({ cards }) => {
  return (
    <div className="card-container">
      {/* Map through the cards and render each card */}
      {cards.map(card => (
        <div key={card.id} className="card-item">
          <Card card={card} /> {/* Render each card component */}
        </div>
      ))}
    </div>
  );
};

export default CardList;
