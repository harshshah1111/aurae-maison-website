import React from 'react';
import { motion } from 'motion/react';
import { ARTISTS } from '../data/salonData';
import { Artist } from '../types';
import { analytics } from '../services/analytics';

interface ArtistsProps {
  onSelectArtistForBooking: (artist: Artist) => void;
}

export const Artists: React.FC<ArtistsProps> = ({ onSelectArtistForBooking }) => {
  const handleArtistClick = (artist: Artist) => {
    analytics.track('artist_view', { artistId: artist.id, name: artist.name });
    onSelectArtistForBooking(artist);
  };

  return (
    <section id="artists" className="py-24 sm:py-36 bg-[#FFF9FA] border-b border-[#E8A7B8]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 border-b border-[#E8A7B8]/20 pb-6">
          <div>
            <span className="text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold block mb-2">
              MASTERY
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#5A2738] font-light">
              The Artists
            </h3>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined mt-3 sm:mt-0">
            Craftsmanship in residence
          </span>
        </div>

        {/* 3 Large Portraits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {ARTISTS.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onClick={() => handleArtistClick(artist)}
              data-cursor="view"
              data-cursor-text="BOOK"
              className="group cursor-pointer flex flex-col p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8A7B8]/30 hover:border-[#5A2738] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Portrait Image */}
              <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-[#5A2738] mb-6 shadow-md">
                <img
                  src={artist.image}
                  alt={artist.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0 brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5A2738]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-sans-refined text-[#E8A7B8] font-semibold">
                    Request Appointment →
                  </span>
                </div>
              </div>

              {/* Minimal Text Information */}
              <h4 className="font-serif-luxury text-2xl text-[#5A2738] tracking-wider mb-1 group-hover:text-[#E8A7B8] transition-colors">
                {artist.name}
              </h4>
              <p className="text-xs uppercase tracking-[0.2em] text-[#E8A7B8] font-sans-refined mb-2 font-medium">
                {artist.role}
              </p>
              <p className="text-xs text-[#5A2738]/70 font-sans-refined font-light leading-relaxed">
                {artist.specialty}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
