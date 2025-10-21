import { useState } from 'react';
import FloatingGallery from '@/components/FloatingGallery';
import PhotoCarousel from '@/components/PhotoCarousel';
import QuadrantModal from '@/components/QuadrantModal';
import FullScreenViewer from '@/components/FullScreenViewer';

// Import images
import heroPortrait from '@/assets/hero-portrait.jpg';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import carousel1 from '@/assets/carousel-1.jpg';
import carousel2 from '@/assets/carousel-2.jpg';
import carousel3 from '@/assets/carousel-3.jpg';
import carousel4 from '@/assets/carousel-4.jpg';

const Index = () => {
  const [quadrantModalOpen, setQuadrantModalOpen] = useState(false);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [currentVariants, setCurrentVariants] = useState<string[]>([]);

  const floatingImages = [gallery1, gallery2, gallery3, gallery4, gallery5];
  const carouselImages = [carousel1, carousel2, carousel3, carousel4];
  
  // All images combined for indexing
  const allImages = [...floatingImages, ...carouselImages];

  // Generate variants for an image (simulating the _DSF9999-x pattern)
  const getImageVariants = (baseImage: string): string[] => {
    // In a real scenario, these would be different files following the pattern
    // For now, we'll use the same images to demonstrate the functionality
    return [baseImage, baseImage, baseImage];
  };

  const handleImageClick = (imageIndex: number) => {
    const baseImage = allImages[imageIndex];
    const variants = getImageVariants(baseImage);
    
    setSelectedImage(baseImage);
    setCurrentVariants(variants);
    setQuadrantModalOpen(true);
  };

  const handleQuadrantImageClick = (image: string) => {
    setQuadrantModalOpen(false);
    setSelectedImage(image);
    setFullScreenOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center animate-fade-in">
            <div className="relative mb-8">
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={heroPortrait}
                  alt="Portfolio headshot"
                  className="w-full mx-auto rounded-sm shadow-2xl"
                />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-foreground">
              Portfolio
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
              Fashion & Editorial Model
            </p>
          </div>
        </div>
      </section>

      {/* Floating Gallery Section */}
      <FloatingGallery images={floatingImages} onImageClick={handleImageClick} />

      {/* Carousel Section */}
      <PhotoCarousel images={carouselImages} onImageClick={handleImageClick} />

      {/* Footer */}
      <footer className="py-12 text-center bg-secondary/10">
        <p className="text-sm text-muted-foreground tracking-wide">
          © 2025 Portfolio. All rights reserved.
        </p>
      </footer>

      {/* Modals */}
      <QuadrantModal
        isOpen={quadrantModalOpen}
        onClose={() => setQuadrantModalOpen(false)}
        mainImage={selectedImage}
        variants={currentVariants}
        onImageClick={handleQuadrantImageClick}
      />

      <FullScreenViewer
        isOpen={fullScreenOpen}
        onClose={() => setFullScreenOpen(false)}
        image={selectedImage}
      />
    </div>
  );
};

export default Index;
