import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import BorderGlow from './BorderGlow';

export const Testimonial: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#F6DDE3]/35 text-[#5A2738] relative border-b border-[#E8A7B8]/20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <BorderGlow
          edgeSensitivity={28}
          glowColor="340 50 80"
          backgroundColor="#FFFFFF"
          borderRadius={24}
          glowRadius={36}
          glowIntensity={0.9}
          coneSpread={25}
          animated={false}
          colors={['#E8A7B8', '#F6DDE3', '#DDA0B0']}
          className="w-full shadow-lg border border-[#E8A7B8]/30"
        >
          <div className="p-8 sm:p-14 text-center flex flex-col items-center">
            {/* Subtle Decorative Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-10 h-10 rounded-full bg-[#F6DDE3] flex items-center justify-center text-[#5A2738] mb-6"
            >
              <Quote className="w-4 h-4 text-[#5A2738]" />
            </motion.div>

            {/* The One Beautiful Editorial Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light italic leading-[1.3] text-[#5A2738] mb-8 max-w-2xl"
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
        </BorderGlow>
      </div>
    </section>
  );
};
