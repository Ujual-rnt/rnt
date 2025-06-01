import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginScreen } from './pages/LoginScreen';
import { BrowseScreen } from './pages/BrowseScreen';
import { DetailScreen } from './pages/DetailScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { DealsScreen } from './pages/DealsScreen';
import { MessagesScreen } from './pages/MessagesScreen';
import { FavoritesScreen } from './pages/FavoritesScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/browse" element={<BrowseScreen />} />
        <Route path="/detail/:id" element={<DetailScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/deals" element={<DealsScreen />} />
        <Route path="/messages" element={<MessagesScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
      </Routes>
    </Router>
  );
}

export default App