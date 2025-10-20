import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface PhotoCarouselProps {
  images: string[];
  onImageClick: (imageIndex: number) => void;
}

const PhotoCarousel = ({ images, onImageClick }: PhotoCarouselProps) => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-12 tracking-wide">
          Portfolio
        </h2>
        
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div
                  className="cursor-pointer group"
                  onClick={() => onImageClick(index + 5)} // Offset by floating gallery count
                >
                  <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-card">
                    <img
                      src={image}
                      alt={`Carousel ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default PhotoCarousel;
