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
  duration = 0.75,
  distance = 60,
  threshold = 0.12,
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
      { threshold, rootMargin: '-40px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getInitial = () => {
    const base = { opacity: 0, scale };
    if (direction === 'up')    return { ...base, y:  distance };
    if (direction === 'down')  return { ...base, y: -distance };
    if (direction === 'left')  return { ...base, x:  distance };
    if (direction === 'right') return { ...base, x: -distance };
    return base;
  };

  const getAnimate = () => {
    const base = { opacity: 1, scale: 1 };
    if (direction === 'up' || direction === 'down')    return { ...base, y: 0 };
    if (direction === 'left' || direction === 'right') return { ...base, x: 0 };
    return base;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initial: any = getInitial();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animate: any = getAnimate();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? animate : initial}
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
