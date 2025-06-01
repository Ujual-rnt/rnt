import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { Property } from '../types/property';
import PropertyCard from '../components/PropertyCard';

export const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowRecent(false);
    
    // Clear any existing timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (!query.trim()) {
      setSearchResults([]);
      // Show recent searches after 2 blinks (assuming cursor blinks every ~530ms)
      searchTimeout.current = setTimeout(() => {
        setShowRecent(true);
      }, 1060);
      return;
    }

    // Search in properties based on title or location only
    const searchTerm = query.toLowerCase().trim();
    const results = properties.filter(property => 
      property.title.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm)
    );

    setSearchResults(results);

    // Only save complete words to recent searches when user stops typing
    searchTimeout.current = setTimeout(() => {
      if (query.trim()) {
        const updatedSearches = [
          query.trim(),
          ...recentSearches.filter(s => s !== query.trim())
        ].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    }, 1000);
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
        {searchQuery && !showRecent ? (
          // Search Results
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {searchResults.length} results found
            </h2>
            {searchResults.map(property => (
              <Link 
                to={`/detail/${property.id}`} 
                key={property.id}
                className="block transition-transform duration-200 hover:scale-[0.98] active:scale-[0.97]"
              >
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>
        ) : showRecent ? (
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
        ) : null}
      </div>
    </div>
  );
};