import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alexandra Sterling',
    title: 'Luxury Travel Influencer',
    quote: 'Vela Resort redefined my understanding of luxury. Every detail, from the architecture to the service, speaks of excellence and thoughtfulness.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Mitchell',
    title: 'CEO, Global Ventures',
    quote: 'The perfect escape for discerning travelers. The privacy, the service, and the natural beauty create an unforgettable experience.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophia Laurent',
    title: 'Fashion Designer',
    quote: 'A sanctuary of elegance and tranquility. Vela Resort is where I find inspiration and peace away from the bustling world.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section bg-gradient-to-b from-sand to-sand-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 animate-fadeInUp">
          <p className="text-amber-700 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
            Guest Stories
          </p>
          <h2 className="text-slate-900 mb-4 md:mb-6 text-3xl md:text-5xl">Testimonials</h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            Hear from our distinguished guests about their unforgettable experiences
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-16" />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-lg hover-lift transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 text-lg mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-amber-100 pt-6">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-amber-700 text-sm">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
