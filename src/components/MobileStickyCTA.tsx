import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { analytics } from '../services/analytics';

interface MobileStickyCTAProps {
  onOpenBooking: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only when scrolled beyond hero (approx > 500px)
      const scrolled = window.scrollY > 480;
      setVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    analytics.track('booking_start', { source: 'mobile_sticky_cta' });
    onOpenBooking();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="mobile-sticky-book-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-30 md:hidden"
        >
          <button
            id="mobile-sticky-book-btn"
            onClick={handleClick}
            className="px-6 py-3 bg-[#E8A7B8] text-[#5A2738] text-xs font-semibold tracking-[0.25em] uppercase rounded-full shadow-2xl border border-[#FFF9FA]/20 hover:bg-[#FFF9FA] hover:text-[#5A2738] transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <span>BOOK</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
