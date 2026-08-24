import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORY_PANELS } from '../data/salonData';
import { ServiceCategory } from '../types';
import { analytics } from '../services/analytics';

interface SignatureServicesProps {
  onSelectCategory: (category: ServiceCategory) => void;
}

export const SignatureServices: React.FC<SignatureServicesProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (cat: ServiceCategory) => {
    analytics.track('service_category_click', { category: cat });
    onSelectCategory(cat);
  };

  return (
    <section id="services-categories" className="py-20 sm:py-32 bg-[#FFF9FA] border-b border-[#E8A7B8]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Minimal Section Label */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 border-b border-[#E8A7B8]/20 pb-6">
          <div>
            <span className="text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold block mb-2">
              DISCOVERY
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#5A2738] font-light">
              Signature Pillars
            </h3>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined mt-3 sm:mt-0">
            Select to explore treatments
          </span>
        </div>

        {/* 4 Large Visual Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CATEGORY_PANELS.map((item, index) => (
            <motion.div
              key={item.category}
              id={`service-panel-${item.category.toLowerCase()}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              onClick={() => handleCategoryClick(item.category)}
              data-cursor="view"
              data-cursor-text="EXPLORE"
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#FFFFFF] border border-[#E8A7B8]/30 aspect-[3/4] flex flex-col justify-end p-6 sm:p-8 hover:border-[#5A2738] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Background Image with Hover Scale */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={`AURAÉ ${item.title}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-90 group-hover:brightness-95"
                />
                {/* Refined Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#5A2738]/95 via-[#5A2738]/40 to-transparent transition-opacity duration-500 group-hover:opacity-85" />
              </div>

              {/* Panel Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif-luxury text-3xl sm:text-4xl text-[#FFF9FA] tracking-[0.1em] font-light transform transition-transform duration-300 group-hover:-translate-y-1">
                    {item.title}
                  </h4>
                  <div className="w-9 h-9 rounded-full bg-[#FFF9FA]/20 backdrop-blur-xs flex items-center justify-center text-[#FFF9FA] group-hover:bg-[#E8A7B8] group-hover:text-[#5A2738] transition-all duration-300 transform group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-[#F6DDE3]/90 font-sans-refined font-light leading-relaxed line-clamp-2">
                  {item.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
