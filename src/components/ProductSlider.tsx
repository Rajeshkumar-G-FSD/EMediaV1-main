import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data.ts';
import { Product } from '../types.ts';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductSliderProps {
  onProductSelect: (product: Product) => void;
  onBookProduct: (prodName: string) => void;
}

export default function ProductSlider({ onProductSelect, onBookProduct }: ProductSliderProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [startIndex, setStartIndex] = useState(0);

  const categories = ['all', 'Canopies', 'Floral arches', 'Ceremonial trays'];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, filteredProducts.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= filteredProducts.length - 3 ? 0 : prev + 1));
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setStartIndex(0);
  };

  const displayedProducts = filteredProducts.slice(startIndex, startIndex + 3);
  if (displayedProducts.length < 3 && filteredProducts.length >= 3) {
    const overflow = 3 - displayedProducts.length;
    displayedProducts.push(...filteredProducts.slice(0, overflow));
  }

  return (
    <section className="py-8" id="products-section">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Right Sidebar Info (in HTML it is text-right & flex-row-reverse, we will implement this exact visual direction) */}
        <div className="w-full md:w-1/4 md:order-2 text-left md:text-right flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-primary tracking-widest block mb-1">Creative options</span>
            <h2 className="text-3xl md:text-3xl uppercase mb-6 font-elegant text-primary" id="products-title">
              Event
              <br />
              details
            </h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Our studio offers a curated collection of decor details, ceremonial pieces, and stage accents for weddings and all special events.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 justify-start md:justify-end mb-8">
              {categories.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1 text-[10px] uppercase font-bold rounded-full border transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary border-primary text-white font-bold'
                      : 'border-gray-200 text-gray-400 hover:text-primary hover:border-primary'
                  }`}
                  id={`prod-cat-${cat}`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-end gap-3 mt-auto">
            <div className="flex gap-1.5">
              <button
                onClick={handlePrev}
                disabled={filteredProducts.length <= 3}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition cursor-pointer"
                id="products-prev-btn"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={filteredProducts.length <= 3}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition cursor-pointer"
                id="products-next-btn"
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => onBookProduct('Sản phẩm cưới tổng hợp')}
              className="px-5 py-2 whitespace-nowrap bg-primary hover:bg-opacity-95 font-bold uppercase text-xs tracking-wider text-white transition cursor-pointer"
              id="products-request-catalog-btn"
            >
              View wholesale pricing
            </button>
          </div>
        </div>

        {/* Product Cards Center Grid */}
        <div className="w-full md:w-3/4 md:order-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((prod, i) => (
                <motion.div
                  key={`${prod.id}-${selectedCategory}-${startIndex}-${i}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-white border border-gray-100 hover:shadow-xl transition p-2.5 rounded flex flex-col justify-between group"
                  id={`product-card-${prod.id}`}
                >
                  <div>
                    <div className="w-full h-64 overflow-hidden mb-4 rounded relative bg-gray-50">
                      <img
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        src={prod.image}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5 text-secondary" />
                        {prod.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-primary group-hover:text-opacity-80 transition mb-1 text-sm md:text-base leading-snug min-h-[40px]">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-2.5 mt-auto flex items-center justify-between">
                    <button
                      onClick={() => onProductSelect(prod)}
                      className="text-xs font-bold text-gray-400 hover:text-primary uppercase cursor-pointer"
                      id={`product-detail-btn-${prod.id}`}
                    >
                      Product details
                    </button>
                    <button
                      type="button"
                      onClick={() => onProductSelect(prod)}
                      className="text-primary text-xs font-bold hover:translate-x-1 transition duration-200 cursor-pointer"
                    >
                      ▶
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
