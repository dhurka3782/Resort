import { motion } from 'framer-motion';
import { Waves, Utensils, Droplet } from 'lucide-react';

interface Experience {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    icon: <Waves className="w-8 h-8" />,
    title: 'Water Activities',
    description: 'Snorkeling, diving, and sunset cruises in crystal-clear waters. Explore vibrant coral reefs and encounter exotic marine life.',
  },
  {
    id: 2,
    icon: <Utensils className="w-8 h-8" />,
    title: 'Culinary Excellence',
    description: 'World-class dining experiences featuring fresh seafood and international cuisine prepared by award-winning chefs.',
  },
  {
    id: 3,
    icon: <Droplet className="w-8 h-8" />,
    title: 'Wellness & Spa',
    description: 'Rejuvenate with traditional Maldivian treatments and modern wellness therapies overlooking the ocean.',
  },
];

export default function Experiences() {
  return (
    <section id="experiences" className="section bg-white dark:bg-[#07111E]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 animate-fadeInUp">
          <p className="text-amber-700 dark:text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
            Unforgettable Moments
          </p>
          <h2 className="text-slate-900 dark:text-[#F2EAD6] mb-4 md:mb-6 text-3xl md:text-5xl">Curated Experiences</h2>
          <p className="text-slate-600 dark:text-[#8A9AB0] text-base md:text-lg max-w-2xl mx-auto">
            Immerse yourself in authentic luxury with our carefully curated selection of activities and services
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-16" />

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/25 rounded-lg flex items-center justify-center text-amber-700 dark:text-amber-400 hover-lift transition-all duration-300 border border-amber-100 dark:border-amber-800/30 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40">
                  {exp.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-slate-900 dark:text-[#F2EAD6] mb-4 text-2xl">{exp.title}</h3>
              <p className="text-slate-600 dark:text-[#8A9AB0] leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-amber-700 dark:bg-amber-600 hover:bg-amber-800 dark:hover:bg-amber-500 text-white font-semibold rounded-sm transition-all duration-300 hover:scale-105">
            Explore All Experiences
          </button>
        </div>
      </div>
    </section>
  );
}
