import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentIndex 
              ? 'transform translate-x-0' 
              : index < currentIndex 
                ? 'transform -translate-x-full' 
                : 'transform translate-x-full'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-4' 
                : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Swipe instructions */}
      <div 
        className="absolute inset-0 grid grid-cols-2"
        aria-hidden="true"
      >
        <div 
          className="cursor-w-resize" 
          onClick={goToPrevious}
        />
        <div 
          className="cursor-e-resize" 
          onClick={goToNext}
        />
      </div>
    </div>
  );
};

export default ImageCarousel;