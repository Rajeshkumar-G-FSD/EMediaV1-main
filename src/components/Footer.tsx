import { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Copy, Navigation, Clock, Facebook, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal.tsx';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const address = 'No. 183, Near Parimalam Mahal, 5th Street, 3rd Cross Sakthi Nager, Thindal, Erode-638012, Tamil Nadu';
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer className="bg-[#EAF1F1] pt-20 pb-8 relative overflow-hidden" id="site-footer" data-no-text-reveal>

      {/* Curved Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[40px]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="fill-white" d="M1200 120L0 16.48V120h1200z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col items-center">

        {/* Logo */}
        <ScrollReveal direction="up" duration={0.6}>
          <button
            onClick={() => onNavClick('hero')}
            className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden flex items-center justify-center bg-[#EAF1F1] mb-8 hover:scale-105 transition cursor-pointer"
            id="footer-logo-btn"
            aria-label="Go to EMedia home"
          >
            <img src="/images/emedia_round.png" alt="EMedia" className="h-full w-full object-cover" />
          </button>
        </ScrollReveal>

        {/* Main info grid */}
        <div className="w-full border-t border-b border-primary/20 py-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-start">

            {/* Column 1: Hotline */}
            <ScrollReveal direction="right" delay={0.1} className="flex flex-col items-center text-center space-y-3">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gray-400 font-bold">
                Consultation hotline
              </span>
              <a href="tel:+919566894134" className="group flex items-center gap-3 text-primary">
                <span className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </span>
                <span className="text-2xl md:text-3xl font-bold tracking-wide">+91 95668 94134</span>
              </a>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/10">
                <Clock className="w-3.5 h-3.5" />
                Open 24 Hrs, all days
              </div>
              <div className="flex flex-col items-center gap-1.5 pt-1 text-sm">
                <a href="tel:+919566894134" className="flex items-center gap-1.5 text-gray-600 hover:text-primary font-semibold transition">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  +91 95668 94134
                </a>
                <a href="mailto:emediaerode@gmail.com" className="flex items-center gap-1.5 text-primary font-semibold font-mono hover:underline transition">
                  <Mail className="w-3.5 h-3.5" />
                  emediaerode@gmail.com
                </a>
                <p className="flex items-center gap-1.5 text-primary font-semibold font-mono">
                  <Globe className="w-3.5 h-3.5" />
                  www.emediaevents.com
                </p>
              </div>
            </ScrollReveal>

            {/* Column 2: Address */}
            <ScrollReveal direction="up" delay={0.2} className="flex flex-col items-center text-center space-y-4">
              <div>
                <p className="font-bold text-xl md:text-2xl text-primary uppercase font-elegant tracking-wide leading-tight">
                  EMedia Event Decoration Services
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-gray-400 font-bold">Address</p>
              </div>
              <p className="flex items-start justify-center gap-2 leading-relaxed text-sm text-gray-600 max-w-xs">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary text-white px-4 py-2 text-xs font-bold hover:bg-opacity-90 transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Directions
                </a>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-primary/15 px-4 py-2 text-xs text-primary hover:bg-white font-bold cursor-pointer transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy address'}
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                {['Mon–Sun: Open 24 Hrs', 'All Holidays: Open', 'Emergency: Available'].map(label => (
                  <span key={label} className="rounded-full bg-white/70 px-3 py-1.5 border border-primary/10 whitespace-nowrap">
                    {label}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Column 3: Social + tagline */}
            <ScrollReveal direction="left" delay={0.1} className="flex flex-col items-center text-center space-y-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gray-400 font-bold">
                Follow us
              </span>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-11 h-11 bg-primary hover:bg-opacity-90 text-white flex items-center justify-center rounded-lg transition shadow-sm"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="tel:+919566894134"
                  className="w-11 h-11 bg-primary hover:bg-opacity-90 text-white flex items-center justify-center rounded-lg transition shadow-sm"
                  aria-label="Call Directly"
                >
                  <Phone className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-11 h-11 bg-primary hover:bg-opacity-90 text-white flex items-center justify-center rounded-lg transition shadow-sm"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-5 h-5" />
                </motion.a>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                Decoration concepts, quick quotes, and event setup support are available anytime.
              </p>
              <div className="mt-2 space-y-1 text-[11px] text-gray-400 text-center">
                <p className="font-bold uppercase tracking-widest text-primary/60">Serving since 2020</p>
                <p>Birthdays · Weddings · Offices · Ceremonies</p>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] text-gray-400 text-center w-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4"
        >
          <span>EMedia Event Decoration Services © 2020–{new Date().getFullYear()}</span>
          <span className="hidden sm:inline text-primary/30">|</span>
          <span>Designed by Zenners. Powered by CircleWeb</span>
        </motion.div>

      </div>
    </footer>
  );
}
