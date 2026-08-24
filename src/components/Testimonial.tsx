import React from 'react';
import { motion } from 'motion/react';
import { SALON_INFO } from '../data/salonData';

export const Testimonial: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#F6DDE3]/35 text-[#5A2738] relative border-b border-[#E8A7B8]/20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Subtle Decorative Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-10 h-0.5 bg-[#E8A7B8] mb-10 sm:mb-12"
        />

        {/* The One Beautiful Editorial Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light italic leading-[1.25] text-[#5A2738] mb-8 sm:mb-10 max-w-3xl"
        >
          &ldquo;{SALON_INFO.testimonial.quote}&rdquo;
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center space-y-1"
        >
          <cite className="not-italic text-sm font-sans-refined uppercase tracking-[0.3em] text-[#5A2738] font-semibold">
            {SALON_INFO.testimonial.author}
          </cite>
          <span className="text-[11px] font-sans-refined uppercase tracking-[0.2em] text-[#5A2738]/60">
            {SALON_INFO.testimonial.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
};
