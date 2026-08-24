import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ExperienceProps {
  onOpenExperienceModal: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenExperienceModal }) => {
  return (
    <section id="experience" className="py-24 sm:py-36 bg-[#F6DDE3]/35 relative overflow-hidden border-b border-[#E8A7B8]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Editorial Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative"
          >
            <div
              data-cursor="view"
              data-cursor-text="DISCOVER"
              onClick={onOpenExperienceModal}
              className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/11] bg-[#FFFFFF] border border-[#E8A7B8]/30 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85"
                alt="AURAÉ Experience Ritual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A2738]/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold mb-4">
              THE AURAÉ EXPERIENCE
            </span>

            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light text-[#5A2738] leading-[1.08] mb-6">
              Arrive. Unwind.
              <br />
              <span className="italic font-normal text-[#E8A7B8]">Become.</span>
            </h2>

            <p className="text-base sm:text-lg font-light text-[#5A2738]/80 font-sans-refined mb-8 sm:mb-10 leading-relaxed max-w-md">
              Every visit begins with understanding you.
            </p>

            <button
              id="experience-discover-btn"
              onClick={onOpenExperienceModal}
              className="group inline-flex items-center space-x-3 px-7 py-3.5 bg-[#5A2738] text-[#FFF9FA] text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#E8A7B8] hover:text-[#5A2738] transition-all duration-300 cursor-pointer shadow-md"
            >
              <span>DISCOVER THE EXPERIENCE</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
