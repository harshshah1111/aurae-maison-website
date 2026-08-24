import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MaisonIntro } from './components/MaisonIntro';
import { SignatureServices } from './components/SignatureServices';
import { Experience } from './components/Experience';
import { Atelier } from './components/Atelier';
import { Gallery } from './components/Gallery';
import { Artists } from './components/Artists';
import { Testimonial } from './components/Testimonial';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServicesModal } from './components/ServicesModal';
import { ExperienceModal } from './components/ExperienceModal';
import { AnalyticsDrawer } from './components/AnalyticsDrawer';
import { CustomCursor } from './components/CustomCursor';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { Artist, ServiceCategory, ServiceItem } from './types';
import { analytics } from './services/analytics';

export default function App() {
  // Modal states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Pre-selected states for booking
  const [bookingCategory, setBookingCategory] = useState<ServiceCategory | ''>('HAIR');
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingArtist, setBookingArtist] = useState<Artist | null>(null);

  // Scroll analytics tracking
  useEffect(() => {
    let scrolled50 = false;
    let scrolled90 = false;

    const handleScrollAnalytics = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = (window.scrollY / scrollHeight) * 100;

      if (progress >= 50 && !scrolled50) {
        scrolled50 = true;
        analytics.track('scroll_50');
      }
      if (progress >= 90 && !scrolled90) {
        scrolled90 = true;
        analytics.track('scroll_90');
      }
    };

    window.addEventListener('scroll', handleScrollAnalytics, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollAnalytics);
  }, []);

  const handleOpenBooking = (category?: ServiceCategory, serviceId?: string, artist?: Artist) => {
    if (category) setBookingCategory(category);
    if (serviceId) setBookingServiceId(serviceId);
    if (artist) setBookingArtist(artist);
    setBookingOpen(true);
  };

  const handleSelectCategory = (category: ServiceCategory) => {
    setBookingCategory(category);
    setServicesOpen(true);
  };

  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setServicesOpen(false);
    setBookingCategory(service.category);
    setBookingServiceId(service.id);
    setBookingOpen(true);
  };

  const handleSelectArtistForBooking = (artist: Artist) => {
    setBookingArtist(artist);
    setBookingCategory('HAIR');
    setBookingOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-[#5A2738] font-sans-refined selection:bg-[#E8A7B8] selection:text-[#5A2738]">
      {/* Floating Custom "VIEW" Cursor for Gallery & Major Imagery */}
      <CustomCursor />

      {/* Primary Clean Navigation */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenServices={(category) => {
          if (category) setBookingCategory(category as ServiceCategory);
          setServicesOpen(true);
        }}
        onOpenExperience={() => setExperienceOpen(true)}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* 01 — DESIRE: Hero */}
      <Hero
        onOpenBooking={() => handleOpenBooking()}
        onExplore={() => handleNavigateSection('maison')}
      />

      {/* 02 — IDENTITY: Maison Introduction */}
      <MaisonIntro />

      {/* 03 — DISCOVERY: 4 Signature Pillars */}
      <SignatureServices onSelectCategory={handleSelectCategory} />

      {/* 04 — EXPERIENCE: Storytelling Section */}
      <Experience onOpenExperienceModal={() => setExperienceOpen(true)} />

      {/* 05 — ENVIRONMENT: The Atelier */}
      <Atelier />

      {/* 06 — VISUAL GALLERY: Editorial Asymmetric Grid */}
      <Gallery />

      {/* 07 — MASTERY: Curated Artists */}
      <Artists onSelectArtistForBooking={handleSelectArtistForBooking} />

      {/* 08 — PROOF: Single Beautiful Testimonial */}
      <Testimonial />

      {/* 09 — ACTION: High-Impact Pink Final CTA */}
      <FinalCTA onOpenBooking={() => handleOpenBooking()} />

      {/* 10 — FOOTER: Minimalist Luxury Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenServices={() => setServicesOpen(true)}
        onOpenExperience={() => setExperienceOpen(true)}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Mobile Sticky Book Pill */}
      <MobileStickyCTA onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          setBookingArtist(null);
          setBookingServiceId(undefined);
        }}
        initialCategory={bookingCategory}
        initialServiceId={bookingServiceId}
        initialArtist={bookingArtist}
      />

      <ServicesModal
        isOpen={servicesOpen}
        onClose={() => setServicesOpen(false)}
        initialCategory={bookingCategory || 'HAIR'}
        onSelectServiceForBooking={handleSelectServiceForBooking}
      />

      <ExperienceModal
        isOpen={experienceOpen}
        onClose={() => setExperienceOpen(false)}
        onOpenBooking={() => {
          setExperienceOpen(false);
          handleOpenBooking();
        }}
      />

      <AnalyticsDrawer
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />
    </div>
  );
}
