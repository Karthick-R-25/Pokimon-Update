import React, { createContext, useReducer, useMemo } from 'react';

export const PokemonContext = createContext();

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const exists = state.favorites.includes(action.payload);
      const updated = exists
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return { ...state, favorites: updated };
    default:
      return state;
  }
}

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};
