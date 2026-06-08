import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { modalBackdrop, modalContent } from '@/lib/animations';

interface LightboxImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function ImageLightbox({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') onClose();
  };

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Main Content */}
          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full h-full max-w-6xl flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <motion.img
              key={currentImage.id}
              src={currentImage.src}
              alt={currentImage.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={goToPrevious}
                  className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={goToNext}
                  className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </>
            )}

            {/* Image Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
            >
              <p className="text-white text-lg font-semibold">{currentImage.title}</p>
              <p className="text-white/70 text-sm">
                {currentIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/50 p-4 rounded-lg backdrop-blur-md"
            >
              {images.map((img, idx) => (
                <motion.button
                  key={img.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    idx === currentIndex
                      ? 'ring-2 ring-amber-400 scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
