import React from 'react';
import { motion } from 'motion/react';
import { analytics } from '../services/analytics';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  const handleBookClick = () => {
    analytics.track('booking_start', { source: 'final_cta' });
    onOpenBooking();
  };

  return (
    <section
      id="final-cta"
      className="py-28 sm:py-40 bg-[#5A2738] text-[#FFF9FA] relative overflow-hidden border-b border-[#E8A7B8]/20"
    >
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8A7B8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold mb-6"
        >
          AN INVITATION
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl font-light leading-[0.98] tracking-[0.03em] mb-10 sm:mb-12 max-w-4xl text-[#FFF9FA]"
        >
          READY FOR
          <br />
          <span className="italic font-normal text-[#F6DDE3]">YOUR SIGNATURE?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button
            id="final-booking-cta-btn"
            onClick={handleBookClick}
            className="px-10 py-5 bg-[#E8A7B8] text-[#5A2738] font-sans-refined text-xs font-semibold tracking-[0.28em] uppercase rounded-full hover:bg-[#FFF9FA] hover:text-[#5A2738] transition-all duration-300 shadow-2xl cursor-pointer transform hover:scale-103"
          >
            BOOK YOUR EXPERIENCE
          </button>
        </motion.div>
      </div>
    </section>
  );
};
