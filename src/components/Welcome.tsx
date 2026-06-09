import React from 'react';
import { EVENT_IMAGES } from '../data.ts';
import BlurText from './BlurText.tsx';
import ScrollReveal from './ScrollReveal.tsx';

interface WelcomeProps {
  onLearnMoreClick: () => void;
}

export default function Welcome({ onLearnMoreClick }: WelcomeProps) {
  return (
    <section
      className="flex flex-wrap md:flex-nowrap items-center gap-12 py-8"
      id="welcome-section"
      data-no-text-reveal
    >
      {/* Text content — slides from left */}
      <ScrollReveal direction="right" className="w-full md:w-2/3">
        <span className="text-xs uppercase font-bold text-primary tracking-widest block mb-2">
          Trusted Event Brand
        </span>
        <BlurText
          text="Welcome to EMedia Event Decoration!"
          tag="h2"
          className="text-3xl md:text-4xl uppercase mb-6 tracking-wide font-elegant text-primary leading-tight"
          delay={110}
          direction="bottom"
          stepDuration={0.4}
        />
        <div className="space-y-4 text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
          <ScrollReveal direction="up" delay={0.18} duration={0.65}>
            <p>
              EMedia is a trusted decoration partner for birthdays, weddings, office anniversaries,
              ceremonies, and private celebrations.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3} duration={0.65}>
            <p>
              Every flower arch, balloon wall, stage frame, table detail, and lighting plan is styled
              with care so each event feels polished and memorable.
            </p>
          </ScrollReveal>
        </div>
        <ScrollReveal direction="up" delay={0.42} duration={0.55}>
          <button
            onClick={onLearnMoreClick}
            className="px-6 py-2 bg-primary hover:bg-opacity-90 font-bold uppercase text-xs tracking-wider text-white transition cursor-pointer"
            id="welcome-learn-more-btn"
          >
            Book a consultation
          </button>
        </ScrollReveal>
      </ScrollReveal>

      {/* Image — slides from right */}
      <ScrollReveal direction="left" delay={0.15} className="w-full md:w-1/3 flex justify-center relative">
        <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-gray-50 shadow-md relative z-10 hover:scale-105 transition duration-500">
          <img
            alt="Event floral arch decoration"
            className="w-full h-full object-cover"
            src={EVENT_IMAGES.welcomeDecor}
            id="welcome-bouquet-image"
          />
        </div>
        {/* Decorative dotted ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-dashed border-primary/30 -z-0 animate-spin-slow" />
      </ScrollReveal>
    </section>
  );
}
