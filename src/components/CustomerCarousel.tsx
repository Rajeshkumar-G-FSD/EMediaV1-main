import React, { useState } from 'react';
import { CUSTOMERS_DATA } from '../data.ts';
import { Customer } from '../types.ts';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomerCarouselProps {
  onCustomerSelect: (customer: Customer) => void;
}

export default function CustomerCarousel({ onCustomerSelect }: CustomerCarouselProps) {
  // We have 5 customers in CUSTOMERS_DATA. We can display 3 at a time, and slide by index.
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? CUSTOMERS_DATA.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= CUSTOMERS_DATA.length - 3 ? 0 : prev + 1));
  };

  const displayedCustomers = CUSTOMERS_DATA.slice(startIndex, startIndex + 3);

  // If there are less than 3 remaining, we wrap around
  if (displayedCustomers.length < 3) {
    const overflow = 3 - displayedCustomers.length;
    displayedCustomers.push(...CUSTOMERS_DATA.slice(0, overflow));
  }

  return (
    <section className="py-8" id="customers-section">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Title & Intro */}
        <div className="w-full md:w-1/4 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-primary tracking-widest block mb-2">Lời khen chân thực</span>
            <h2 className="text-3xl md:text-3xl uppercase mb-6 font-elegant text-primary" id="customers-title">
              Khách hàng <br /> tin chọn
            </h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Sự hài lòng tuyệt đối và niềm hân hoan rạng ngời của quan viên hai họ chính là phần thưởng vô giá nhất gửi đến toàn thể đội ngũ thực hiện của Dịch vụ cưới Như Ý.
            </p>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Dưới đây là một số hình ảnh thực tế ghi dấu ngày trọng đại viên mãn từ các lễ gia tiên và tiệc cưới do Như Ý trang trí trọn gói.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            {/* Nav Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition cursor-pointer"
                id="customer-prev-btn"
                aria-label="Previous customer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition cursor-pointer"
                id="customer-next-btn"
                aria-label="Next customer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Cards List */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedCustomers.map((cust, i) => (
                <motion.div
                  key={`${cust.id}-${startIndex}-${i}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-white p-3 border border-gray-100 hover:shadow-xl transition group flex flex-col justify-between"
                  id={`customer-card-${cust.id}`}
                >
                  <div>
                    <div className="w-full h-48 overflow-hidden mb-4 relative bg-gray-50">
                      <img
                        alt={cust.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        src={cust.image}
                      />
                      <div className="absolute top-2 right-2 bg-primary/95 text-white text-[10px] font-bold px-2.5 py-1 tracking-wider">
                        {cust.date}
                      </div>
                    </div>
                    <h3 className="font-bold text-primary mb-2 text-sm md:text-base group-hover:text-opacity-80 transition min-h-[44px] leading-snug">
                      {cust.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                      {cust.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-auto flex items-center justify-between">
                    <button
                      onClick={() => onCustomerSelect(cust)}
                      className="text-xs font-bold text-gray-700 uppercase group-hover:text-primary transition cursor-pointer flex items-center gap-1"
                      id={`customer-detail-trigger-${cust.id}`}
                    >
                      Báo cáo chi tiết <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onCustomerSelect(cust)}
                      className="bg-primary hover:bg-opacity-90 text-white w-6 h-6 flex items-center justify-center text-[10px] cursor-pointer"
                      aria-label="View"
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
