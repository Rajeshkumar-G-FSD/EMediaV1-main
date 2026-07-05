import { useState } from 'react';
import { Menu, X, Calendar, Star, Heart, Sparkles, Tag, Camera, Calculator, Phone, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  hasInquiries: boolean;
}

const LEFT_NAV = [
  { id: 'introduction', label: 'Wedding Decor', icon: Heart },
  { id: 'services',     label: 'Event Styling', icon: Sparkles },
  { id: 'products',     label: 'Decor Items',   icon: Tag },
];

const RIGHT_NAV = [
  { id: 'customers',  label: 'Gallery',       icon: Camera },
  { id: 'about',      label: 'About Us',      icon: Info },
  { id: 'calculator', label: 'Decor Quote',   icon: Calculator },
];

const ALL_NAV = [...LEFT_NAV, ...RIGHT_NAV];

export default function Header({ onNavClick, activeSection, hasInquiries }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  const navBtnClass = (id: string) =>
    `relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10.5px] uppercase font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
      activeSection === id
        ? 'text-primary'
        : 'text-gray-500 hover:text-primary hover:bg-primary/5'
    }`;

  return (
    <header data-no-text-reveal className="w-full sticky top-0 z-40" id="site-header">

      {/* ── Accent top bar ── */}
      <div className="bg-primary px-4 py-1.5">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-white/90 font-medium">
            <Phone className="w-3 h-3 text-white/70 flex-shrink-0" />
            <span>+91 95668 94134</span>
            <span className="text-white/30 hidden sm:inline">·</span>
            <span className="hidden sm:inline">Open 24 Hrs, all days</span>
          </div>
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJ_EMediaErode"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-white/90 font-bold hover:text-white transition"
            id="google-review-badge"
          >
            <Star className="w-3 h-3 fill-yellow-300 text-yellow-300 flex-shrink-0" />
            <span className="text-yellow-200 font-bold">4.9</span>
            <span className="hidden sm:inline text-white/70 ml-0.5">Google Review</span>
          </a>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className="bg-white shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Desktop: split nav with centered logo */}
          <nav className="hidden md:flex items-center min-h-[64px] relative py-2" id="header-nav">

            {/* LEFT nav — right-aligned toward center */}
            <ul className="flex items-center flex-1 justify-end gap-0.5 pr-10">
              {LEFT_NAV.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => handleItemClick(id)}
                    className={navBtnClass(id)}
                    id={`nav-item-${id}`}
                  >
                    {activeSection === id && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 relative z-10 flex-shrink-0" />
                    <span className="relative z-10">{label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* CENTER logo — absolutely centered in nav */}
            <div className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <button
                onClick={() => handleItemClick('hero')}
                className="group flex flex-col items-center gap-1 cursor-pointer"
                id="logo-button"
                aria-label="Go to EMedia home"
              >
                <div className="relative">
<div className="w-20 h-20 rounded-full border-[3px] border-primary overflow-hidden bg-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/images/emediaevents_logo.png"
                      alt="EMedia"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <span className="font-elegant text-[10px] font-bold text-primary tracking-[0.2em] uppercase leading-none">
                  E Media
                </span>
              </button>
            </div>

            {/* RIGHT nav + Book Event — left-aligned toward center */}
            <ul className="flex items-center flex-1 justify-start gap-0.5 pl-10">
              {RIGHT_NAV.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => handleItemClick(id)}
                    className={navBtnClass(id)}
                    id={`nav-item-${id}`}
                  >
                    {activeSection === id && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 relative z-10 flex-shrink-0" />
                    <span className="relative z-10">{label}</span>
                  </button>
                </li>
              ))}

              {/* Book Event CTA */}
              <li className="ml-2">
                <button
                  onClick={() => handleItemClick('calculator')}
                  className="relative flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-[10.5px] font-bold uppercase tracking-wide rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap shadow-sm"
                  id="nav-item-book-event"
                >
                  {hasInquiries && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400" />
                    </span>
                  )}
                  <Calendar className="w-3.5 h-3.5" />
                  Book Event
                </button>
              </li>
            </ul>

          </nav>

          {/* Mobile nav bar */}
          <nav className="md:hidden flex items-center justify-between py-3">
            <button
              onClick={() => handleItemClick('hero')}
              className="flex items-center gap-2 cursor-pointer"
              aria-label="Home"
            >
              <div className="w-14 h-14 rounded-full border-2 border-primary overflow-hidden shadow-sm">
                <img src="/images/emediaevents_logo.png" alt="EMedia" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-elegant text-base font-bold text-primary">E Media</span>
                <span className="text-[8px] uppercase tracking-widest text-gray-400">Event Decor</span>
              </div>
            </button>

            <div className="flex items-center gap-1">
              {!isOpen && hasInquiries && (
                <button
                  onClick={() => handleItemClick('appointments')}
                  className="p-2 text-primary relative cursor-pointer"
                  aria-label="Appointments"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/5 transition cursor-pointer"
                id="mobile-nav-toggle"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

        </div>
      </div>

      {/* ── Mobile Menu Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden bg-white border-b border-gray-100 shadow-lg"
            id="mobile-menu-panel"
          >
            <div className="px-4 py-3 space-y-0.5">
              {ALL_NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleItemClick(id)}
                  className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl transition-colors cursor-pointer text-sm font-bold uppercase tracking-wide ${
                    activeSection === id
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                  id={`mob-nav-item-${id}`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}

              <button
                onClick={() => handleItemClick('calculator')}
                className="flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl cursor-pointer text-sm font-bold uppercase tracking-wide bg-primary text-white mt-1"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                Book Event
                {hasInquiries && (
                  <span className="ml-auto bg-yellow-400 text-primary text-[10px] px-2 py-0.5 rounded-full font-black">
                    New
                  </span>
                )}
              </button>

              <div className="pt-2 border-t border-gray-100 mt-1">
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJ_EMediaErode"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-500 hover:text-primary"
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Write a Google Review
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
