import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageLightbox from './ImageLightbox';

interface GalleryImage {
  id: number;
  title: string;
  image: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: 'Overwater Villas',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-villa-1-L2LUAd5JJ6thHwCXTdMjYz.webp',
  },
  {
    id: 2,
    title: 'Aerial View',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-villa-2-kvKgmrFF8dcAvJi9PBcHmY.webp',
  },
  {
    id: 3,
    title: 'Fine Dining',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-dining-fqgZrD8BpDGWUGqjZ8g3ah.webp',
  },
  {
    id: 4,
    title: 'Spa & Wellness',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-spa-5gSxqu9KhYnnQ7fFbbGGJ9.webp',
  },
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="section bg-white dark:bg-[#07111E]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 animate-fadeInUp">
          <p className="text-amber-700 dark:text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
            Visual Journey
          </p>
          <h2 className="text-slate-900 dark:text-[#F2EAD6] mb-4 md:mb-6 text-3xl md:text-5xl">Gallery</h2>
          <p className="text-slate-600 dark:text-[#8A9AB0] text-base md:text-lg max-w-2xl mx-auto">
            Discover the breathtaking beauty of Vela Resort through our curated collection of moments
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-16" />

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-64 md:h-72 overflow-hidden rounded-lg shadow-lg dark:shadow-black/50 cursor-pointer ring-1 ring-transparent dark:ring-amber-900/20 dark:hover:ring-amber-700/40 transition-all duration-300"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={img.image}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold text-lg p-6">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={galleryImages.map((img) => ({
          id: img.id,
          src: img.image,
          alt: img.title,
          title: img.title,
        }))}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={selectedImageIndex}
      />
    </section>
  );
}
