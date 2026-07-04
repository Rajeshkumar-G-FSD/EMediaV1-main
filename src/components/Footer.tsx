import { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Navigation, Facebook, Youtube, Instagram, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

const QUICK_LINKS = [
  { id: 'introduction', label: 'Wedding Decor' },
  { id: 'services',     label: 'Event Styling' },
  { id: 'products',     label: 'Decor Items' },
  { id: 'customers',   label: 'Gallery' },
  { id: 'calculator',  label: 'Get a Quote' },
  { id: 'appointments',label: 'Book Event' },
];

const SERVICES = [
  'Birthday Decoration',
  'Wedding Decoration',
  'Office Decoration',
  'Ceremony Setup',
  'Stage Decoration',
  'Balloon Decoration',
];

const SOCIAL = [
  { icon: Facebook,  label: 'Facebook',  href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube,   label: 'YouTube',   href: '#' },
  { icon: Phone,     label: 'Call Us',   href: 'tel:+919566894134' },
];

export default function Footer({ onNavClick }: FooterProps) {
  const address = '6th Street Corner, Sakthi Nagar, Sengodampallam, Thindal, Erode -638 012';
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer id="site-footer" data-no-text-reveal className="relative bg-[#0b2e2e]">

      {/* Wave transition: white section above curves into the dark footer */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-[calc(100%+1px)] h-[64px]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 C300,64 900,64 1200,0 L1200,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Main grid ─────────────────────────────────────── */}
        <div className="pt-24 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 border-b border-white/10">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="sm:col-span-2 lg:col-span-1 flex flex-col"
          >
            <button
              onClick={() => onNavClick('hero')}
              className="flex items-center gap-3 mb-5 group cursor-pointer w-fit"
              aria-label="Go to EMedia home"
            >
              <div className="w-18 h-18 rounded-full border-2 border-white/20 overflow-hidden flex-shrink-0 group-hover:border-white/50 transition-colors duration-300">
                <img src="/images/emediaevents_footre-logo.png" alt="EMedia" className="h-full w-full object-contain" />
              </div>
              <div className="text-left">
                <p className="font-elegant text-lg font-bold text-white leading-tight">EMedia Events</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/35 mt-0.5">Erode · Est. 2020</p>
              </div>
            </button>

            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-[230px]">
              Premium event decoration services in Erode. Birthdays, weddings, corporate events — crafted with elegance.
            </p>

            <div className="flex gap-2.5 mt-auto">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 hover:bg-white/15 hover:border-white/20 flex items-center justify-center transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-white/55" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigate column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/30 mb-5">Navigate</p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => onNavClick(id)}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/30 mb-5">Services</p>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => onNavClick('services')}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/30 mb-5">Get in Touch</p>
            <ul className="space-y-4">

              <li>
                <a href="tel:+919566894134" className="group flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-white/50" />
                  </span>
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold mb-0.5">Hotline</p>
                    <p className="text-sm text-white/70 group-hover:text-white transition-colors font-semibold">+91 95668 94134</p>
                    <p className="text-[10px] text-white/30 mt-0.5">Open 24 hrs, all days</p>
                  </div>
                </a>
              </li>

              <li>
                <a href="mailto:emediaerode@gmail.com" className="group flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-white/50" />
                  </span>
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold mb-0.5">Email</p>
                    <p className="text-sm text-white/70 group-hover:text-white transition-colors font-semibold break-all">emediaerode@gmail.com</p>
                  </div>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-white/50" />
                  </span>
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold mb-0.5">Address</p>
                    <p className="text-xs text-white/50 leading-relaxed">
                      6th Street Corner<br />
                      Sakthi Nagar, Sengodampallam, Thindal<br />
                      Erode -638 012
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-white/40 hover:text-white/80 transition-colors uppercase tracking-wide"
                      >
                        <Navigation className="w-3 h-3" />
                        Directions
                      </a>
                      <span className="text-white/15">·</span>
                      <button
                        onClick={handleCopyAddress}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-white/40 hover:text-white/80 transition-colors uppercase tracking-wide cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </li>

            </ul>
          </motion.div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/25"
        >
          <div className="flex items-center gap-1.5">
            <span>© 2020–{new Date().getFullYear()} EMedia Event Decoration Services</span>
            <span className="text-white/15 hidden sm:inline">·</span>
            <span className="hidden sm:inline flex items-center gap-1">
              Made with <Heart className="w-2.5 h-2.5 text-red-400/60 inline mx-0.5" /> in Erode
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Designed &amp; Powered by</span>
            <a
              href="https://www.datazync.com"
              target="_blank"
              rel="noreferrer"
              className="datazync-link"
            >
              DataZync
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
