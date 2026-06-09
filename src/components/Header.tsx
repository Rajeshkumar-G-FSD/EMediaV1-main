import { useState } from 'react';
import { Menu, X, Calendar, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  hasInquiries: boolean;
}

export default function Header({ onNavClick, activeSection, hasInquiries }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const leftNavItems = [
    { id: 'introduction', label: 'Wedding Decor' },
    { id: 'services', label: 'Event Styling' },
    { id: 'products', label: 'Decor Items' },
  ];

  const rightNavItems = [
    { id: 'customers', label: 'Gallery' },
    { id: 'blog', label: 'Planning Tips' },
    { id: 'calculator', label: 'Decor Quote' },
    { id: 'appointments', label: 'Book Event' },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-white sticky top-0 z-40 shadow-sm border-b border-gray-100" id="site-header">

      {/* Top accent bar with Google Review badge */}
      <div className="bg-primary/5 border-b border-primary/10 py-1 px-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between text-[11px] text-gray-500">
          <span className="hidden sm:block font-medium">
            📞 +91 95668 94134 &nbsp;·&nbsp; Open 24 Hrs, all days
          </span>
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJ_EMediaErode"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-gray-700 hover:text-primary transition ml-auto"
            id="google-review-badge"
          >
            {/* Google logo */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-yellow-600 font-bold">4.9</span>
              <span className="text-gray-400 font-normal">Google Review</span>
            </span>
          </a>
        </div>
      </div>

      {/* Main nav row */}
      <div className="container mx-auto px-4 max-w-6xl">
        <nav className="flex items-center justify-between py-3 md:py-4 relative" id="header-nav">

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-primary focus:outline-none cursor-pointer"
            id="mobile-nav-toggle"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Left Nav */}
          <ul className="hidden md:flex items-center space-x-1 text-[11px] uppercase font-bold tracking-wider text-gray-500 w-5/12">
            {leftNavItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3 py-2 rounded-md transition-all cursor-pointer font-sans leading-none ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/8'
                      : 'hover:text-primary hover:bg-primary/5 text-gray-500'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <div className="flex-shrink-0 mx-auto md:mx-0 relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
            <button
              onClick={() => handleItemClick('hero')}
              className="w-14 h-14 md:w-18 md:h-18 rounded-full border-[3px] border-primary overflow-hidden flex items-center justify-center bg-white shadow-md hover:scale-105 transition cursor-pointer"
              id="logo-button"
              aria-label="Go to EMedia home"
            >
              <img src="/images/emedia_round.png" alt="EMedia" className="h-full w-full object-cover" />
            </button>
          </div>

          {/* Right Nav */}
          <ul className="hidden md:flex items-center justify-end space-x-1 text-[11px] uppercase font-bold tracking-wider text-gray-500 w-5/12">
            {rightNavItems.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3 py-2 rounded-md transition-all cursor-pointer font-sans leading-none flex items-center gap-1.5 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/8'
                      : 'hover:text-primary hover:bg-primary/5 text-gray-500'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.id === 'appointments' && hasInquiries && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                  )}
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile calendar icon */}
          {!isOpen && hasInquiries && (
            <button
              onClick={() => handleItemClick('appointments')}
              className="md:hidden p-2 text-primary hover:text-opacity-80 relative cursor-pointer"
              aria-label="View Appointments"
            >
              <Calendar className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            id="mobile-menu-panel"
          >
            <div className="px-4 py-4 space-y-1">
              <ul className="space-y-1 text-sm uppercase font-bold tracking-wider">
                {[...leftNavItems, ...rightNavItems].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors cursor-pointer ${
                        activeSection === item.id
                          ? 'bg-primary/8 text-primary'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`}
                      id={`mob-nav-item-${item.id}`}
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        {item.id === 'appointments' && hasInquiries && (
                          <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Google Review link in mobile menu */}
              <div className="pt-2 border-t border-gray-100">
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJ_EMediaErode"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-primary"
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
