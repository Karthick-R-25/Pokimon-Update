import { useState, useEffect } from 'react';
import { getPokemonById } from '../services/pokiapi';

export default function usePokemonDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const detail = await getPokemonById(id);
        if (isMounted) {
          setData(detail);
        }
      } catch (error) {
        console.error('Failed to fetch Pokémon detail:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { data, loading };
}

