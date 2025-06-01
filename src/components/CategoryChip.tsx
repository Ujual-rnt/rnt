import React, { ReactNode } from 'react';

interface CategoryChipProps {
  label: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ label, icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        h-8 px-3 rounded-full text-sm font-medium transition-all duration-200
        flex items-center gap-2
        ${selected 
          ? 'bg-white text-[#7C3AED]' 
          : 'bg-transparent text-white/70 border border-white/70'
        }
      `}
    >
      <span className={`${selected ? 'text-[#7C3AED]' : 'text-white/70'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
};

export default CategoryChip;