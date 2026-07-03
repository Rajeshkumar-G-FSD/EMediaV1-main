import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Camera, Sparkles, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { CUSTOMERS_DATA } from '../data.ts';
import BlurText from './BlurText.tsx';
import ScrollReveal from './ScrollReveal.tsx';

interface PortfolioCarouselProps {
  onItemSelect: (id: string) => void;
}

export default function PortfolioCarousel({ onItemSelect }: PortfolioCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % CUSTOMERS_DATA.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const visibleItems = useMemo(() => CUSTOMERS_DATA, []);

  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? visibleItems.length - 1 : current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % visibleItems.length);
  };

  return (
    <section className="relative -mt-10 md:-mt-16 pb-8 md:pb-12 overflow-hidden" id="portfolio-showcase" data-no-text-reveal>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-8 items-center">

          {/* Left text panel — slides from left */}
          <ScrollReveal direction="right" delay={0.1} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] font-bold text-primary bg-white/80 px-4 py-2 rounded-full border border-primary/10 shadow-sm backdrop-blur"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Event Decoration Gallery
            </motion.div>

            <div>
              <BlurText
                text="Decoration 3D Showcase"
                tag="h2"
                className="text-3xl md:text-4xl uppercase font-elegant text-primary leading-tight"
                delay={100}
                direction="bottom"
                stepDuration={0.38}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.55, ease: 'easeOut' }}
                className="mt-4 text-sm md:text-base text-gray-500 leading-relaxed max-w-md"
              >
                Browse birthday decoration, wedding decoration, office anniversary decoration,
                ceremony decor, and corporate event styling in a smooth 3D carousel.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-primary hover:bg-primary hover:text-white transition shadow-sm cursor-pointer flex items-center justify-center"
                aria-label="Previous portfolio item"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-primary hover:bg-primary hover:text-white transition shadow-sm cursor-pointer flex items-center justify-center"
                aria-label="Next portfolio item"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
                <Camera className="w-4 h-4 text-primary" />
                Auto-rotating gallery
              </div>
            </motion.div>
          </ScrollReveal>

          {/* 3D Carousel — unchanged */}
          <div className="relative h-[430px] md:h-[520px]" style={{ perspective: '1600px' }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,94,94,0.12),transparent_55%)]" />
            {visibleItems.map((item, index) => {
              const offset = (index - activeIndex + visibleItems.length) % visibleItems.length;
              const relative = offset > visibleItems.length / 2 ? offset - visibleItems.length : offset;
              const isActive = relative === 0;
              const x = relative * 240;
              const scale = isActive ? 1 : Math.max(0.76, 1 - Math.abs(relative) * 0.08);
              const rotateY = relative * -34;
              const opacity = Math.abs(relative) > 2 ? 0 : 1;

              return (
                <motion.article
                  key={item.id}
                  initial={false}
                  animate={{
                    x,
                    scale,
                    rotateY,
                    zIndex: isActive ? 20 : 10 - Math.abs(relative),
                    opacity,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  className="absolute left-1/2 top-1/2 w-[280px] sm:w-[320px] -translate-x-1/2 -translate-y-1/2"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <button
                    type="button"
                    onClick={() => onItemSelect(item.id)}
                    className="group block w-full text-left cursor-pointer rounded-[28px] overflow-hidden border border-white/60 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.18)]"
                    style={{ transformStyle: 'preserve-3d' }}
                    aria-label={`View ${item.title} gallery`}
                  >
                    <div className="relative h-[380px] sm:h-[430px]">
                      <img alt={item.title} className="absolute inset-0 h-full w-full object-cover" src={item.image} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
                      <div className="absolute inset-0 border border-white/20 rounded-[28px]" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-[0.2em] bg-white/15 border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                          <Eye className="w-3.5 h-3.5" />
                          View Gallery
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#EAF1F1]">{item.category}</span>
                          <span className="text-[10px] uppercase tracking-[0.25em] font-bold bg-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="font-elegant text-2xl leading-tight mb-2">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-3">{item.description}</p>
                      </div>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
