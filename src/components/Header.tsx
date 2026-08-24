import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BarChart3 } from 'lucide-react';
import { analytics } from '../services/analytics';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenServices: (category?: string) => void;
  onOpenExperience: () => void;
  onOpenAnalytics: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenServices,
  onOpenExperience,
  onOpenAnalytics,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string, customAction?: () => void) => {
    setMobileMenuOpen(false);
    if (customAction) {
      customAction();
      return;
    }
    onNavigateSection(id);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FFF9FA]/95 backdrop-blur-md py-4 border-b border-[#E8A7B8]/25 shadow-xs'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            id="header-logo-btn"
            onClick={() => handleLinkClick('hero')}
            className="group flex flex-col items-start cursor-pointer text-left focus:outline-hidden"
          >
            <span
              className={`font-serif-luxury text-2xl sm:text-3xl tracking-[0.25em] font-light transition-colors duration-300 ${
                isScrolled ? 'text-[#5A2738] group-hover:text-[#E8A7B8]' : 'text-[#FFF9FA] group-hover:text-[#E8A7B8]'
              }`}
            >
              AURAÉ
            </span>
            <span
              className={`font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.35em] -mt-0.5 ${
                isScrolled ? 'text-[#5A2738]/60' : 'text-[#F6DDE3]/80'
              }`}
            >
              MAISON · MUMBAI
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-10 lg:space-x-12">
            <button
              id="nav-maison"
              onClick={() => handleLinkClick('maison')}
              className={`text-xs uppercase tracking-[0.25em] transition-colors font-sans-refined relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#E8A7B8] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                isScrolled ? 'text-[#5A2738]/80 hover:text-[#5A2738]' : 'text-[#FFF9FA]/80 hover:text-[#FFF9FA]'
              }`}
            >
              MAISON
            </button>
            <button
              id="nav-services"
              onClick={() => {
                analytics.track('service_view', { source: 'header_nav' });
                onOpenServices();
              }}
              className={`text-xs uppercase tracking-[0.25em] transition-colors font-sans-refined relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#E8A7B8] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                isScrolled ? 'text-[#5A2738]/80 hover:text-[#5A2738]' : 'text-[#FFF9FA]/80 hover:text-[#FFF9FA]'
              }`}
            >
              SERVICES
            </button>
            <button
              id="nav-experience"
              onClick={() => {
                onOpenExperience();
              }}
              className={`text-xs uppercase tracking-[0.25em] transition-colors font-sans-refined relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#E8A7B8] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                isScrolled ? 'text-[#5A2738]/80 hover:text-[#5A2738]' : 'text-[#FFF9FA]/80 hover:text-[#FFF9FA]'
              }`}
            >
              EXPERIENCE
            </button>
            <button
              id="nav-atelier"
              onClick={() => handleLinkClick('atelier')}
              className={`text-xs uppercase tracking-[0.25em] transition-colors font-sans-refined relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#E8A7B8] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                isScrolled ? 'text-[#5A2738]/80 hover:text-[#5A2738]' : 'text-[#FFF9FA]/80 hover:text-[#FFF9FA]'
              }`}
            >
              ATELIER
            </button>
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="header-analytics-trigger"
              onClick={onOpenAnalytics}
              title="View Real-Time Analytics"
              className={`p-2 rounded-full transition-colors ${
                isScrolled ? 'text-[#5A2738] hover:bg-[#F6DDE3]/50' : 'text-[#FFF9FA]/80 hover:text-[#FFF9FA] hover:bg-[#5A2738]/40'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#E8A7B8]" />
            </button>

            <button
              id="header-book-btn"
              onClick={() => {
                analytics.track('booking_start', { source: 'header' });
                onOpenBooking();
              }}
              className={`px-6 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 cursor-pointer shadow-md ${
                isScrolled
                  ? 'bg-[#5A2738] text-[#FFF9FA] hover:bg-[#E8A7B8] hover:text-[#5A2738]'
                  : 'bg-[#E8A7B8] text-[#5A2738] hover:bg-[#FFF9FA] hover:text-[#5A2738]'
              }`}
            >
              BOOK
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              id="mobile-analytics-trigger"
              onClick={onOpenAnalytics}
              className={`p-2 ${isScrolled ? 'text-[#5A2738]' : 'text-[#E8A7B8]'}`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-hidden ${isScrolled ? 'text-[#5A2738]' : 'text-[#FFF9FA]'}`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-[#FFF9FA] text-[#5A2738] flex flex-col justify-between px-8 pt-28 pb-12 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8A7B8] font-semibold">
                Menu
              </span>

              <button
                id="mobile-nav-maison"
                onClick={() => handleLinkClick('maison')}
                className="text-left font-serif-luxury text-3xl text-[#5A2738] tracking-wider hover:text-[#E8A7B8] transition-colors"
              >
                MAISON
              </button>

              <button
                id="mobile-nav-services"
                onClick={() => {
                  setMobileMenuOpen(false);
                  analytics.track('service_view', { source: 'mobile_nav' });
                  onOpenServices();
                }}
                className="text-left font-serif-luxury text-3xl text-[#5A2738] tracking-wider hover:text-[#E8A7B8] transition-colors"
              >
                SERVICES
              </button>

              <button
                id="mobile-nav-experience"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenExperience();
                }}
                className="text-left font-serif-luxury text-3xl text-[#5A2738] tracking-wider hover:text-[#E8A7B8] transition-colors"
              >
                EXPERIENCE
              </button>

              <button
                id="mobile-nav-atelier"
                onClick={() => handleLinkClick('atelier')}
                className="text-left font-serif-luxury text-3xl text-[#5A2738] tracking-wider hover:text-[#E8A7B8] transition-colors"
              >
                ATELIER
              </button>

              <button
                id="mobile-nav-artists"
                onClick={() => handleLinkClick('artists')}
                className="text-left font-serif-luxury text-3xl text-[#5A2738] tracking-wider hover:text-[#E8A7B8] transition-colors"
              >
                ARTISTS
              </button>
            </div>

            <div className="pt-8 border-t border-[#E8A7B8]/20 flex flex-col space-y-4">
              <button
                id="mobile-nav-book-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  analytics.track('booking_start', { source: 'mobile_menu' });
                  onOpenBooking();
                }}
                className="w-full py-3.5 bg-[#5A2738] text-[#FFF9FA] text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#E8A7B8] hover:text-[#5A2738] transition-colors text-center shadow-lg"
              >
                BOOK YOUR EXPERIENCE
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#5A2738]/70 pt-2 font-sans-refined">
                <span>Pali Hill · Colaba | Mumbai</span>
                <span>+91 98200 45890</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
