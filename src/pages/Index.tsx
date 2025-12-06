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

const portfolioImagesNames = [
  // Selected by BMA (and not used above)
  '_DSF0102-2.jpg',
  '_DSF0135.jpg',
  '_DSF0151-4.jpg',
  '_DSF0159-2.jpg',
  '_DSF0170-2.jpg',
  '_DSF0181-3.jpg',
  '_DSF0220-3.jpg',
  '_DSF0229-3.jpg',
  // Selected by Rudi
  '_DSF0240-4.jpg',
  '_DSF7872-2.jpg',
  '_DSF7861-4.jpg',
  '_DSF7857-3.jpg',
  '_DSF7864.jpg',
  ];

// Dynamically import all images from gallery folder for carousel
const imageModules = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' });
const allImages = Object.values(imageModules) as string[];

const Index = () => {
  const [quadrantModalOpen, setQuadrantModalOpen] = useState(false);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [currentVariants, setCurrentVariants] = useState<string[]>([]);

  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5];

  // Map portfolio image names to their full paths from allImages
  const getPortfolioImages = (imageNames: string[]): string[] => {
    return imageNames
      .map(name => allImages.find(imagePath => imagePath.includes(name)))
      .filter((img): img is string => img !== undefined);
  };

  const portfolioImages = getPortfolioImages(portfolioImagesNames);

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

  const handleImageClick = (image: string) => {
    const baseImage = getBaseImage(image);
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
      <FloatingGallery images={galleryImages} onImageClick={handleImageClick} />

      {/* Carousel Section */}
      <PhotoCarousel images={portfolioImages} onImageClick={handleImageClick} />

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12 tracking-wide">
            Get in Touch
          </h2>
          
          <div className="text-center space-y-8">
            {/* Email */}
            <div>
              <p className="text-muted-foreground mb-3 text-sm tracking-wide uppercase">Email</p>
              <a
                href="mailto:contact-loic@larno.be"
                className="text-xl md:text-2xl font-light text-foreground hover:text-primary transition-colors duration-300"
              >
                contact-loic@larno.be
              </a>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-muted-foreground mb-6 text-sm tracking-wide uppercase">Follow</p>
              <div className="flex justify-center gap-8">
                <a
                  href="https://belgiummodelagency.be/modellen-bekijken/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
                >
                  Belgium Model Agency
                </a>
                <a
                  href="https://inthepicture.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
                >
                  In The Picture
                </a>
                <a
                  href="https://www.figuratie.be/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
                >
                  Figuratie
                </a>
              </div>
              
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center bg-secondary/10">
        <p className="text-sm text-muted-foreground tracking-wide">
          © 2025-2026 Loïc Larno. All rights reserved. 
          <br/><a href="/privacy.html">Privacy Notice</a>
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
