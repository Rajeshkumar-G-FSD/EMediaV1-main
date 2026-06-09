import React from 'react';
import { motion } from 'motion/react';
import { EVENT_IMAGES } from '../data.ts';

interface WelcomeProps {
  onLearnMoreClick: () => void;
}

export default function Welcome({ onLearnMoreClick }: WelcomeProps) {
  return (
    <section className="flex flex-wrap md:flex-nowrap items-center gap-12 py-8" id="welcome-section">
      <div className="w-full md:w-2/3">
        <span className="text-xs uppercase font-bold text-primary tracking-widest block mb-2">Trusted Da Nang brand</span>
        <h2 className="text-3xl md:text-4xl uppercase mb-6 tracking-wide font-elegant text-primary" id="welcome-title">
          Welcome to
          <br />
          EMedia Event Decoration!
        </h2>
        <div className="space-y-4 text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
          <p>
            EMedia is a trusted decoration partner for birthdays, weddings, office anniversaries, ceremonies, and private celebrations.
          </p>
          <p>
            Every flower arch, balloon wall, stage frame, table detail, and lighting plan is styled with care so each event feels polished and memorable.
          </p>
        </div>
        <button
          onClick={onLearnMoreClick}
          className="px-6 py-2 bg-primary hover:bg-opacity-90 font-bold uppercase text-xs tracking-wider text-white transition cursor-pointer"
          id="welcome-learn-more-btn"
        >
          Book a consultation
        </button>
      </div>

      <div className="w-full md:w-1/3 flex justify-center relative">
        <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-gray-50 shadow-md relative z-10 hover:scale-105 transition duration-500">
          <img
            alt="Event floral arch decoration"
            className="w-full h-full object-cover"
            src={EVENT_IMAGES.welcomeDecor}
            id="welcome-bouquet-image"
          />
        </div>
        {/* Decorative dotted circle background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-dashed border-primary/30 -z-0 animate-spin-slow" />
      </div>
    </section>
  );
}
