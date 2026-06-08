import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-hero-oENv4NqTU7K22D584s7VpJ.webp)',
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center justify-center text-center h-full pt-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8 animate-fadeInUp">
          {/* Tagline */}
          <p className="text-amber-200 text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 md:mb-6">
            Luxury Redefined
          </p>

          {/* Main Heading */}
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 text-balance">
            Vela Resort
          </h1>

          {/* Subheading */}
          <p className="text-white/80 text-base md:text-lg lg:text-xl font-light mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of tropical luxury in the heart of the Maldives
          </p>

          {/* CTA Button */}
          <button className="px-6 md:px-10 py-3 md:py-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-sm transition-all duration-300 hover:scale-105 mb-12 md:mb-16 text-sm md:text-base">
            Discover Your Paradise
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/70" />
        </div>
      </div>
    </section>
  );
}
