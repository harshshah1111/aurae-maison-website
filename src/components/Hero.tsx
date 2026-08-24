import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { analytics } from '../services/analytics';

interface HeroProps {
  onOpenBooking: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplore }) => {
  const handleBookClick = () => {
    analytics.track('hero_cta_click', { action: 'book_experience' });
    onOpenBooking();
  };

  const handleExploreClick = () => {
    analytics.track('hero_cta_click', { action: 'explore' });
    onExplore();
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-end sm:items-center justify-start pb-20 sm:pb-0 overflow-hidden bg-[#5A2738]"
    >
      {/* Background Image with soft gradient overlay for pristine editorial contrast */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=90"
          alt="AURAÉ Maison - Luxury Beauty Editorial"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-75 sm:brightness-80"
        />
        {/* Editorial Vignette & Tonal Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#5A2738]/95 via-[#5A2738]/40 to-[#5A2738]/50" />
        <div className="absolute inset-0 bg-[#E8A7B8]/10 mix-blend-overlay" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-32 sm:pt-20">
        <div className="max-w-2xl">
          {/* Subtle Atelier Identifier */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-block text-[11px] sm:text-xs font-sans-refined uppercase tracking-[0.35em] text-[#F6DDE3] font-medium">
              A modern beauty atelier in Mumbai.
            </span>
          </motion.div>

          {/* Major Editorial Headline */}
          <motion.h1
            id="hero-headline"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl text-[#FFF9FA] leading-[0.95] tracking-[0.04em] font-light mb-8 sm:mb-10"
          >
            BEAUTY,
            <br />
            <span className="italic font-normal text-[#F6DDE3]">REFINED.</span>
          </motion.h1>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-6"
          >
            <button
              id="hero-book-cta"
              onClick={handleBookClick}
              className="px-8 py-4 bg-[#E8A7B8] text-[#5A2738] font-sans-refined text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#FFF9FA] hover:text-[#5A2738] transition-all duration-300 shadow-lg text-center cursor-pointer"
            >
              BOOK YOUR EXPERIENCE
            </button>

            <button
              id="hero-explore-cta"
              onClick={handleExploreClick}
              className="px-8 py-4 border border-[#FFF9FA]/40 text-[#FFF9FA] font-sans-refined text-xs font-medium tracking-[0.25em] uppercase rounded-full hover:border-[#FFF9FA] hover:bg-[#FFF9FA]/10 transition-all duration-300 text-center cursor-pointer"
            >
              EXPLORE
            </button>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <motion.button
        id="hero-scroll-indicator"
        onClick={handleExploreClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 text-[#FFF9FA]/70 hover:text-[#FFF9FA] transition-colors cursor-pointer"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-sans-refined">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.button>
    </section>
  );
};
