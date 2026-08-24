import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { analytics } from '../services/analytics';

export const Atelier: React.FC = () => {
  return (
    <section id="atelier" className="py-24 sm:py-36 bg-[#FFF9FA] relative border-b border-[#E8A7B8]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Full-width Interior Visual Container with Overlaid Text */}
        <div className="relative rounded-3xl overflow-hidden bg-[#5A2738] border border-[#E8A7B8]/30 shadow-2xl min-h-[520px] sm:min-h-[640px] flex items-center justify-center p-8 sm:p-16">
          {/* Background Interior Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=2000&q=90"
              alt="AURAÉ Atelier Architecture Mumbai"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5A2738]/95 via-[#5A2738]/50 to-[#5A2738]/70" />
          </div>

          {/* Centered Editorial Copy */}
          <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold mb-4"
            >
              THE ATELIER
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#FFF9FA] leading-[1.05] tracking-[0.03em] mb-6"
            >
              A SPACE
              <br />
              <span className="italic font-normal text-[#F6DDE3]">TO EXHALE.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-xl font-light text-[#FFF9FA]/85 font-sans-refined mb-10 max-w-lg leading-relaxed"
            >
              Designed for beauty, comfort and quiet moments.
            </motion.p>

            {/* Subtle Mumbai Location Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              <a
                href="https://maps.google.com/?q=Pali+Hill+Bandra+West+Mumbai"
                target="_blank"
                rel="noreferrer"
                onClick={() => analytics.track('maps_click', { location: 'pali_hill' })}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#5A2738]/80 hover:bg-[#E8A7B8] hover:text-[#5A2738] border border-[#E8A7B8]/40 text-[#FFF9FA] text-xs font-sans-refined tracking-wider transition-all backdrop-blur-xs shadow-md"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E8A7B8]" />
                <span>Pali Hill · Bandra West</span>
              </a>

              <a
                href="https://maps.google.com/?q=Colaba+Mumbai"
                target="_blank"
                rel="noreferrer"
                onClick={() => analytics.track('maps_click', { location: 'colaba' })}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#5A2738]/80 hover:bg-[#E8A7B8] hover:text-[#5A2738] border border-[#E8A7B8]/40 text-[#FFF9FA] text-xs font-sans-refined tracking-wider transition-all backdrop-blur-xs shadow-md"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E8A7B8]" />
                <span>Colaba Heritage Suite</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
