import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data.ts';
import { BlogPost } from '../types.ts';
import { BookOpen, ArrowRight, Tag } from 'lucide-react';
import BlurText from './BlurText.tsx';
import ScrollReveal from './ScrollReveal.tsx';

interface BlogSectionProps {
  onBlogPostSelect: (post: BlogPost) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Wedding', label: 'Wedding', subs: ['Decorations', 'Photography', 'Pre Wedding Shoot'] },
  { id: 'Promotions', label: 'Promotions', subs: ['Shop Opening'] },
  { id: 'Balloon Decorations', label: 'Balloon Decorations', subs: ['Birthday', 'Shop Opening Ceremony', 'Others'] },
  { id: 'Corporate Events', label: 'Corporate Events' },
  { id: 'Family Get-together', label: 'Family Get-together' },
  { id: 'Flex Banner', label: 'Flex Banner' },
];

export default function BlogSection({ onBlogPostSelect }: BlogSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const activeCatDef = CATEGORIES.find(c => c.id === activeCategory);
  const subs = (activeCatDef && 'subs' in activeCatDef) ? activeCatDef.subs : [];

  const filteredPosts = BLOG_POSTS.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeSubcategory) return p.category === activeCategory && p.subcategory === activeSubcategory;
    return p.category === activeCategory;
  });

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setActiveSubcategory(null);
  };

  const featuredPost = filteredPosts[0];
  const listPosts = filteredPosts.slice(1, 5);

  return (
    <section
      className="bg-gray-50/50 p-6 md:p-8 rounded-lg border border-gray-100"
      id="blog-section"
      data-no-text-reveal
    >
      <ScrollReveal direction="up" duration={0.7}>
        <div className="text-center mb-8 relative">
          <BlurText
            text="Planning Guide"
            tag="h2"
            className="text-3xl uppercase bg-white inline-block px-6 relative z-10 font-elegant text-primary"
            delay={120}
            direction="bottom"
          />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0" />
        </div>
        <p className="text-center text-sm text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
          Practical tips and real-world lessons gathered from hundreds of events to help you plan with confidence.
        </p>
      </ScrollReveal>

      {/* Category tabs */}
      <ScrollReveal direction="up" delay={0.1} duration={0.5}>
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-primary border-primary/20 hover:border-primary hover:bg-primary/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Subcategory pills */}
        <AnimatePresence mode="wait">
          {subs.length > 0 && (
            <motion.div
              key={activeCategory + '-subs'}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex gap-2 flex-wrap justify-center mb-6"
            >
              <button
                onClick={() => setActiveSubcategory(null)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold border transition cursor-pointer ${
                  activeSubcategory === null
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-primary/30 hover:text-primary'
                }`}
              >
                <Tag className="w-3 h-3" />
                All
              </button>
              {subs.map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold border transition cursor-pointer ${
                    activeSubcategory === sub
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-white text-gray-400 border-gray-200 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  {sub}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollReveal>

      {/* Posts layout */}
      <AnimatePresence mode="wait">
        {filteredPosts.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-gray-400 py-12"
          >
            No posts found for this category.
          </motion.p>
        ) : (
          <motion.div
            key={activeCategory + '-' + (activeSubcategory ?? 'all')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex flex-wrap lg:flex-nowrap gap-8"
          >
            {/* Featured post */}
            {featuredPost && (
              <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white p-4 rounded border border-gray-100 hover:shadow-lg transition duration-300">
                <div>
                  <div className="w-full h-64 bg-gray-200 mb-4 rounded overflow-hidden relative group">
                    <img
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      src={featuredPost.image}
                    />
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3" />
                      Featured story
                    </div>
                    {featuredPost.subcategory && (
                      <div className="absolute top-3 right-3 bg-white/90 text-primary text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full">
                        {featuredPost.subcategory}
                      </div>
                    )}
                  </div>
                  <h3
                    onClick={() => onBlogPostSelect(featuredPost)}
                    className="text-xl md:text-2xl font-bold text-primary hover:text-opacity-80 transition font-elegant cursor-pointer leading-snug mb-3"
                    id={`blog-featured-title-${featuredPost.id}`}
                  >
                    {featuredPost.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6">
                    {featuredPost.summary}...
                  </p>
                </div>
                <button
                  onClick={() => onBlogPostSelect(featuredPost)}
                  className="text-xs font-bold text-primary hover:underline uppercase tracking-wide flex items-center gap-1 cursor-pointer"
                  id={`blog-featured-btn-${featuredPost.id}`}
                >
                  Read full article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Sidebar posts */}
            {listPosts.length > 0 && (
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {listPosts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: 0.05 + i * 0.08, ease: 'easeOut' }}
                    onClick={() => onBlogPostSelect(post)}
                    className="flex gap-4 items-center bg-white p-3 rounded shadow-xs hover:shadow-md border border-gray-100/85 hover:border-primary/10 transition duration-300 cursor-pointer"
                    id={`blog-item-${post.id}`}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <img
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        src={post.image}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      {post.subcategory && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-primary/60 mb-0.5 block">
                          {post.subcategory}
                        </span>
                      )}
                      <h4 className="font-bold text-primary text-sm md:text-base leading-snug hover:text-primary/80 transition mb-1.5 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {post.summary}...
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
