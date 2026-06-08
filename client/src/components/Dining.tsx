import { motion } from 'framer-motion';

export default function Dining() {
  return (
    <section id="dining" className="section bg-gradient-to-b from-sand to-sand-light">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031206766/Du26soTahFLgrXps9ctyjw/vela-dining-fqgZrD8BpDGWUGqjZ8g3ah.webp"
              alt="Fine Dining"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <p className="text-amber-700 text-sm font-semibold tracking-widest uppercase mb-4">
              Culinary Artistry
            </p>
            <h2 className="text-slate-900 mb-6">World-Class Dining</h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Indulge in exquisite culinary experiences crafted by our award-winning chefs. From fresh seafood caught daily to international delicacies, every meal is a celebration of flavors.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                'Beachfront dining pavilion with sunset views',
                'Fresh daily catch prepared with international techniques',
                'Wine selection from the finest vineyards worldwide',
                'Private dining experiences available',
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-amber-700 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-600">{feature}</p>
                </div>
              ))}
            </div>

            <button className="px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-sm transition-all duration-300 hover:scale-105">
              Reserve a Table
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
