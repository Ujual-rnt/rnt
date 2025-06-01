import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { Property } from '../types/property';
import PropertyCard from '../components/PropertyCard';

export const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [showRecent, setShowRecent] = useState(true);
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
    
    // Clear any existing timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (!query.trim()) {
      setSearchResults([]);
      setShowRecent(true);
      return;
    }

    setShowRecent(false);

    // Search in properties based on title or location
    const searchTerm = query.toLowerCase().trim();
    const results = properties.filter(property => 
      property.title.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm)
    );

    setSearchResults(results);
  };

  const saveToRecent = (query: string) => {
    if (query.trim()) {
      const updatedSearches = [
        query.trim(),
        ...recentSearches.filter(s => s !== query.trim())
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
  };

  const removeRecentSearch = (searchToRemove: string) => {
    const updatedSearches = recentSearches.filter(search => search !== searchToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveToRecent(searchQuery);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    handleSearch(search);
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
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search location, property type..."
            className="w-full h-12 px-4 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:bg-white/20"
            autoFocus
          />
        </form>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {showRecent && recentSearches.length > 0 ? (
          // Recent Searches
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent searches
            </h2>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50"
                >
                  <button
                    className="flex items-center flex-1"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <Clock className="text-gray-400 mr-3" size={20} />
                    <span className="text-gray-700">{search}</span>
                  </button>
                  <button
                    onClick={() => removeRecentSearch(search)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : searchResults.length > 0 ? (
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
        ) : searchQuery && !showRecent ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-base text-gray-600">No results found</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};