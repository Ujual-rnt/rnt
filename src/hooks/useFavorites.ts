import { useState, useEffect } from 'react';
import { properties } from '../data/properties';
import { Property } from '../types/property';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return {
    favorites,
    toggleFavorite,
    favoriteProperties
  };
};