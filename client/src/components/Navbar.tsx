import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Villas', href: '#villas' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Dining', href: '#dining' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-amber-100/50 transition-smooth shadow-sm">
      <div className="container flex items-center justify-between py-3 md:py-4">
        {/* Logo */}
        <a href="#" className="text-xl md:text-2xl font-bold text-amber-700 tracking-widest">
          VELA
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover-gold transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="px-6 py-2 bg-amber-700 text-white rounded-sm text-sm font-semibold hover:bg-amber-800 transition-colors duration-300">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-slate-700" />
          ) : (
            <Menu className="w-6 h-6 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-amber-100 animate-fadeIn">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-amber-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full px-4 py-2 bg-amber-700 text-white rounded-sm text-sm font-semibold hover:bg-amber-800 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
