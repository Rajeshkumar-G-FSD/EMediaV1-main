import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { Customer } from '../types.ts';
import { CUSTOMERS_DATA, SHOWCASE_CONTENT } from '../data.ts';
import ScrollReveal from './ScrollReveal.tsx';
import Slider3D from './Slider3D.tsx';

interface ShowcaseDetailProps {
  item: Customer;
  onBack: () => void;
  onBookNow: () => void;
  onSelectItem: (id: string) => void;
}

export default function ShowcaseDetail({ item, onBack, onBookNow, onSelectItem }: ShowcaseDetailProps) {
  const content = SHOWCASE_CONTENT[item.id];
  const otherItems = CUSTOMERS_DATA.filter((c) => c.id !== item.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [item.id]);

  if (!content) return null;

  return (
    <div id="showcase-detail-page" data-no-text-reveal>

      {/* Big hero section */}
      <section className="relative w-full h-[72vh] min-h-[520px] bg-gray-200 overflow-hidden" aria-label={`${item.title} in Erode`}>
        <motion.img
          key={item.image}
          alt={`${item.title} by EMedia Event & Promotions in Erode`}
          className="absolute inset-0 w-full h-full object-cover"
          src={item.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <button
          onClick={onBack}
          className="absolute top-24 left-4 sm:left-8 z-10 inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold uppercase tracking-wide backdrop-blur transition cursor-pointer rounded-full"
          id="showcase-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Gallery
        </button>

        <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl h-full flex flex-col justify-end pb-14 sm:pb-20 text-white">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-secondary mb-4 w-fit"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {item.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-3xl sm:text-4xl md:text-6xl uppercase font-elegant leading-tight mb-4 max-w-3xl"
          >
            {item.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-lg text-white/85 max-w-2xl mb-8 leading-relaxed"
          >
            {content.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={onBookNow}
              className="px-6 py-3 cursor-pointer bg-primary hover:bg-opacity-90 font-bold uppercase text-xs tracking-wider text-white transition flex items-center justify-center gap-2 rounded"
              id="showcase-book-now-btn"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+919566894134"
              className="px-6 py-3 cursor-pointer bg-white/15 hover:bg-white/25 border border-white/40 font-bold uppercase text-xs tracking-wider text-white transition flex items-center justify-center gap-2 rounded"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* SEO content section */}
      <section className="container mx-auto px-4 max-w-5xl py-14 md:py-20">
        <ScrollReveal direction="up">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] font-bold text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10 mb-5 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            {content.tagline}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase font-elegant text-primary leading-tight mb-6 max-w-3xl">
            {item.title} — Popular Across Erode
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mb-10">
            {content.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {content.highlights.map((point) => (
              <div key={point} className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <div className="h-px bg-primary/10 w-full my-2 max-w-6xl mx-auto" />

      {/* 3D image gallery */}
      <section className="py-14 md:py-20 overflow-hidden">
        <div className="text-center mb-4 relative">
          <h2 className="text-2xl sm:text-3xl uppercase bg-white inline-block px-6 relative z-10 font-elegant text-primary">
            Style Gallery
          </h2>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0" />
        </div>
        <p className="text-center text-sm text-gray-500 mb-4 max-w-xl mx-auto px-4">
          A rotating look at {item.title.toLowerCase()} styling — mixing EMedia's own event photography with sample inspiration images.
        </p>
        <Slider3D images={content.gallery} />
      </section>

      {/* Explore other styles */}
      <section className="container mx-auto px-4 max-w-6xl py-14 md:py-20">
        <div className="text-center mb-10 relative">
          <h2 className="text-2xl sm:text-3xl uppercase bg-white inline-block px-6 relative z-10 font-elegant text-primary">
            Explore Other Decoration Styles
          </h2>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {otherItems.map((other) => (
            <button
              key={other.id}
              onClick={() => onSelectItem(other.id)}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition cursor-pointer text-left"
            >
              <img
                src={other.image}
                alt={other.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[9px] uppercase tracking-wider font-bold text-secondary mb-1">{other.category}</p>
                <p className="text-xs sm:text-sm font-elegant text-white leading-tight">{other.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
