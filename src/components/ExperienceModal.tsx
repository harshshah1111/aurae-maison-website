import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, HeartHandshake, ShieldCheck, Flower2 } from 'lucide-react';
import { EXPERIENCE_STEPS } from '../data/salonData';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#5A2738]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FFF9FA] text-[#5A2738] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative border border-[#E8A7B8]/40 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 sm:px-10 py-6 border-b border-[#E8A7B8]/20 flex items-center justify-between bg-[#FFF9FA] shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold block mb-1">
              THE PHILOSOPHY
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#5A2738] font-light">
              The Auraé Experience
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-[#5A2738]/60 hover:text-[#5A2738] hover:bg-[#F6DDE3]/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Storytelling Content */}
        <div className="p-6 sm:p-10 overflow-y-auto grow space-y-10">
          {/* Visual Hero Quote */}
          <div className="relative rounded-2xl overflow-hidden bg-[#5A2738] border border-[#E8A7B8]/30 p-8 sm:p-12 text-center text-[#FFF9FA]">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85"
              alt="AURAÉ Atmosphere"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover filter brightness-45"
            />
            <div className="relative z-10 max-w-lg mx-auto">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#E8A7B8] block mb-3 font-sans-refined">
                Arrive. Unwind. Become.
              </span>
              <h4 className="font-serif-luxury text-2xl sm:text-3xl font-light italic leading-snug">
                &ldquo;Every appointment is a private interlude crafted around quiet luxury and deliberate precision.&rdquo;
              </h4>
            </div>
          </div>

          {/* 4-Step Sensory Journey */}
          <div className="space-y-6">
            <h4 className="font-serif-luxury text-2xl text-[#5A2738] border-b border-[#E8A7B8]/20 pb-3">
              The Four Pillars of Every Visit
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EXPERIENCE_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8A7B8]/30 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-sans-refined uppercase tracking-[0.25em] text-[#E8A7B8] font-bold block mb-2">
                      {step.step}
                    </span>
                    <h5 className="font-serif-luxury text-xl text-[#5A2738] mb-2 font-normal">
                      {step.title}
                    </h5>
                    <p className="text-xs text-[#5A2738]/75 font-sans-refined font-light leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sanctuary Touchpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8A7B8]/20 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#F6DDE3] flex items-center justify-center text-[#5A2738] mb-3">
                <Flower2 className="w-5 h-5 text-[#5A2738]" />
              </div>
              <h6 className="font-serif-luxury text-lg mb-1 text-[#5A2738]">Pure Botanicals</h6>
              <p className="text-[11px] text-[#5A2738]/65 font-sans-refined">
                Cruelty-free, bio-mimetic formulations from France and Japan.
              </p>
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#F6DDE3] flex items-center justify-center text-[#5A2738] mb-3">
                <ShieldCheck className="w-5 h-5 text-[#5A2738]" />
              </div>
              <h6 className="font-serif-luxury text-lg mb-1 text-[#5A2738]">Private Suites</h6>
              <p className="text-[11px] text-[#5A2738]/65 font-sans-refined">
                Acoustically treated private booths for total discretion.
              </p>
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#F6DDE3] flex items-center justify-center text-[#5A2738] mb-3">
                <HeartHandshake className="w-5 h-5 text-[#5A2738]" />
              </div>
              <h6 className="font-serif-luxury text-lg mb-1 text-[#5A2738]">Concierge Care</h6>
              <p className="text-[11px] text-[#5A2738]/65 font-sans-refined">
                Continuous post-treatment aesthetic advisory and home regimens.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-6 sm:px-10 py-5 bg-[#FFF9FA] border-t border-[#E8A7B8]/20 flex items-center justify-between shrink-0">
          <span className="text-xs text-[#5A2738]/60 font-sans-refined hidden sm:inline">
            Experience bookings are strictly limited daily.
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#5A2738] text-[#FFF9FA] text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#E8A7B8] hover:text-[#5A2738] transition-all duration-300 shadow-md cursor-pointer"
          >
            BOOK YOUR EXPERIENCE
          </button>
        </div>
      </motion.div>
    </div>
  );
};
