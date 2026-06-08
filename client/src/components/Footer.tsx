import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-[#040C16] text-white">
      <div className="container py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold text-amber-400 mb-4 tracking-widest">VELA</h3>
            <p className="text-gray-400 dark:text-[#6A7A8A] text-sm leading-relaxed">
              Experience the epitome of luxury in the Maldives. Where paradise meets perfection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Villas', 'Experiences', 'Dining', 'Gallery'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 dark:text-[#6A7A8A] hover:text-amber-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-widest uppercase">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400 dark:text-[#6A7A8A]">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                +960 123 4567
              </li>
              <li className="flex items-center gap-2 text-gray-400 dark:text-[#6A7A8A]">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                hello@velaresort.com
              </li>
              <li className="flex items-start gap-2 text-gray-400 dark:text-[#6A7A8A]">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                North Malé Atoll, Maldives
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-widest uppercase">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-amber-700 dark:bg-amber-800/60 hover:bg-amber-600 dark:hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors duration-200 border border-transparent dark:border-amber-700/30"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-[#4A5A6A] text-xs md:text-sm gap-4 md:gap-0">
          <p>&copy; 2026 Vela Resort. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6 flex-wrap justify-center md:justify-end">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="hover:text-amber-400 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
