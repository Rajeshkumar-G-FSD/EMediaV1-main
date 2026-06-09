import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onActionClick: () => void;
}

export default function Hero({ onActionClick }: HeroProps) {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] bg-gray-200 overflow-hidden"
      id="hero-section"
    >
      {/* Background Image with hotlink */}
      <img
        alt="Như Ý Wedding Event Setup"
        className="absolute inset-0 w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPfJbKLh73Bo5xD8ZY6urA1t6oiUvH5-fr4geZK_FI2VgLpofiSjIqdG8484t42mrBAJ_hgeZMq-sE9GLOUxB5_RfX3RWGZQth_IG08fefXp6S1g_CEnaMyJmk_ytv15dF74qm4k8YAlFniRLa2fRYFGuhFMDRc_-HlDaLcGAPpo9CJC_KghspnrZ9RguJyfUCzyAWsV5-Mw1fltVklbzC-MoxwwD0-GIms_UJDzklI4kGORQIRfkxNuNfsi168troXb_NouF0PC8"
        id="hero-background"
      />

      {/* Dark overlay from left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 max-w-6xl h-full flex items-center">
        <div className="w-full md:w-1/2 text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl uppercase text-shadow mb-4 leading-tight font-elegant text-white"
            id="hero-title"
          >
            Cho Hạnh Phúc
            <br />
            Thật Đong Đầy
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl font-light tracking-wide text-[#EAF1F1] mb-4 text-shadow font-sans uppercase"
            id="hero-subtitle"
          >
            Dịch vụ cưới chuyên nghiệp trọn gói
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 text-xs md:text-sm text-gray-200 opacity-90 max-w-md leading-relaxed"
            id="hero-description"
          >
            Sứ mệnh của cưới hỏi Như Ý là vẽ nên bức tranh hạnh phúc chân thực và đong đầy ý nghĩa nhất cho ngày chung đôi của quý khách. Cẩn thận, chi tiết và tràn đầy tận tâm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <button
              onClick={onActionClick}
              className="px-6 py-3 cursor-pointer bg-primary hover:bg-opacity-90 font-bold uppercase text-xs tracking-wider text-white transition flex items-center gap-2"
              id="hero-action-btn"
            >
              <span>Xem các dịch vụ cưới</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
