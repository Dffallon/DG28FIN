import React, { useState, useEffect } from 'react';
import Tab from './Tab';
import './Home.css';
import pokemon from 'pokemontcgsdk';

const Home = () => {
  const [currentTab, setCurrentTab] = useState('Base Set');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [ownedCards, setOwnedCards] = useState(() => {
    const storedOwnedCards = localStorage.getItem('ownedCards');
    return storedOwnedCards ? JSON.parse(storedOwnedCards) : {};
  });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const sets = await pokemon.set.all();
        const targetSet = sets.find(set => set.name === currentTab);
        if (targetSet) {
          const response = await pokemon.card.where({ q: `set.id:${targetSet.id}` });
          setCards(response.data);
        } else {
          console.error(`Set '${currentTab}' not found.`);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
  
    fetchCards();
  }, [currentTab]);

  const tabOptions = ['Base', 'Jungle', 'Fossil'];

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseHoveringWindow = () => {
    setSelectedCard(null);
  };

  const handleCheckboxChange = (event, cardId) => {
    const isChecked = event.target.checked;
    setOwnedCards(prevState => ({
      ...prevState,
      [cardId]: isChecked,
    }));
  };

  useEffect(() => {
    localStorage.setItem('ownedCards', JSON.stringify(ownedCards));
  }, [ownedCards]);

  return (
    <div className="container">
      <div className="sleeve" /> {/* Sleeve div */}
      <h1 className="title">Pokémon Card Tracker</h1>
      <div className="tabs">
        {tabOptions.map(tab => (
          <Tab
            key={tab}
            label={tab}
            active={tab === currentTab}
            onSelect={() => setCurrentTab(tab)}
          />
        ))}
      </div>
      <div className="cardList">
        {cards.map(card => (
          <div key={card.id} className="card">
            <img src={card.images.small} alt={card.name} />
            <div>
              <h3>{card.name}</h3>
              <button onClick={() => handleCardClick(card)}>View Details</button>
            </div>
            <input
              type="checkbox"
              checked={ownedCards[card.id]}
              onChange={(event) => handleCheckboxChange(event, card.id)}
              style={{ width: '20px', height: '20px', marginRight: '5px', marginTop: '5px' }}
            />
          </div>
        ))}
      </div>
      {selectedCard && (
        <div className="hoveringWindow">
          <button className="closeButton" onClick={handleCloseHoveringWindow}>X</button>
          <div className="cardDetails">
            <h2>{selectedCard.name}</h2>
            <div>Type: {selectedCard.supertype}</div>
            <div>Subtypes: {selectedCard.subtypes.join(', ')}</div>
            <div>HP: {selectedCard.hp}</div>
            <div>Rarity: {selectedCard.rarity}</div>
            {selectedCard.tcgplayer && selectedCard.tcgplayer.prices && (
              <div>
                TCGPlayer Market Price: ${selectedCard.tcgplayer.prices.market}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
