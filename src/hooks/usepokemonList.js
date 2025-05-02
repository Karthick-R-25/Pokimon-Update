import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/pokiapi';

export default function usePokemonList(limit, offset) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonList(limit, offset).then(pokemons => {
      setData(pokemons);
      setLoading(false);
    });
  }, [limit, offset]);

  return { data, loading };
}
