import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onActionClick: () => void;
}

export default function Hero({ onActionClick }: HeroProps) {
  const heroImages = [
    'https://i.postimg.cc/6qcWczF1/decoraation2.avif',
    'https://i.postimg.cc/J0xrxKSY/decoration.webp',
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % heroImages.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section
      className="relative w-full h-[480px] sm:h-[520px] md:h-[600px] bg-gray-200 overflow-hidden"
      id="hero-section"
      aria-label="EMediaEvent - Event Decoration in Erode"
    >
      {/* Animated background image rotation */}
      <AnimatePresence mode="wait">
        <motion.img
          key={heroImages[activeImageIndex]}
          alt="EMediaEvent event decoration setup in Erode - wedding and birthday decor"
          className="absolute inset-0 w-full h-full object-cover"
          src={heroImages[activeImageIndex]}
          id="hero-background"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20 md:to-transparent" />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl h-full flex items-center">
        <div className="w-full sm:w-4/5 md:w-1/2 text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl uppercase text-shadow mb-3 md:mb-4 leading-tight font-elegant text-white"
            id="hero-title"
          >
            Erode Event Decor
            <br />
            <span className="text-secondary">Beautifully Done</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base md:text-xl font-light tracking-wide text-[#EAF1F1] mb-3 md:mb-4 text-shadow font-sans uppercase"
            id="hero-subtitle"
          >
            Wedding · Birthday · Ceremony · Office Anniversary Decoration in Erode
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 md:mb-8 text-xs md:text-sm text-gray-200 opacity-90 max-w-md leading-relaxed hidden sm:block"
            id="hero-description"
          >
            EMediaEvent designs photo-ready spaces in Erode with floral arches, balloon decor, lighting, stage backdrops, and complete event setup support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={onActionClick}
              className="px-5 py-3 cursor-pointer bg-primary hover:bg-opacity-90 font-bold uppercase text-xs tracking-wider text-white transition flex items-center justify-center gap-2"
              id="hero-action-btn"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+919566894134"
              className="px-5 py-3 cursor-pointer bg-white/15 hover:bg-white/25 border border-white/40 font-bold uppercase text-xs tracking-wider text-white transition flex items-center justify-center gap-2"
            >
              <span>Call Now: +91 95668 94134</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Custom slanted bottom divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[80px]"
          data-name="Layer 1"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="fill-white" d="M1200 120L0 16.48V120h1200z"></path>
        </svg>
      </div>
    </section>
  );
}
