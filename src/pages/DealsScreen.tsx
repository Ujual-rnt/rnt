import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

export const DealsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#7C3AED] px-6 pt-10 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl text-white font-semibold">Special Deals</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 pb-24">
        <div className="flex flex-col items-center justify-center pt-20">
          <p className="text-base text-gray-600">Coming soon!</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};