// src/Components/PokemonDetail/PokemonDetail.js
import React from 'react';
import './pokimonDetail.css';

const PokemonDetail = ({ data, isFavorite, onToggleFavorite }) => {
  const imageUrl = data.image;
  const shinyImageUrl = data?.shinyImage || data?.sprites?.front_shiny;
  const soundUrl = data?.sound;

  
  return (
    <div className="pokemon-detail">
      <h1 className='poki-name'>{data?.name || 'Unknown Pokémon'}</h1>
      <div className='pika-img'>
        <img src={imageUrl} alt={data?.name} />
      </div>
      <p className='poki-types'>Powers: {data.types.join(", ")}</p>
      <div className='pika-body'>
        <p>Height: {data?.height || 'N/A'} dm</p>
        <p>Weight: {data?.weight || 'N/A'} hg</p>
      </div>

      <div className="section">
        <h3>Abilities</h3>
        <ul>
          {data?.abilities?.map((ability, index) => (
            <li key={index}>{ability}</li>
          )) || <li>No abilities listed</li>}
        </ul>
      </div>

      <div className='poki-sec'>
        <div className="section1">
          <h3>Stats:</h3>
          <ul>
            {data?.stats?.map((stat, index) => (
              <li key={index}>
                {stat.name}: {stat.value}
              </li>
            )) || <li>No stats available</li>}
          </ul>
        </div>

        <div className="section2">
          <h3>Moves:</h3>
          <ul>
            {data?.moves?.map((move, index) => (
              <li key={index}>{move}</li>
            )) || <li>No moves available</li>}
          </ul>
        </div>
      </div>

      <div className="section4">
        <h3>Evolution Chain</h3>
        <p>{data.evolutionChain}</p>
      </div>

      <div className="button-container">
        <button onClick={onToggleFavorite} className="favorite-button">
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default PokemonDetail;
