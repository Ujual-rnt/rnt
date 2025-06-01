import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { properties } from '../data/properties';
import { Property } from '../types/property';
import PropertyCard from '../components/PropertyCard';

export const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Property[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Search in properties based on location, title, or description
    const results = properties.filter(property => 
      property.location.toLowerCase().includes(query.toLowerCase()) ||
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);

    // Save to recent searches
    if (query.trim()) {
      const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#7C3AED] px-6 pt-10 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl text-white font-semibold">I'm searching...</h1>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search location, property type..."
          className="w-full h-12 px-4 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:bg-white/20"
          autoFocus
        />
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {searchQuery ? (
          // Search Results
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {searchResults.length} results found
            </h2>
            {searchResults.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          // Recent Searches
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              My last searches
            </h2>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-50"
                  onClick={() => handleSearch(search)}
                >
                  <Clock className="text-gray-400 mr-3" size={20} />
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};