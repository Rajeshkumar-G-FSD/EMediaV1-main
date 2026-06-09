import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, ArrowUp, HelpCircle } from 'lucide-react';

interface SidebarProps {
  onQuickActionClick: (actionId: string) => void;
}

export default function SocialSidebar({ onQuickActionClick }: SidebarProps) {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-0 top-1/3 z-100 flex flex-col bg-primary text-white shadow-lg rounded-l-md overflow-hidden" id="floating-sidebar">
      {/* Facebook Link */}
      <a
        href="#"
        className="p-3 hover:bg-white/10 border-b border-white/20 transition flex items-center justify-center"
        title="Follow on Facebook"
        aria-label="Facebook link"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
        </svg>
      </a>

      {/* Phone Hotline action */}
      <button
        onClick={() => onQuickActionClick('phone')}
        className="p-3 hover:bg-white/10 border-b border-white/20 transition flex items-center justify-center cursor-pointer"
        title="Call support hotline: +91 95668 94134"
        id="sidebar-call-btn"
        aria-label="Hotline Call"
      >
        <Phone className="w-5 h-5" />
      </button>

      {/* Email Consultation Form action */}
      <button
        onClick={() => onQuickActionClick('email')}
        className="p-3 hover:bg-white/10 border-b border-white/20 transition flex items-center justify-center cursor-pointer"
        title="Send a contact email"
        id="sidebar-email-btn"
        aria-label="Email Enquiry"
      >
        <Mail className="w-5 h-5" />
      </button>

      {/* Quick Booking consultation */}
      <button
        onClick={() => onQuickActionClick('form')}
        className="p-3 hover:bg-white/10 border-b border-white/20 transition flex items-center justify-center cursor-pointer animate-pulse-slow"
        title="Open the consultation form"
        id="sidebar-form-btn"
        aria-label="Direct Form"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="p-3 hover:bg-white/10 transition flex items-center justify-center cursor-pointer animate-fade-in"
          title="Back to top"
          id="sidebar-scroll-top-btn"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 animate-bounce-slow" />
        </button>
      )}
    </div>
  );
}
