import { useEffect } from 'react';

const TEXT_SELECTOR = [
  '#app-root h1',
  '#app-root h2',
  '#app-root h3',
  '#app-root h4',
  '#app-root p',
  '#app-root label',
  '#app-root a',
  '#app-root button',
  '#app-root li',
  '#app-root span',
].join(',');

export default function TextRevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(TEXT_SELECTOR))
      .filter((element) => element.textContent?.trim())
      .filter((element) => !element.closest('[data-no-text-reveal]'))
      .filter((element) => !element.classList.contains('text-reveal-ready'));

    elements.forEach((element, index) => {
      element.classList.add('text-reveal-ready');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 12, 8) * 45}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('text-reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
