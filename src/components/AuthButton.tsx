import React, { ReactNode } from 'react';

interface AuthButtonProps {
  icon: ReactNode;
  text: string;
  primary?: boolean;
  onClick: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ icon, text, primary = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center w-full h-12 rounded-full
        transition-all duration-300 ease-in-out
        ${primary 
          ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]' 
          : 'bg-white text-[#7C3AED] border border-[#7C3AED] hover:bg-gray-50'
        }
      `}
    >
      <span className="mr-2">{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default AuthButton;