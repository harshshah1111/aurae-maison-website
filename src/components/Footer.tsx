import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { analytics } from '../services/analytics';
import { BarChart3 } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenServices: () => void;
  onOpenExperience: () => void;
  onOpenAnalytics: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenServices,
  onOpenExperience,
  onOpenAnalytics,
  onNavigateSection,
}) => {
  return (
    <footer id="main-footer" className="bg-[#5A2738] text-[#FFF9FA] pt-20 pb-12 border-t border-[#E8A7B8]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E8A7B8]/20">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <span className="font-serif-luxury text-3xl sm:text-4xl tracking-[0.25em] font-light text-[#FFF9FA] mb-2">
              AURAÉ MAISON
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-[#E8A7B8] font-sans-refined mb-6">
              Mumbai, India
            </span>
            <p className="text-sm font-light text-[#FFF9FA]/75 font-sans-refined max-w-sm leading-relaxed mb-6">
              A modern beauty atelier dedicated to precision hair, dermal skin therapy, and bespoke aesthetic rituals.
            </p>
            <div className="flex items-center space-x-6 text-xs font-sans-refined tracking-wider text-[#F6DDE3]">
              <span>Pali Hill, Bandra West</span>
              <span>·</span>
              <span>Colaba Heritage Suite</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 flex flex-col justify-start space-y-3 font-sans-refined">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#E8A7B8] font-semibold mb-2">
              Navigation
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs uppercase tracking-[0.2em] text-[#FFF9FA]/85">
              <button
                onClick={() => onNavigateSection('maison')}
                className="hover:text-[#E8A7B8] transition-colors cursor-pointer text-left"
              >
                MAISON
              </button>
              <button
                onClick={() => {
                  analytics.track('service_view', { source: 'footer' });
                  onOpenServices();
                }}
                className="hover:text-[#E8A7B8] transition-colors cursor-pointer text-left"
              >
                SERVICES
              </button>
              <button
                onClick={onOpenExperience}
                className="hover:text-[#E8A7B8] transition-colors cursor-pointer text-left"
              >
                EXPERIENCE
              </button>
              <button
                onClick={() => onNavigateSection('atelier')}
                className="hover:text-[#E8A7B8] transition-colors cursor-pointer text-left"
              >
                ATELIER
              </button>
              <button
                onClick={() => onNavigateSection('artists')}
                className="hover:text-[#E8A7B8] transition-colors cursor-pointer text-left"
              >
                ARTISTS
              </button>
            </div>

            <div className="pt-4">
              <a
                href={SALON_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                onClick={() => analytics.track('instagram_click')}
                className="inline-block text-xs uppercase tracking-[0.25em] text-[#E8A7B8] hover:text-[#FFF9FA] transition-colors"
              >
                Instagram {SALON_INFO.socials.instagramHandle} ↗
              </a>
            </div>
          </div>

          {/* Action & Concierge */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <button
              id="footer-book-btn"
              onClick={() => {
                analytics.track('booking_start', { source: 'footer' });
                onOpenBooking();
              }}
              className="px-7 py-3.5 bg-[#E8A7B8] text-[#5A2738] text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#FFF9FA] hover:text-[#5A2738] transition-all duration-300 shadow-lg cursor-pointer"
            >
              Book Your Experience
            </button>

            <div className="mt-8 md:mt-0 text-left md:text-right">
              <a
                href={`tel:${SALON_INFO.socials.phone.replace(/\s+/g, '')}`}
                onClick={() => analytics.track('phone_click')}
                className="block text-sm font-sans-refined text-[#FFF9FA]/85 hover:text-[#E8A7B8] transition-colors"
              >
                {SALON_INFO.socials.phone}
              </a>
              <span className="text-[11px] text-[#F6DDE3]/60 font-sans-refined block mt-1">
                {SALON_INFO.socials.email}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF9FA]/50 font-sans-refined tracking-wider gap-4">
          <div className="flex items-center space-x-6">
            <span>© {new Date().getFullYear()} AURAÉ MAISON. All Rights Reserved.</span>
            <span>·</span>
            <span className="hover:text-[#FFF9FA] cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:text-[#FFF9FA] cursor-pointer">Terms</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenAnalytics}
              className="inline-flex items-center space-x-1.5 text-[#E8A7B8] hover:text-[#FFF9FA] transition-colors cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase tracking-widest">Live Analytics</span>
            </button>

            <span className="italic font-serif-luxury text-sm text-[#F6DDE3]">
              Beauty, refined.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
