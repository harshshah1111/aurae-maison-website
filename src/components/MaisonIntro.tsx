import React from 'react';
import { motion } from 'motion/react';

export const MaisonIntro: React.FC = () => {
  return (
    <section
      id="maison"
      className="py-24 sm:py-36 md:py-44 bg-[#FFF9FA] text-[#5A2738] relative overflow-hidden border-b border-[#E8A7B8]/20"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <span className="text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold">
            THE MAISON
          </span>
        </motion.div>

        {/* Large Headline */}
        <motion.h2
          id="maison-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.03em] leading-[1.08] text-[#5A2738] mb-8 sm:mb-10 max-w-4xl"
        >
          YOUR BEAUTY,
          <br />
          <span className="italic font-normal text-[#E8A7B8]">YOUR SIGNATURE.</span>
        </motion.h2>

        {/* One Short Sentence */}
        <motion.p
          id="maison-subline"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-xl font-light text-[#5A2738]/75 font-sans-refined max-w-xl leading-relaxed"
        >
          Personalised hair, skin and beauty experiences created around you.
        </motion.p>
      </div>
    </section>
  );
};
