import React from 'react';
import './Card.css'; // Import CSS file for styling

const Card = ({ card }) => {
  return (
    <div className="card">
      <img src={card.images.small} alt={card.name} /> {/* Display the small image */}
      <img src={card.images.large} alt={card.name} /> {/* Display the large image */}
      <span>{card.name}</span>
      {/* You may want to add more card details here */}
    </div>
  );
};

export default Card;
