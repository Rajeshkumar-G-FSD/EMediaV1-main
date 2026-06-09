import React from 'react';
import { SERVICES_DATA } from '../data.ts';
import { Service } from '../types.ts';
import { Heart, CheckCircle2 } from 'lucide-react';

interface ServiceGridProps {
  onServiceSelect: (service: Service) => void;
  onBookNow: (serviceId: string) => void;
}

export default function ServiceGrid({ onServiceSelect, onBookNow }: ServiceGridProps) {
  return (
    <section className="py-8" id="services-section">
      <div className="text-center mb-8 relative">
        <h2 className="text-3xl uppercase bg-white inline-block px-6 relative z-10 font-elegant text-primary" id="services-title">
          Signature Services
        </h2>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0" />
      </div>
      <p className="text-center text-sm md:text-base text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
        With a dedicated team of stylists, decorators, and technicians, EMedia delivers polished solutions tailored to every venue and event style.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES_DATA.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition duration-300 p-4 rounded flex flex-col justify-between"
            id={`service-card-${item.id}`}
          >
            <div>
              {/* Image box with overlay */}
              <div className="w-full h-52 bg-gray-100 mb-5 overflow-hidden rounded border-4 border-white shadow-xs mx-auto relative group">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  src={item.image}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-300" />
                <button
                  type="button"
                  onClick={() => onBookNow(item.id)}
                  className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-primary font-bold text-[10px] uppercase font-sans hover:bg-primary hover:text-white px-2.5 py-1.5 transition rounded-sm shadow-xs cursor-pointer flex items-center gap-1 opacity-0 group-hover:opacity-100"
                >
                  <Heart className="w-3 h-3 fill-current" />
                  Request a quote
                </button>
              </div>

              {/* Text */}
              <h3 className="text-xl md:text-2xl text-primary font-elegant mb-3 text-center leading-snug">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-6 text-left leading-relaxed line-clamp-4">
                {item.description}
              </p>
            </div>

            {/* Actions footer */}
            <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-auto">
              <button
                onClick={() => onServiceSelect(item)}
                className="text-xs font-bold text-gray-400 hover:text-primary uppercase transition cursor-pointer"
                id={`service-detail-btn-${item.id}`}
              >
                View service details
              </button>
              <button
                type="button"
                onClick={() => onServiceSelect(item)}
                className="bg-primary hover:bg-opacity-90 text-white w-6 h-6 flex items-center justify-center text-[10px] cursor-pointer"
                aria-label="View Details"
              >
                ▶
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => onBookNow('all-inclusive')}
          className="px-8 py-3 bg-primary hover:bg-opacity-90 text-white font-bold uppercase text-xs tracking-wider cursor-pointer"
          id="services-all-btn"
        >
          Get a full event planning consultation
        </button>
      </div>
    </section>
  );
}
