import React from 'react';
import './Load.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading Pokémon data...</p>
    </div>
  );
};

export default Loader;
