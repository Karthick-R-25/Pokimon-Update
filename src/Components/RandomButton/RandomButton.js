import React from 'react';
import './RandomButton.css';

const RandomButton = ({ onRandom }) => {
  return (
    <div className="random-button-container">
      <button className="random-button" onClick={onRandom}>
        Surprise Me! 🎲
      </button>
    </div>
  );
};

export default RandomButton;
