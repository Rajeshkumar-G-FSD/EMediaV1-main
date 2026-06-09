import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal.tsx';

const REVIEWS = [
  {
    id: 1,
    name: 'Priya Lakshmi',
    rating: 5,
    date: 'May 2026',
    text: 'Absolutely stunning decoration for our daughter\'s wedding! EMedia transformed the venue beyond our expectations. Every floral arch and lighting detail was perfect.',
    avatar: 'PL',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    rating: 5,
    date: 'April 2026',
    text: 'Hired them for our office anniversary event. Professional team, on-time setup, and the stage backdrop was breathtaking. Everyone was asking who did the decoration!',
    avatar: 'RK',
  },
  {
    id: 3,
    name: 'Anitha Selvam',
    rating: 5,
    date: 'March 2026',
    text: 'Best birthday balloon decoration in Erode! My son\'s birthday party looked like a dream. Reasonable pricing and outstanding quality. Will book again for sure.',
    avatar: 'AS',
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  return (
    <section className="py-10" id="google-reviews-section" data-no-text-reveal>
      {/* Header */}
      <ScrollReveal direction="up" duration={0.65}>
        <div className="flex flex-col items-center gap-3 mb-10">
          {/* Google branding pill */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Google Reviews</span>
          </div>

          {/* Overall rating */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl font-bold text-gray-800">4.9</span>
              <div className="flex flex-col items-start gap-1">
                <StarRating count={5} />
                <span className="text-xs text-gray-400 font-semibold">Based on 120+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0.08, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 flex flex-col gap-3"
          >
            {/* Top row */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {review.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-800 truncate">{review.name}</p>
                <p className="text-[10px] text-gray-400">{review.date}</p>
              </div>
              {/* Google G icon */}
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>

            <StarRating count={review.rating} />
            <p className="text-sm text-gray-600 leading-relaxed flex-1">"{review.text}"</p>
          </motion.div>
        ))}
      </div>

      {/* Write a review CTA */}
      <ScrollReveal direction="up" delay={0.2} className="mt-8 flex justify-center">
        <a
          href="https://search.google.com/local/writereview?placeid=ChIJ_EMediaErode"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 bg-white border-2 border-gray-200 hover:border-primary/40 rounded-full px-6 py-3 text-sm font-bold text-gray-700 hover:text-primary transition shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Write a Google Review
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </a>
      </ScrollReveal>
    </section>
  );
}
