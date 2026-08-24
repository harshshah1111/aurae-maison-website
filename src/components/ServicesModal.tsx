import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { ALL_SERVICES } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types';
import { analytics } from '../services/analytics';
import GradualBlur from './GradualBlur';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ServiceCategory;
  onSelectServiceForBooking: (service: ServiceItem) => void;
}

const CATEGORIES: ServiceCategory[] = ['HAIR', 'SKIN', 'BEAUTY', 'NAILS'];

export const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'HAIR',
  onSelectServiceForBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(initialCategory);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  if (!isOpen) return null;

  const currentServices = ALL_SERVICES.filter((s) => s.category === activeCategory);

  const handleSelect = (service: ServiceItem) => {
    analytics.track('service_view', { serviceId: service.id, name: service.name, category: service.category });
    onSelectServiceForBooking(service);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#5A2738]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FFF9FA] text-[#5A2738] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative border border-[#E8A7B8]/40 flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="px-6 sm:px-10 py-6 border-b border-[#E8A7B8]/20 flex items-center justify-between bg-[#FFF9FA] shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold block mb-1">
              HAUTE CATALOGUE
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#5A2738] font-light">
              Services & Rituals
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-[#5A2738]/60 hover:text-[#5A2738] hover:bg-[#F6DDE3]/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 sm:px-10 pt-4 pb-2 border-b border-[#E8A7B8]/20 flex space-x-6 sm:space-x-10 overflow-x-auto shrink-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                analytics.track('service_category_click', { category: cat, source: 'services_modal' });
              }}
              className={`py-3 text-xs uppercase tracking-[0.25em] font-sans-refined transition-all relative whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'text-[#5A2738] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#5A2738]'
                  : 'text-[#5A2738]/50 hover:text-[#5A2738]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Rows List with GradualBlur Edge Transitions */}
        <div className="relative grow overflow-hidden flex flex-col min-h-0">
          <div className="p-6 sm:p-10 overflow-y-auto grow divide-y divide-[#E8A7B8]/20">
            {currentServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleSelect(service)}
                className="group py-6 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#F6DDE3]/30 px-4 -mx-4 rounded-xl transition-colors"
              >
                <div className="max-w-xl">
                  <div className="flex items-center space-x-3 mb-1.5">
                    <h4 className="font-serif-luxury text-2xl text-[#5A2738] font-light group-hover:text-[#5A2738] transition-colors">
                      {service.name}
                    </h4>
                    {service.tag && (
                      <span className="inline-flex items-center space-x-1 text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F6DDE3] text-[#5A2738] font-medium border border-[#E8A7B8]/40">
                        <Sparkles className="w-2.5 h-2.5 text-[#5A2738]" />
                        <span>{service.tag}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5A2738]/75 font-sans-refined font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-6 shrink-0 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right font-sans-refined">
                    <span className="block text-sm font-semibold text-[#5A2738]">
                      {service.price}
                    </span>
                    <span className="block text-[11px] text-[#5A2738]/60 tracking-wider">
                      {service.duration}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E8A7B8]/40 group-hover:bg-[#5A2738] text-[#5A2738] group-hover:text-[#FFF9FA] flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <GradualBlur
            target="parent"
            position="top"
            height="2rem"
            strength={1.5}
            divCount={4}
            opacity={0.85}
          />
          <GradualBlur
            target="parent"
            position="bottom"
            height="2.5rem"
            strength={2}
            divCount={5}
            curve="bezier"
            opacity={0.9}
          />
        </div>

        {/* Footer Note */}
        <div className="px-6 sm:px-10 py-4 bg-[#F6DDE3]/40 border-t border-[#E8A7B8]/20 flex flex-col sm:flex-row items-center justify-between text-xs font-sans-refined text-[#5A2738]/80 gap-3 shrink-0">
          <span>All appointments include complimentary bespoke consultation & white peach infusion.</span>
          <button
            onClick={() => {
              onClose();
              onSelectServiceForBooking(currentServices[0]);
            }}
            className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5A2738] hover:text-[#E8A7B8] transition-colors whitespace-nowrap cursor-pointer"
          >
            Reserve with Concierge →
          </button>
        </div>
      </motion.div>
    </div>
  );
};
