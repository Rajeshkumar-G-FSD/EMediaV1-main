import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

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
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs" id="site-header">
      <div className="container mx-auto px-4 max-w-6xl">
        <nav className="flex items-center justify-between py-4 md:py-6 relative" id="header-nav">
          
          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-primary focus:outline-none cursor-pointer"
            id="mobile-nav-toggle"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Left Nav (Desktop) */}
          <ul className="hidden md:flex items-center space-x-6 text-xs uppercase font-bold tracking-wider text-gray-500 w-5/12">
            {leftNavItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`transition-colors py-1 cursor-pointer font-sans leading-none ${
                    activeSection === item.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'hover:text-primary text-gray-500 font-bold'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Logo Center (Floating) */}
          <div className="flex-shrink-0 mx-auto md:mx-0 relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
            <button
              onClick={() => handleItemClick('hero')}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-primary overflow-hidden flex items-center justify-center bg-white shadow-md relative hover:scale-105 transition cursor-pointer"
              id="logo-button"
              aria-label="Go to EMedia home"
            >
              <img
                src="/images/emedia_round.png"
                alt="EMedia"
                className="h-full w-full object-cover"
              />
            </button>
          </div>

          {/* Right Nav (Desktop) */}
          <ul className="hidden md:flex items-center justify-end space-x-6 text-xs uppercase font-bold tracking-wider text-gray-500 w-5/12">
            {rightNavItems.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`transition-colors py-1 cursor-pointer font-sans leading-none flex items-center gap-1.5 ${
                    activeSection === item.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'hover:text-primary text-gray-500 font-bold'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.id === 'appointments' && hasInquiries && (
                    <span className="absolute -top-1 -right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  )}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Right Notification Icon when menu is closed */}
          {!isOpen && hasInquiries && (
            <button
              onClick={() => handleItemClick('appointments')}
              className="md:hidden p-2 text-primary hover:text-opacity-80 relative cursor-pointer"
              aria-label="View Appointments"
            >
              <Calendar className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-md" id="mobile-menu-panel">
          <ul className="space-y-3 text-sm uppercase font-bold tracking-wider">
            {[...leftNavItems, ...rightNavItems].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary/5 text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
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
        </div>
      )}
    </header>
  );
}
