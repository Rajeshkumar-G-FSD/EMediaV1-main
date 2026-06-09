import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  scale?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 45,
  threshold = 0.05,
  scale = 1,
}: ScrollRevealProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  /* Use transform-only for section wrappers so content is never fully invisible.
     Only the Y/X offset animates; opacity goes from a faint value, not zero. */
  const yInit = direction === 'up' ? distance : direction === 'down' ? -distance : 0;
  const xInit = direction === 'left' ? distance : direction === 'right' ? -distance : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initial={{ opacity: 0.08, y: yInit, x: xInit, scale } as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      animate={inView ? ({ opacity: 1, y: 0, x: 0, scale: 1 } as any) : ({ opacity: 0.08, y: yInit, x: xInit, scale } as any)}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}
