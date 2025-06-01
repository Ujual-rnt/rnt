import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { Property } from '../types/property';
import { useFavorites } from '../hooks/useFavorites';

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    toggleFavorite(property.id);
  };

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-lg animate-fadeIn">
      {/* Image */}
      <div className="relative h-[180px] w-full">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{property.location}</p>
          </div>
          <div className="flex items-center bg-[#7C3AED]/10 px-2 py-1 rounded-full">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <MapPin className="text-[#7C3AED] mr-1" size={16} />
            <span className="text-sm">{property.distance} km</span>
          </div>
          <button 
            onClick={handleFavoriteClick}
            className="text-[#7C3AED] transition-transform duration-150 hover:scale-110 active:scale-95"
          >
            <Heart 
              size={20} 
              className={`transition-colors duration-150 ${
                isFavorite ? 'fill-[#7C3AED]' : 'fill-transparent'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;