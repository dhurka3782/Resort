import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const navItems = [
    { label: 'Villas', href: '#villas' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Dining', href: '#dining' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/92 dark:bg-[#07111E]/95 backdrop-blur-lg border-b border-amber-100/60 dark:border-amber-600/15 transition-smooth shadow-sm dark:shadow-[0_1px_20px_rgba(0,0,0,0.4)]">
      <div className="container flex items-center justify-between py-3 md:py-4">

        {/* Logo */}
        <a
          href="#"
          className="text-xl md:text-2xl font-bold text-amber-700 dark:text-amber-400 tracking-widest transition-colors duration-300"
        >
          VELA
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-700 dark:text-amber-100/75 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-300 tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Right: Theme Toggle + Book Now */}
        <div className="hidden md:flex items-center gap-2">

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 text-slate-500 dark:text-amber-400/80 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/25 border border-transparent hover:border-amber-200/80 dark:hover:border-amber-700/40"
          >
            <span className="transition-all duration-300 group-hover:scale-110">
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </span>
          </button>

          {/* Divider */}
          <span className="w-px h-5 bg-amber-200/60 dark:bg-amber-700/30 mx-1" />

          {/* Book Now */}
          <button className="px-6 py-2 bg-amber-700 dark:bg-amber-600 text-white rounded-sm text-sm font-semibold hover:bg-amber-800 dark:hover:bg-amber-500 transition-colors duration-300 tracking-wide shadow-sm dark:shadow-amber-900/30">
            Book Now
          </button>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-amber-400/80 hover:bg-amber-50 dark:hover:bg-amber-900/25 transition-all duration-300"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex items-center justify-center"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700 dark:text-amber-200" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700 dark:text-amber-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/98 dark:bg-[#07111E]/98 border-t border-amber-100/60 dark:border-amber-700/20 animate-fadeIn">
          <div className="container py-5 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-700 dark:text-amber-100/75 hover:text-amber-700 dark:hover:text-amber-400 transition-colors py-1 border-b border-amber-50 dark:border-amber-900/20 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full mt-1 px-4 py-2.5 bg-amber-700 dark:bg-amber-600 text-white rounded-sm text-sm font-semibold hover:bg-amber-800 dark:hover:bg-amber-500 transition-colors tracking-wide">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
