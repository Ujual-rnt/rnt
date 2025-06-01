import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Facebook } from 'lucide-react';
import AuthButton from '../components/AuthButton';

export const LoginScreen: React.FC = () => {
  return (
    <div className="h-screen w-full relative flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Overlay for text visibility */}
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-1/2 px-8">
        <h1 className="text-3xl font-bold text-white mb-2">Rent it</h1>
        <p className="text-base text-white opacity-60 text-center">
          The best place to find millions of home, apartment, office, apartment
        </p>
      </div>
      
      {/* Bottom Container with Blur */}
      <div className="relative z-20 h-1/2 mt-auto">
        <div 
          className="h-full bg-white bg-opacity-30 backdrop-blur-md rounded-t-[24px] px-6 py-8 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <AuthButton 
              icon={<Phone size={20} />}
              text="Continue with phone number"
              primary
              onClick={() => {}}
            />
            
            <AuthButton 
              icon={<img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-5 h-5" />}
              text="Login with Google"
              onClick={() => {}}
            />
            
            <AuthButton 
              icon={<Facebook size={20} />}
              text="Login with Facebook"
              onClick={() => {}}
            />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-white">
              Already have an account? {' '}
              <Link to="/browse" className="text-white underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};