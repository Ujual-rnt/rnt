import React, { useState, useRef } from 'react';
import { Bell, Search, Menu, Home, Bed, Building, Building2, Building as Buildings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryChip from '../components/CategoryChip';
import PropertyCard from '../components/PropertyCard';
import BottomNavigation from '../components/BottomNavigation';
import SideDrawer from '../components/SideDrawer';
import FloatingLabels from '../components/FloatingLabels';
import { properties } from '../data/properties';
import { Property } from '../types/property';

export const BrowseScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || 'All';
  });
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  
  const categories = [
    { label: 'All', icon: <Home size={20} />, value: 'All' },
    { label: 'PG', icon: <Bed size={20} />, value: 'pg' },
    { label: 'House', icon: <Building size={20} />, value: 'house' },
    { label: 'Apartment', icon: <Building2 size={20} />, value: 'apartment' },
    { label: 'Building', icon: <Buildings size={20} />, value: 'building' }
  ];
  
  React.useEffect(() => {
    setIsAnimating(true);
    
    const filtered = selectedCategory === 'All'
      ? properties
      : properties.filter(p => 
          p.property_type === selectedCategory.toLowerCase()
        );
    
    localStorage.setItem('selectedCategory', selectedCategory);
    
    setTimeout(() => {
      setFilteredProperties(filtered);
      setIsAnimating(false);
    }, 200);
  }, [selectedCategory]);
  
  return (
    <div className="min-h-screen bg-[#7C3AED] flex flex-col">
      {/* Top Bar */}
      <header className="pt-10 px-6 pb-4">
        <div className="flex items-center justify-between mb-8">
          <button 
            ref={hamburgerRef}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="text-white" size={24} />
          </button>
          <Bell className="text-white" size={24} />
        </div>
        <h1 className="text-lg md:text-2xl font-bold text-white">Find your best private space</h1>
      </header>
      
      {/* Floating Labels */}
      <FloatingLabels hamburgerRef={hamburgerRef} />
      
      {/* Search Input */}
      <div className="px-6 mb-4">
        <div 
          className="relative cursor-pointer"
          onClick={() => navigate('/search')}
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <div className="w-full h-12 pl-12 pr-4 rounded-full bg-white text-gray-400 flex items-center">
            Search your space
          </div>
        </div>
      </div>
      
      {/* Category Chips */}
      <div className="px-6 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <CategoryChip
              key={category.label}
              label={category.label}
              icon={category.icon}
              selected={category.label === selectedCategory}
              onClick={() => setSelectedCategory(category.label)}
            />
          ))}
        </div>
      </div>
      
      {/* Listings */}
      <div className="flex-1 bg-white rounded-t-[24px] px-6 py-6 overflow-y-auto">
        <div 
          className={`space-y-4 pb-20 transition-opacity duration-200 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Link to={`/detail/${property.id}`} key={property.id}>
                <PropertyCard property={property} />
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center pt-20">
              {selectedCategory === 'PG' ? (
                <Bed className="text-[#7C3AED] opacity-50 mb-4" size={48} />
              ) : (
                <Home className="text-[#7C3AED] opacity-50 mb-4" size={48} />
              )}
              <p className="text-base text-gray-600">No listings found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Side Drawer */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};