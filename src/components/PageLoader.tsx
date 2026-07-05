import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#175E5E] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {/* Decorative rings */}
          <motion.div
            className="absolute w-[520px] h-[520px] rounded-full border border-white/6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute w-[360px] h-[360px] rounded-full border border-white/10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.08, ease: 'easeOut' }}
          />

          {/* Main card */}
          <motion.div
            initial={{ scale: 0.72, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-52 h-52 rounded-full overflow-hidden border-[3px] border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.15)]"
            >
              <img src="/images/emediaevents_footre-logo.png" alt="EMedia" className="w-full h-full object-contain" />
            </motion.div>

            {/* Brand text — visible immediately */}
            <div className="text-center">
              <p className="text-white/55 text-[10px] uppercase tracking-[0.45em] font-bold mb-0.5">
                Event Decoration Services
              </p>
              <h1 className="text-white text-4xl font-elegant tracking-wide">E Media</h1>
              <p className="text-white/35 text-[10px] mt-0.5 uppercase tracking-[0.3em]">
                Erode, Tamil Nadu
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-44 h-[2px] bg-white/15 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-white/80 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.75, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Bouncing dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/45"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                  transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
