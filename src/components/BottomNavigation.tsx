import React from 'react';
import { Home, Heart, Tag, MessageCircle, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: '/browse', label: 'Home' },
    { icon: Heart, path: '/favorites', label: 'Favorites' },
    { icon: Tag, path: '/deals', label: 'Deals' },
    { icon: MessageCircle, path: '/messages', label: 'Messages' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#7C3AED] flex justify-around items-center z-50">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={index} 
            to={item.path}
            className={`flex flex-col items-center transition-all duration-200 ${
              isActive ? 'text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;