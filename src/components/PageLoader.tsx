import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import React from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#175E5E] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Decorative rings */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full border border-white/5"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute w-[360px] h-[360px] rounded-full border border-white/8"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col items-center gap-5 relative z-10"
          >
            {/* Logo circle */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-white/25 shadow-[0_0_60px_rgba(255,255,255,0.12)]">
              <img
                src="/images/emedia_round.png"
                alt="EMedia"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-white/50 text-[10px] uppercase tracking-[0.45em] font-bold mb-1">
                Event Decoration Services
              </p>
              <h1 className="text-white text-4xl font-elegant tracking-wide">EMedia</h1>
              <p className="text-white/40 text-[10px] mt-1 uppercase tracking-[0.3em]">Erode, Tamil Nadu</p>
            </motion.div>

            {/* Loading bar */}
            <div className="w-44 h-[2px] bg-white/15 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-white/80 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
