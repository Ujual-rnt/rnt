import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Settings, 
  Star, 
  LogOut 
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = () => {
    setIsLoggingOut(true);
    // Add a slight delay for the fade-out animation
    setTimeout(() => {
      // Navigate to login screen
      navigate('/', { replace: true });
    }, 150);
  };
  
  const menuItems = [
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Profile Settings' },
    { icon: Star, label: 'Leave a Review' },
    { 
      icon: LogOut, 
      label: 'Logout',
      onClick: handleLogout 
    }
  ];

  return (
    <div 
      className={`min-h-screen bg-white transition-opacity duration-150 ${
        isLoggingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#7C3AED]"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-2xl font-semibold text-gray-800">
          Profile
        </h1>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center mt-6 mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-[#7C3AED] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          Sandeep Kumar
        </h2>
      </div>

      {/* Menu List */}
      <div className="px-6 space-y-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full h-14 px-4 bg-gray-100 rounded-2xl flex items-center
                transition-colors duration-200 hover:bg-[#7C3AED]/10 active:bg-[#7C3AED]/20"
            >
              <Icon size={24} className="text-[#7C3AED]" />
              <span className="ml-4 text-base text-gray-800">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Version */}
      <div className="mt-8 mb-20 text-center">
        <p className="text-xs text-gray-500">Version 1.0.0</p>
      </div>
    </div>
  );
};