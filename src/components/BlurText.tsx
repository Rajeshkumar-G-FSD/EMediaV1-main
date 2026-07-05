import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildKeyframes = (from: any, steps: any[]): any => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s: any) => Object.keys(s))]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kf: any = {};
  keys.forEach(k => { kf[k] = [from[k], ...steps.map((s: any) => s[k])]; });
  return kf;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'chars';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationFrom?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationTo?: any[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
}

const BlurText = ({
  text = '',
  delay = 150,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
  tag = 'p',
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -30 }
        : { filter: 'blur(10px)', opacity: 0, y: 30 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  const Tag = tag as React.ElementType;

  return (
    <Tag ref={ref} className={`blur-text ${className}`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        return (
          <React.Fragment key={index}>
            <motion.span
              className="inline-block will-change-[transform,filter,opacity]"
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={{
                duration: totalDuration,
                times,
                delay: (index * delay) / 1000,
                ease: easing,
              }}
              onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            >
              {segment}
            </motion.span>
            {animateBy === 'words' && index < elements.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </Tag>
  );
};

export default BlurText;
