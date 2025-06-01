import React from 'react';
import { Settings, Home, Building2, Info, Phone } from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'Rent', icon: Home },
    { label: 'Sell', icon: Building2 },
    { label: 'About', icon: Info },
    { label: 'Support', icon: Phone },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white transform transition-transform duration-300 ease-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Section */}
        <div className="h-[160px] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
            }}
          />
          <div className="absolute inset-0 bg-[#EDE4FE] bg-opacity-40" />
          <h1 className="absolute inset-0 flex items-center justify-center text-[28px] font-bold text-white drop-shadow-lg">
            Rent It
          </h1>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-6 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full h-14 px-4 rounded-2xl bg-[#F3E8FF] flex items-center
                  transition-colors duration-200 hover:bg-[#7C3AED]/10 active:bg-[#7C3AED]/20"
              >
                <Icon size={24} className="text-[#7C3AED] opacity-80" />
                <span className="ml-3 text-base font-bold text-[#7C3AED]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Settings Button */}
        <button
          className="absolute bottom-4 left-4 right-4 h-14 px-4 rounded-2xl
            flex items-center transition-colors duration-200
            hover:bg-[#7C3AED]/10 active:bg-[#7C3AED]/20"
        >
          <Settings size={24} className="text-[#7C3AED] opacity-70" />
          <span className="ml-3 text-base font-bold text-[#7C3AED] opacity-70">
            Settings
          </span>
        </button>
      </div>
    </>
  );
};

export default SideDrawer;