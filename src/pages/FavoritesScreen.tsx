import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import BottomNavigation from '../components/BottomNavigation';

export const FavoritesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, favoriteProperties } = useFavorites();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#7C3AED] px-6 pt-10 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl text-white font-semibold">My Favorites</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 pb-24">
        {favoriteProperties.length > 0 ? (
          <div className="space-y-4">
            {favoriteProperties.map(property => (
              <Link 
                to={`/detail/${property.id}`} 
                key={property.id}
                className="block transition-transform duration-200 hover:scale-[0.98] active:scale-[0.97]"
              >
                <PropertyCard 
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-base text-gray-600">No favorites yet</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};