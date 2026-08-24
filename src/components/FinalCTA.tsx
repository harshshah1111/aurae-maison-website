import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { analytics } from '../services/analytics';
import BorderGlow from './BorderGlow';

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
      className="py-24 sm:py-36 bg-[#5A2738] text-[#FFF9FA] relative overflow-hidden border-b border-[#E8A7B8]/20"
    >
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8A7B8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <BorderGlow
          edgeSensitivity={30}
          glowColor="340 70 75"
          backgroundColor="#4A1E2D"
          borderRadius={28}
          glowRadius={42}
          glowIntensity={1.2}
          coneSpread={28}
          animated={true}
          colors={['#E8A7B8', '#F6DDE3', '#C77D98']}
          className="w-full shadow-2xl border-[#E8A7B8]/30"
        >
          <div className="px-6 py-16 sm:px-12 sm:py-20 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8A7B8]" />
              <span>AN INVITATION</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E8A7B8]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 }}
              className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light leading-[1.05] tracking-[0.02em] mb-8 sm:mb-10 max-w-3xl text-[#FFF9FA]"
            >
              READY FOR
              <br />
              <span className="italic font-normal text-[#F6DDE3]">YOUR SIGNATURE?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-sm sm:text-base font-light text-[#F6DDE3]/85 font-sans-refined max-w-xl mb-10 leading-relaxed"
            >
              Step into a private interlude crafted around quiet luxury, botanical precision, and unhurried artistry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
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
        </BorderGlow>
      </div>
    </section>
  );
};
