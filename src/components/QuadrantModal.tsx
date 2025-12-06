import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface QuadrantModalProps {
  isOpen: boolean;
  onClose: () => void;
  mainImage: string;
  variants: string[];
  onImageClick: (image: string) => void;
}

const QuadrantModal = ({ isOpen, onClose, mainImage, variants, onImageClick }: QuadrantModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 bg-background border-border overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-5 w-5 text-foreground" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="grid grid-cols-2 gap-2 p-2 overflow-y-auto">
          {/* Main image - top left */}
          <div 
            className="relative aspect-square cursor-pointer group overflow-hidden rounded-sm"
            onClick={() => onImageClick(mainImage)}
          >
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          
          {/* Variants */}
          {variants.map((variant, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer group overflow-hidden rounded-sm"
              onClick={() => onImageClick(variant)}
            >
              <img
                src={variant}
                alt={`Variant ${index + 2}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuadrantModal;
