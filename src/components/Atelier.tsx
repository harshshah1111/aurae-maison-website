import React from 'react';
import { MapPin } from 'lucide-react';
import { analytics } from '../services/analytics';
import { ScrollExpand } from './ScrollExpand';

export const Atelier: React.FC = () => {
  return (
    <section id="atelier" className="bg-[#FFF9FA] relative border-b border-[#E8A7B8]/20">
      <ScrollExpand
        src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=2000&q=90"
        alt="AURAÉ Atelier Architecture Mumbai"
        title="THE ATELIER"
        scrollHint="Scroll to Explore Sanctuary"
        startWidth={60}
        startHeight={64}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.3}
        scrollDistance={1.3}
        holdDistance={0.4}
        smoothing={0.12}
        overlayScrim={0.65}
        useWindowScroll
      >
        <div className="relative z-10 max-w-3xl text-center flex flex-col items-center px-4">
          <span className="text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold mb-3">
            THE ATELIER
          </span>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#FFF9FA] leading-[1.05] tracking-[0.03em] mb-4">
            A SPACE
            <br />
            <span className="italic font-normal text-[#F6DDE3]">TO EXHALE.</span>
          </h2>

          <p className="text-base sm:text-xl font-light text-[#FFF9FA]/90 font-sans-refined mb-8 max-w-lg leading-relaxed">
            Designed for beauty, comfort and quiet moments across our Mumbai suites.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://maps.google.com/?q=Pali+Hill+Bandra+West+Mumbai"
              target="_blank"
              rel="noreferrer"
              onClick={() => analytics.track('maps_click', { location: 'pali_hill' })}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#5A2738]/85 hover:bg-[#E8A7B8] hover:text-[#5A2738] border border-[#E8A7B8]/50 text-[#FFF9FA] text-xs font-sans-refined tracking-wider transition-all backdrop-blur-md shadow-lg"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E8A7B8]" />
              <span>Pali Hill · Bandra West</span>
            </a>

            <a
              href="https://maps.google.com/?q=Colaba+Mumbai"
              target="_blank"
              rel="noreferrer"
              onClick={() => analytics.track('maps_click', { location: 'colaba' })}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#5A2738]/85 hover:bg-[#E8A7B8] hover:text-[#5A2738] border border-[#E8A7B8]/50 text-[#FFF9FA] text-xs font-sans-refined tracking-wider transition-all backdrop-blur-md shadow-lg"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E8A7B8]" />
              <span>Colaba Heritage Suite</span>
            </a>
          </div>
        </div>
      </ScrollExpand>
    </section>
  );
};

