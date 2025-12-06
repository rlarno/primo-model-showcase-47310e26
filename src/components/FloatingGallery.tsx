import { useState } from 'react';

interface FloatingGalleryProps {
  images: string[];
  onImageClick: (image: string) => void;
}

const FloatingGallery = ({ images, onImageClick }: FloatingGalleryProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer ${
                index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'
              }`}
              style={{
                animationDelay: `${index * 0.3}s`,
              }}
              onClick={() => onImageClick(image)}
            >
              <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-card">
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FloatingGallery;
