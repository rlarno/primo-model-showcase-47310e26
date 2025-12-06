import { useState } from 'react';
import FloatingGallery from '@/components/FloatingGallery';
import PhotoCarousel from '@/components/PhotoCarousel';
import QuadrantModal from '@/components/QuadrantModal';
import FullScreenViewer from '@/components/FullScreenViewer';

// Import images
import heroPortrait from '@/assets/_DSF0159.jpg';

// Floating gallery images
import gallery1 from '@/assets/_DSF0199.jpg';
import gallery2 from '@/assets/_DSF0130.jpg';
import gallery3 from '@/assets/_DSF0170.jpg';
import gallery4 from '@/assets/_DSF0108.jpg';
import gallery5 from '@/assets/_DSF0235.jpg';

// Carousel images
const carouselImageFiles = [
  '_DSF0102.jpg',
  '_DSF0108.jpg',
  '_DSF0135.jpg',
  '_DSF0130.jpg',
  '_DSF0151.jpg',
  '_DSF0159.jpg',
  '_DSF0170.jpg',
  '_DSF0181.jpg',
  '_DSF0199.jpg',
  '_DSF0220.jpg',
  '_DSF0229.jpg',
  '_DSF0235.jpg'
];

const carouselImages = carouselImageFiles.map(filename => 
  require(`@/assets/${filename}`)
);

const Index = () => {
  const [quadrantModalOpen, setQuadrantModalOpen] = useState(false);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [currentVariants, setCurrentVariants] = useState<string[]>([]);

  const floatingImages = [gallery1, gallery2, gallery3, gallery4, gallery5];

  
  // All images combined for indexing
  const allImages = [...floatingImages, ...carouselImages];

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
