import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SplitText from './SplitText';

interface HeroProps {
  onActionClick: () => void;
}

const slides = [
  { src: '/images/Emediaevnt_cooking_decoration.png', label: 'Cooking Ceremony Decor' },
  { src: '/images/Emediaevnt_stag_decoration.png',    label: 'Stag Party Decoration'  },
  { src: '/images/Emediaevnt_stage_ring_decoration.png',      label: 'Ring Ceremony Stage'    },
  { src: '/images/Emediaevnt_stage_wedding_decoration.png',   label: 'Wedding Stage Decor'    },
  { src: '/images/Emediaevnt_stage_wedding_decorations.png',  label: 'Wedding Stage Setup'    },
  { src: '/images/Emediaevnt_wedding_decoration.png', label: 'Wedding Decoration'     },
];

export default function Hero({ onActionClick }: HeroProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full h-[480px] sm:h-[520px] md:h-[600px] bg-gray-200 overflow-hidden"
      id="hero-section"
      aria-label="EMediaEvent - Event Decoration in Erode"
    >
      {/* Animated background image rotation */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[activeImageIndex].src}
          alt="EMediaEvent event decoration setup in Erode - wedding and birthday decor"
          className="absolute inset-0 w-full h-full object-cover"
          src={slides[activeImageIndex].src}
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
          {/* Decoration label — re-mounts on each slide to re-trigger animation */}
          <div key={activeImageIndex} className="mb-3">
            <SplitText
              text={slides[activeImageIndex].label}
              tag="span"
              className="text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-semibold border border-secondary/60 px-3 py-1"
              splitType="chars"
              delay={35}
              duration={0.5}
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
              textAlign="left"
            />
          </div>

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
