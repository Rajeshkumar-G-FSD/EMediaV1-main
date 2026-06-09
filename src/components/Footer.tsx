import React from 'react';
import { Phone, Mail, Globe, MapPin, Printer, Copy, Navigation } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const address = 'No. 183, Near Parimalam Mahal, 5th Street, 3rd Cross Sakthi Nager, Thindal, Erode-638012, Tamil Nadu';
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(address);
  };

  return (
    <footer className="bg-[#EAF1F1] pt-16 pb-8 relative overflow-hidden" id="site-footer">
      
      {/* Curved Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[40px]"
          data-name="Layer 1"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="fill-white" d="M1200 120L0 16.48V120h1200z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col items-center">
        
        {/* Footer Logo of Circular Frame */}
        <button
          onClick={() => onNavClick('hero')}
          className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden flex items-center justify-center bg-[#EAF1F1] mb-6 hover:scale-105 transition cursor-pointer"
          id="footer-logo-btn"
          aria-label="Go to EMedia home"
        >
          <img
            src="/images/emedia_round.png"
            alt="EMedia"
            className="h-full w-full object-cover"
          />
        </button>

        {/* Info grid lines */}
        <div className="flex flex-wrap md:flex-nowrap justify-between w-full border-t border-b border-primary/20 py-8 mb-6 gap-8 text-sm text-gray-600">
          
          {/* Column 1: Hotline */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start justify-center">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Consultation hotline</span>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary fill-current" />
              <span className="text-xl md:text-2xl text-primary font-bold">+91 95668 94134</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Open 24 Hrs, all days</p>
          </div>

          {/* Column 2: Exact Address Details */}
          <div className="w-full md:w-1/3 text-center text-xs space-y-1.5 border-y md:border-y-0 md:border-x border-primary/20 py-4 md:py-0 px-4">
            <p className="font-bold text-base text-primary uppercase font-elegant tracking-wide">EMedia Event Decoration Services</p>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Address</p>
            <p className="flex items-start justify-center gap-1.5 leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{address}</span>
            </p>
            <p className="flex items-center justify-center gap-2 pt-1">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1 text-gray-500 hover:text-primary font-bold cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
            </p>
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider">
              TUE (Today) Open 24 Hrs · WED Open 24 Hrs · THU Open 24 Hrs
            </p>
            <p className="flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-primary" />
                +91 95668 94134
              </span>
              <span className="flex items-center gap-1">
                <Printer className="w-3 h-3 text-primary" />
                Open 24 Hrs
              </span>
            </p>
            <p className="flex items-center justify-center gap-1.5 text-primary font-semibold font-mono">
              <Mail className="w-3.5 h-3.5" />
              emediaerode@gmail.com
            </p>
            <p className="flex items-center justify-center gap-1.5 text-primary font-semibold font-mono">
              <Globe className="w-3.5 h-3.5" />
              www.emediaevents.com
            </p>
          </div>

          {/* Column 3: Follow links */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-end justify-center">
            <span className="text-xs text-gray-500 mb-2">Follow us</span>
            <div className="flex gap-2">
              {/* Facebook Icon */}
              <a
                href="#"
                className="w-8 h-8 bg-primary hover:bg-opacity-90 text-white flex items-center justify-center rounded transition"
                aria-label="Facebook Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              {/* Call Icon */}
              <a
                href="tel:+919566894134"
                className="w-8 h-8 bg-primary hover:bg-opacity-90 text-white flex items-center justify-center rounded transition"
                aria-label="Call Directly"
              >
                <Phone className="w-4 h-4" />
              </a>
              {/* YouTube Icon */}
              <a
                href="#"
                className="w-8 h-8 bg-primary hover:bg-opacity-90 text-white flex items-center justify-center rounded transition"
                aria-label="YouTube Channel"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copywrite lines and branding */}
        <div className="text-[11px] text-gray-400 text-center w-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
          <span>EMedia Event Decoration Services © 2020</span>
          <span className="hidden sm:inline">|</span>
          <span>Designed by Zenners. Powered by CircleWeb</span>
        </div>
      </div>
    </footer>
  );
}
