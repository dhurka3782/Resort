import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ParallaxHero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effect: background moves slower than scroll
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-slate-900 flex items-center justify-center"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-hero-dCbPNaXvYJqKLmNvKpQrqL.webp"
          alt="Vela Resort Hero"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Parallax Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 md:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Luxury Redefined
        </motion.p>

        {/* Shiny Text Effect Applied Here */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight shiny-text"
          style={{
            // Luxury Gold (#d4af37) and White (#ffffff) Gradient
            backgroundImage: 'linear-gradient(110deg, #d4af37 0%, #ffffff 40%, #d4af37 60%)',
          }}
        >
          Vela Resort
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/90 text-lg md:text-2xl max-w-3xl mx-auto mb-8 font-light"
        >
          Experience the pinnacle of tropical luxury in the heart of the Maldives
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg transition-all duration-300"
        >
          Discover Your Paradise
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
}