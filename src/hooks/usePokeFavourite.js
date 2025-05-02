import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';

export default function useFavorites() {
  const { state, dispatch } = useContext(PokemonContext);

  const toggleFavorite = id => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  return { favorites: state.favorites, toggleFavorite };
}
