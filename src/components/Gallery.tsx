import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/salonData';
import { GalleryItem } from '../types';
import { analytics } from '../services/analytics';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const handleImageClick = (item: GalleryItem) => {
    analytics.track('gallery_view', { imageId: item.id, title: item.title });
    setSelectedImage(item);
  };

  return (
    <section id="gallery" className="py-24 sm:py-36 bg-[#FFF9FA] border-b border-[#E8A7B8]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 border-b border-[#E8A7B8]/20 pb-6">
          <div>
            <span className="text-[11px] font-sans-refined uppercase tracking-[0.4em] text-[#E8A7B8] font-semibold block mb-2">
              EXPRESSION
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#5A2738] font-light">
              Visual Atelier
            </h3>
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#5A2738]/60 font-sans-refined mt-3 sm:mt-0">
            Hair · Skin · Beauty · Nails · Editorial
          </span>
        </div>

        {/* Curated Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_IMAGES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              onClick={() => handleImageClick(item)}
              data-cursor="view"
              data-cursor-text="VIEW"
              className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-[#FFFFFF] border border-[#E8A7B8]/30 hover:border-[#5A2738] transition-all duration-500 shadow-md hover:shadow-xl ${
                item.span ? item.span : ''
              } ${item.aspect || 'aspect-[3/4]'}`}
            >
              <img
                src={item.image}
                alt={`${item.category} — ${item.title}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-95"
              />

              {/* Minimal Editorial Category Badge (always visible, discreet) */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="inline-block px-3 py-1 rounded-full bg-[#5A2738]/80 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-[#FFF9FA] font-medium border border-[#E8A7B8]/30 shadow-xs">
                  {item.number ? `${item.number} — ` : ''}{item.category}
                </span>
              </div>

              {/* Subtle Hover Gradient & Information Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A2738]/95 via-[#5A2738]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-sans-refined uppercase tracking-[0.3em] text-[#E8A7B8] mb-1 block">
                      {item.category}
                    </span>
                    <h4 className="font-serif-luxury text-2xl text-[#FFF9FA] font-light">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans-refined text-[#E8A7B8] border-b border-[#E8A7B8]/60 pb-0.5">
                    VIEW
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#5A2738]/95 backdrop-blur-md flex items-center justify-center p-6 sm:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 text-[#FFF9FA]/80 hover:text-[#FFF9FA] rounded-full bg-[#FFF9FA]/10 hover:bg-[#FFF9FA]/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-[#E8A7B8]/30"
              />
              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8A7B8] font-sans-refined block mb-1">
                  {selectedImage.number ? `${selectedImage.number} — ` : ''}{selectedImage.category}
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#FFF9FA] font-light">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
