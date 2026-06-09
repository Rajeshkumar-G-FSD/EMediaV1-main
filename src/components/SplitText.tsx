import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to?: any;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties['textAlign'];
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  onLetterAnimationComplete?: () => void;
}

const SplitText = ({
  text,
  className = '',
  delay = 40,
  duration = 0.6,
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-60px',
  textAlign = 'left',
  tag = 'p',
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const elements = splitType === 'words' ? text.split(' ') : text.split('');
  const Tag = tag as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={`overflow-hidden whitespace-normal inline-block ${className}`}
      style={{ textAlign }}
    >
      {elements.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={from}
          animate={inView ? to : from}
          transition={{
            duration,
            delay: (i * delay) / 1000,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          onAnimationComplete={i === elements.length - 1 ? onLetterAnimationComplete : undefined}
        >
          {char === ' ' ? ' ' : char}
          {splitType === 'words' && i < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </Tag>
  );
};

export default SplitText;
