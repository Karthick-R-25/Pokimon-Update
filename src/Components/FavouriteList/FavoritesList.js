import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokemonContext } from '../../contexts/PokemonContext';
import CardItems from '../CardItems/pokemonitem';
import { getPokemonById } from '../../services/pokiapi'; // make sure this exists!
import './favoriteslist.css';
import home from '../../assets/home (1).png'

const FavoritesPage = () => {
  const { state } = useContext(PokemonContext);
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const details = await Promise.all(
          state.favorites.map(id => getPokemonById(id))
        );
        setFavoriteDetails(details);
      } catch (error) {
        console.error('Error fetching favorite Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    if (state.favorites.length > 0) {
      fetchFavorites();
    } else {
      setFavoriteDetails([]);
      setLoading(false);
    }
  }, [state.favorites]);

  if (loading) return <p>Loading your favorites...</p>;

  if (favoriteDetails.length === 0) {
    return (
      <div className="no-favorites">
        <p>You have no favorite Pokémon yet. Go catch some!</p>
        <img src={home} alt='go to Home' title='go home' onClick={() => navigate('/')} />
         
        
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h2>Your Favorite Pokémon</h2>
      <img src={home} alt='go to Home' title='go home' onClick={() => navigate('/')} />
      <div className="pokemon-list">
        {favoriteDetails.map(pokemon => (
          <div key={pokemon.id} onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
            <CardItems pokemon={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
