import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import usePokemonDetail from '../hooks/usepokemonDetail';
import Loader from '../Components/Loader/Loader';
import PokemonDetail from '../Components/Pokidetail/PokimonDetail';
import { PokemonContext } from '../contexts/PokemonContext';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const { data, loading } = usePokemonDetail(id);
  const { state, dispatch } = useContext(PokemonContext);
  const { favorites } = state;

  const isFavorite = favorites.includes(id);
  const handleFavoriteToggle = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  if (loading) return <Loader />;

  return (
    <PokemonDetail
      data={data}
      isFavorite={isFavorite}
      onToggleFavorite={handleFavoriteToggle}
    />
  );
};

export default PokemonDetailPage;
