import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface FullScreenViewerProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}

const FullScreenViewer = ({ isOpen, onClose, image }: FullScreenViewerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-6 w-6 text-white" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="flex items-center justify-center min-h-[95vh] p-4">
          <img
            src={image}
            alt="Full screen"
            className="max-w-full max-h-[90vh] object-contain animate-scale-in"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenViewer;
