import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './contexts/PokemonContext';
import HomePage from './pages/pokiHome';
import PokemonDetailPage from './pages/pokiDetails';
import FavoritesPage from './pages/pokiFavourite';

import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <PokemonProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/Pokimon-Update" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
           
          </Routes>
        </ErrorBoundary>
      </Router>
    </PokemonProvider>
  );
};

export default App;

