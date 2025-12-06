import { useState, useMemo } from 'react';
import FloatingGallery from '@/components/FloatingGallery';
import PhotoCarousel from '@/components/PhotoCarousel';
import QuadrantModal from '@/components/QuadrantModal';
import FullScreenViewer from '@/components/FullScreenViewer';

// Import hero image
import heroPortrait from '@/assets/_DSF0159-3.jpg';

// Floating gallery images (preselected)
import gallery1 from '@/assets/_DSF0199-2.jpg';
import gallery2 from '@/assets/_DSF0130-3.jpg';
import gallery3 from '@/assets/_DSF7847-4.jpg';
import gallery4 from '@/assets/_DSF0108-3.jpg';
import gallery5 from '@/assets/_DSF0235.jpg';

// Dynamically import all images from gallery folder for carousel
const carouselModules = import.meta.glob('@/assets/gallery/*.jpg', { eager: true, import: 'default' });
const carouselImages = Object.values(carouselModules) as string[];

const Index = () => {
  const [quadrantModalOpen, setQuadrantModalOpen] = useState(false);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [currentVariants, setCurrentVariants] = useState<string[]>([]);

  const floatingImages = [gallery1, gallery2, gallery3, gallery4, gallery5];

  
  // All images combined for indexing
  const allImages = [...floatingImages, ...carouselImages];

  // Strip variant suffix from image path to get base image
  const getBaseImage = (imagePath: string): string => {
    const lastDotIndex = imagePath.lastIndexOf('.');
    const basePath = imagePath.substring(0, lastDotIndex);
    const extension = imagePath.substring(lastDotIndex);
    
    // Remove -2, -3, -4 suffix if present
    const cleanBasePath = basePath.replace(/-[2-4]$/, '');
    return `${cleanBasePath}${extension}`;
  };

  // Generate variants for an image (simulating the _DSF9999-x pattern)
  const getImageVariants = (baseImage: string): string[] => {
    const lastDotIndex = baseImage.lastIndexOf('.');
    const basePath = baseImage.substring(0, lastDotIndex);
    const extension = baseImage.substring(lastDotIndex);
    return [
      `${basePath}-2${extension}`,
      `${basePath}-3${extension}`,
      `${basePath}-4${extension}`
    ];
  };

  const handleImageClick = (imageIndex: number) => {
    const clickedImage = allImages[imageIndex];
    const baseImage = getBaseImage(clickedImage);
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
              Loïc
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
          © 2025 Loïc Larno. All rights reserved.
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
