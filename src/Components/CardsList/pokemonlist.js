import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getPokemonList } from '../../services/pokiapi';
import SortFilterBar from '../SortFilterBar/SortFilterBar';
import CardItems from '../CardItems/pokemonitem';
import { useNavigate } from 'react-router-dom';
import './pokemonlist.css';
import star from '../../assets/yellow-star.png';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [types, setTypes] = useState([]);
  const [currentSort, setCurrentSort] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemonData = await getPokemonList();
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
        const allTypes = [...new Set(pokemonData.flatMap(p => p.types))];
        setTypes(allTypes);
        setLoading(false);
      } catch (err) {
        setError('Error fetching Pokémon list.');
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const sortPokemons = useCallback((list, sortKey) => {
    if (!sortKey) return list;
    return [...list].sort((a, b) =>
      sortKey === 'name' ? a.name.localeCompare(b.name) : a.id - b.id
    );
  }, []);

  const handleSortChange = useCallback((sortKey) => {
    setCurrentSort(sortKey);
    setCurrentPage(1);
  }, []);

  const handleTypeChange = useCallback((type) => {
    setCurrentFilter(type);
    setCurrentPage(1);
  }, []);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const displayedPokemons = useMemo(() => {
    const filteredByType = currentFilter === ''
      ? pokemons
      : pokemons.filter(p => p.types.includes(currentFilter));

    const filteredBySearch = searchQuery === ''
      ? filteredByType
      : filteredByType.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return sortPokemons(filteredBySearch, currentSort);
  }, [pokemons, currentFilter, currentSort, searchQuery, sortPokemons]);

  useEffect(() => {
    setFilteredPokemons(displayedPokemons);
  }, [displayedPokemons]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p className='Loader'>Pokemon Unlocked soon...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='pokemon-list-item-container'>
      <h1>Pokemon Unlocked</h1>
      <SortFilterBar
        onSortChange={handleSortChange}
        onTypeChange={handleTypeChange}
        types={types}
        currentSort={currentSort}
      />

      <div>
        <input
          className='search-input'
          type="text"
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="type-item">
        Items per page:{' '}
        {[10, 20, 50].map((num) => (
          <span
            key={num}
            onClick={() => handleItemsPerPageChange({ target: { value: num } })}
            className={itemsPerPage === num ? 'active' : ''}
            style={{ margin: '0 5px', cursor: 'pointer' }}
          >
            {num}
          </span>
        ))}
      </div>

      <p className='fav' onClick={() => navigate('/favorites')}>
        Favorite <img className='fav-image' src={star} alt='favorite' />
      </p>

      <div className="pokemon-list">
        {currentPokemons.length === 0 ? (
          <p className='no-pokemon'>No Pokémon found.</p>
        ) : (
          currentPokemons.map(pokemon => (
            <div key={pokemon.id} onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
              <CardItems pokemon={pokemon} />
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          PrevLand
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          NextLand
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
