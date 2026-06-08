import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold text-amber-400 mb-4">VELA</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience the epitome of luxury in the Maldives. Where paradise meets perfection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#villas" className="hover:text-amber-400 transition-colors">Villas</a></li>
              <li><a href="#experiences" className="hover:text-amber-400 transition-colors">Experiences</a></li>
              <li><a href="#dining" className="hover:text-amber-400 transition-colors">Dining</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                +960 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                hello@velaresort.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-1" />
                North Malé Atoll, Maldives
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs md:text-sm gap-4 md:gap-0">
          <p>&copy; 2026 Vela Resort. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6 flex-wrap justify-center md:justify-end">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
