import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

interface Villa {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  amenities: string[];
}

const villas: Villa[] = [
  {
    id: 1,
    name: 'Overwater Bungalow',
    description: 'Direct ocean access with private infinity pool and glass floor for marine viewing',
    price: '$1,200',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-villa-1-L2LUAd5JJ6thHwCXTdMjYz.webp',
    amenities: ['Private Pool', 'Ocean View', 'Glass Floor', 'Spa Bath'],
  },
  {
    id: 2,
    name: 'Beach Villa',
    description: 'Pristine beachfront sanctuary with direct sand access and sunset views',
    price: '$950',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-villa-2-kvKgmrFF8dcAvJi9PBcHmY.webp',
    amenities: ['Beach Access', 'Sunset View', 'Outdoor Shower', 'Fire Pit'],
  },
  {
    id: 3,
    name: 'Presidential Suite',
    description: 'Ultimate luxury with multi-level design, private spa, and 360° views',
    price: '$2,500',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-villa-1-L2LUAd5JJ6thHwCXTdMjYz.webp',
    amenities: ['Private Spa', '360° View', 'Chef Service', 'Helipad Access'],
  },
];

export default function Villas() {
  return (
    <section id="villas" className="section bg-gradient-to-b from-sand to-sand-light dark:from-[#07111E] dark:to-[#0A1A2E]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 animate-fadeInUp">
          <p className="text-amber-700 dark:text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
            Accommodations
          </p>
          <h2 className="text-slate-900 dark:text-[#F2EAD6] mb-4 md:mb-6 text-3xl md:text-5xl">Our Villas</h2>
          <p className="text-slate-600 dark:text-[#8A9AB0] text-base md:text-lg max-w-2xl mx-auto">
            Each villa is a masterpiece of design and comfort, offering unparalleled privacy and luxury
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-16" />

        {/* Villas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {villas.map((villa, index) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <TiltCard className="h-full">
                <div className="bg-white dark:bg-[#0D1F30] rounded-lg overflow-hidden shadow-lg dark:shadow-black/40 hover-lift transition-all duration-300 h-full flex flex-col border border-transparent dark:border-amber-900/20">
                  {/* Image */}
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img
                      src={villa.image}
                      alt={villa.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-amber-700 dark:bg-amber-600 text-white px-4 py-2 rounded-sm font-semibold shadow-md">
                      {villa.price}/night
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="text-slate-900 dark:text-[#F2EAD6] mb-3">{villa.name}</h3>
                    <p className="text-slate-600 dark:text-[#8A9AB0] text-sm mb-6 leading-relaxed flex-1">{villa.description}</p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {villa.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/25 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-800/30"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="w-full py-3 border-2 border-amber-700 dark:border-amber-600 text-amber-700 dark:text-amber-400 font-semibold rounded-sm hover:bg-amber-700 dark:hover:bg-amber-600 hover:text-white transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
