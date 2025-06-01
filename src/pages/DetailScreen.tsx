import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Bed, Home, Bath } from 'lucide-react';
import { properties } from '../data/properties';
import ImageCarousel from '../components/ImageCarousel';

export const DetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === Number(id));
  
  if (!property) {
    return <div>Property not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Image Carousel */}
      <div className="relative h-[50vh]">
        <ImageCarousel images={property.gallery || [property.image]} />
        
        {/* Navigation buttons */}
        <div className="absolute top-10 left-6 z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
        </div>
        
        <div className="absolute top-10 right-6 z-10">
          <button className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full">
            <Heart className="text-white" size={24} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative -mt-6 flex-1 bg-white rounded-t-[24px] px-6 pt-6 pb-20">
        {/* Drag handle */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>
        
        {/* Discount badge */}
        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
          –40% <span className="line-through">${property.originalPrice}</span> → ${property.price}
        </div>
        
        {/* Title and rating */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
          <div className="flex items-center mt-1">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-gray-700">{property.rating}</span>
            <span className="text-gray-500 ml-1">({property.reviewCount} reviews)</span>
          </div>
        </div>
        
        {/* Features */}
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Bed className="text-[#7C3AED] mr-2" size={20} />
            <div>
              <p className="text-sm text-gray-500">Bedrooms</p>
              <p className="font-medium">{property.bedrooms}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Home className="text-[#7C3AED] mr-2" size={20} />
            <div>
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-medium">{property.area} sqft</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Bath className="text-[#7C3AED] mr-2" size={20} />
            <div>
              <p className="text-sm text-gray-500">Bathrooms</p>
              <p className="font-medium">{property.bathrooms}</p>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="py-4">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-gray-700">{property.description}</p>
        </div>
        
        {/* Gallery */}
        <div className="py-4">
          <h2 className="text-xl font-bold mb-2">Gallery</h2>
          <div className="flex overflow-x-auto gap-3 pb-2">
            {property.gallery?.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Gallery ${index + 1}`} 
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#7C3AED] flex justify-between items-center px-6 z-40">
        <div className="text-white">
          <p className="text-sm opacity-80">Total price</p>
          <p className="text-xl font-bold">${property.price}</p>
        </div>
        
        <button className="bg-white text-[#7C3AED] font-bold py-3 px-8 rounded-2xl">
          Book Now
        </button>
      </div>
    </div>
  );
};