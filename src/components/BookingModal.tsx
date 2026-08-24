import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calendar, Clock, MapPin, User, Phone, Mail, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { ALL_SERVICES, ARTISTS, SALON_INFO } from '../data/salonData';
import { BookingData, ServiceCategory, Artist } from '../types';
import { analytics } from '../services/analytics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ServiceCategory | '';
  initialServiceId?: string;
  initialArtist?: Artist | null;
}

const CATEGORIES: ServiceCategory[] = ['HAIR', 'SKIN', 'BEAUTY', 'NAILS'];

const TIME_SLOTS = [
  '10:30 AM',
  '11:45 AM',
  '01:15 PM',
  '02:30 PM',
  '04:00 PM',
  '05:15 PM',
  '06:30 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialCategory = '',
  initialServiceId,
  initialArtist,
}) => {
  const [step, setStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    category: initialCategory || 'HAIR',
    serviceId: initialServiceId || '',
    serviceName: '',
    servicePrice: '',
    artistId: initialArtist?.id || '',
    artistName: initialArtist?.name || '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '11:45 AM',
    location: 'Pali Hill Atelier (Bandra West)',
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    specialNotes: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialCategory) {
      setBookingData((prev) => ({ ...prev, category: initialCategory }));
    }
    if (initialServiceId) {
      const match = ALL_SERVICES.find((s) => s.id === initialServiceId);
      if (match) {
        setBookingData((prev) => ({
          ...prev,
          category: match.category,
          serviceId: match.id,
          serviceName: match.name,
          servicePrice: match.price,
        }));
        setStep(2);
      }
    }
    if (initialArtist) {
      setBookingData((prev) => ({
        ...prev,
        artistId: initialArtist.id,
        artistName: initialArtist.name,
      }));
    }
  }, [initialCategory, initialServiceId, initialArtist]);

  if (!isOpen) return null;

  const filteredServices = ALL_SERVICES.filter((s) => s.category === bookingData.category);

  const handleSelectService = (service: typeof ALL_SERVICES[0]) => {
    setBookingData((prev) => ({
      ...prev,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
    }));
    analytics.track('booking_service_selected', {
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
    });
  };

  const handleNextStep = () => {
    setFormErrors({});
    if (step === 1) {
      if (!bookingData.category) return;
      setStep(2);
    } else if (step === 2) {
      if (!bookingData.serviceId) {
        setFormErrors({ service: 'Please select a signature service to proceed.' });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!bookingData.date || !bookingData.timeSlot) {
        setFormErrors({ dateTime: 'Please select your preferred date and time slot.' });
        return;
      }
      setStep(4);
    } else if (step === 4) {
      const errors: Record<string, string> = {};
      if (!bookingData.guestName.trim()) errors.guestName = 'Name is required';
      if (!bookingData.guestPhone.trim() || bookingData.guestPhone.length < 8) errors.guestPhone = 'Valid phone number is required';
      if (!bookingData.guestEmail.trim() || !bookingData.guestEmail.includes('@')) errors.guestEmail = 'Valid email is required';

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      // Submit
      analytics.track('booking_completed', {
        category: bookingData.category,
        service: bookingData.serviceName,
        artist: bookingData.artistName || 'Any Master Artist',
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        location: bookingData.location,
      });
      setSubmitted(true);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#5A2738]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FFF9FA] text-[#5A2738] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative border border-[#E8A7B8]/40 flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#E8A7B8]/20 flex items-center justify-between bg-[#FFF9FA] shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#E8A7B8] font-semibold block">
              RESERVATION ATELIER
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#5A2738]">
              {submitted ? 'Appointment Requested' : 'Your Signature Experience'}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 text-[#5A2738]/60 hover:text-[#5A2738] hover:bg-[#F6DDE3]/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto grow">
          {!submitted ? (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8A7B8]/20">
                {[
                  { num: 1, label: 'Pillar' },
                  { num: 2, label: 'Treatment' },
                  { num: 3, label: 'Schedule' },
                  { num: 4, label: 'Guest Details' },
                ].map((s) => (
                  <div
                    key={s.num}
                    onClick={() => {
                      if (s.num < step) setStep(s.num);
                    }}
                    className={`flex items-center space-x-2 text-xs font-sans-refined tracking-wider ${
                      s.num === step
                        ? 'text-[#5A2738] font-semibold'
                        : s.num < step
                        ? 'text-[#E8A7B8] cursor-pointer'
                        : 'text-[#5A2738]/30'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                        s.num === step
                          ? 'bg-[#5A2738] text-[#FFF9FA] font-bold'
                          : s.num < step
                          ? 'bg-[#E8A7B8]/25 text-[#5A2738]'
                          : 'bg-[#5A2738]/10 text-[#5A2738]/40'
                      }`}
                    >
                      {s.num < step ? '✓' : `0${s.num}`}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* STEP 1: What are you looking for? */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#E8A7B8] font-semibold block mb-1">
                      01
                    </span>
                    <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#5A2738]">
                      What are you looking for?
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setBookingData((prev) => ({
                            ...prev,
                            category: cat,
                            serviceId: '',
                            serviceName: '',
                            servicePrice: '',
                          }));
                          setStep(2);
                        }}
                        className={`p-6 text-left rounded-2xl border transition-all duration-300 flex flex-col justify-between h-36 cursor-pointer ${
                          bookingData.category === cat
                            ? 'border-[#5A2738] bg-[#5A2738] text-[#FFF9FA] shadow-lg font-semibold'
                            : 'border-[#E8A7B8]/30 bg-[#FFFFFF] hover:border-[#5A2738] text-[#5A2738] shadow-xs'
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-[0.3em] opacity-75 font-sans-refined">
                          Pillar
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="font-serif-luxury text-3xl tracking-wider font-light">
                            {cat}
                          </span>
                          <ArrowRight className="w-4 h-4 opacity-75" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Choose your service */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-[#E8A7B8] font-semibold block mb-1">
                        02 · {bookingData.category}
                      </span>
                      <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#5A2738]">
                        Choose your service
                      </h4>
                    </div>
                  </div>

                  {formErrors.service && (
                    <p className="text-xs text-rose-500 font-sans-refined">{formErrors.service}</p>
                  )}

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleSelectService(service)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          bookingData.serviceId === service.id
                            ? 'border-[#5A2738] bg-[#F6DDE3]/40 text-[#5A2738] shadow-xs'
                            : 'border-[#E8A7B8]/30 bg-[#FFFFFF] hover:border-[#5A2738] text-[#5A2738]'
                        }`}
                      >
                        <div className="pr-4">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-serif-luxury text-lg tracking-wide text-[#5A2738]">
                              {service.name}
                            </h5>
                            {service.tag && (
                              <span
                                className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  bookingData.serviceId === service.id
                                    ? 'bg-[#5A2738] text-[#FFF9FA] font-semibold'
                                    : 'bg-[#E8A7B8]/20 text-[#5A2738]'
                                }`}
                              >
                                {service.tag}
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-xs font-sans-refined ${
                              bookingData.serviceId === service.id
                                ? 'text-[#5A2738] font-medium'
                                : 'text-[#5A2738]/60'
                            }`}
                          >
                            {service.duration} · From {service.price}
                          </span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                            bookingData.serviceId === service.id
                              ? 'bg-[#5A2738] border-[#5A2738] text-[#FFF9FA]'
                              : 'border-[#5A2738]/20 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Optional Preferred Artist */}
                  <div className="pt-4 border-t border-[#E8A7B8]/20">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined block mb-2">
                      Master Artist Preference (Optional)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setBookingData((prev) => ({
                            ...prev,
                            artistId: '',
                            artistName: '',
                          }))
                        }
                        className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                          !bookingData.artistId
                            ? 'bg-[#5A2738] text-[#FFF9FA] border-[#5A2738] font-semibold'
                            : 'bg-[#FFFFFF] border-[#E8A7B8]/30 text-[#5A2738] hover:border-[#5A2738]'
                        }`}
                      >
                        Any Director
                      </button>
                      {ARTISTS.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() =>
                            setBookingData((prev) => ({
                              ...prev,
                              artistId: a.id,
                              artistName: a.name,
                            }))
                          }
                          className={`py-2 px-3 text-xs rounded-lg border text-center transition-all truncate cursor-pointer ${
                            bookingData.artistId === a.id
                              ? 'bg-[#5A2738] text-[#FFF9FA] border-[#5A2738] font-semibold'
                              : 'bg-[#FFFFFF] border-[#E8A7B8]/30 text-[#5A2738] hover:border-[#5A2738]'
                          }`}
                        >
                          {a.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Preferred date & location */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#E8A7B8] font-semibold block mb-1">
                      03
                    </span>
                    <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#5A2738]">
                      Preferred Date & Suite
                    </h4>
                  </div>

                  {/* Atelier Location Selection */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined block">
                      Atelier Location
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SALON_INFO.locations.map((loc) => (
                        <div
                          key={loc.id}
                          onClick={() =>
                            setBookingData((prev) => ({
                              ...prev,
                              location: `${loc.name} (${loc.id === 'bandra' ? 'Bandra West' : 'Colaba'})`,
                            }))
                          }
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            bookingData.location.includes(loc.name)
                              ? 'bg-[#5A2738] text-[#FFF9FA] border-[#5A2738] font-semibold'
                              : 'bg-[#FFFFFF] border-[#E8A7B8]/30 hover:border-[#5A2738] text-[#5A2738]'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="font-serif-luxury text-base">{loc.name}</span>
                          </div>
                          <p className="text-[11px] font-sans-refined opacity-80 line-clamp-1">
                            {loc.address}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Input */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined block">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={bookingData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) =>
                          setBookingData((prev) => ({ ...prev, date: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E8A7B8]/40 rounded-xl text-sm font-sans-refined text-[#5A2738] focus:outline-hidden focus:border-[#5A2738]"
                      />
                      <Calendar className="w-4 h-4 text-[#5A2738] absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined block">
                      Time Slot
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() =>
                            setBookingData((prev) => ({ ...prev, timeSlot: slot }))
                          }
                          className={`py-2 px-2 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                            bookingData.timeSlot === slot
                              ? 'bg-[#5A2738] text-[#FFF9FA] border-[#5A2738] font-semibold'
                              : 'bg-[#FFFFFF] border-[#E8A7B8]/30 hover:border-[#5A2738] text-[#5A2738]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Your details */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div className="mb-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#E8A7B8] font-semibold block mb-1">
                      04
                    </span>
                    <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#5A2738]">
                      Your details
                    </h4>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-[#F6DDE3]/30 border border-[#E8A7B8]/30 text-xs font-sans-refined space-y-1">
                    <div className="flex justify-between font-medium">
                      <span className="text-[#5A2738]">{bookingData.serviceName}</span>
                      <span className="text-[#5A2738] font-semibold">{bookingData.servicePrice}</span>
                    </div>
                    <div className="text-[#5A2738]/70">
                      {bookingData.date} at {bookingData.timeSlot} · {bookingData.location}
                    </div>
                    {bookingData.artistName && (
                      <div className="text-[#5A2738] font-medium">
                        Requested Artist: {bookingData.artistName}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined block mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Aditi Mehta"
                          value={bookingData.guestName}
                          onChange={(e) =>
                            setBookingData((prev) => ({ ...prev, guestName: e.target.value }))
                          }
                          className={`w-full px-4 py-3 bg-[#FFFFFF] border rounded-xl text-sm font-sans-refined text-[#5A2738] placeholder:text-[#5A2738]/30 focus:outline-hidden focus:border-[#5A2738] ${
                            formErrors.guestName ? 'border-rose-500' : 'border-[#E8A7B8]/40'
                          }`}
                        />
                        <User className="w-4 h-4 text-[#5A2738] absolute right-4 top-3.5 pointer-events-none" />
                      </div>
                      {formErrors.guestName && (
                        <span className="text-[11px] text-rose-500 font-sans-refined mt-1 block">
                          {formErrors.guestName}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined block mb-1">
                          Phone Number (India) *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+91 98200 XXXXX"
                            value={bookingData.guestPhone}
                            onChange={(e) =>
                              setBookingData((prev) => ({ ...prev, guestPhone: e.target.value }))
                            }
                            className={`w-full px-4 py-3 bg-[#FFFFFF] border rounded-xl text-sm font-sans-refined text-[#5A2738] placeholder:text-[#5A2738]/30 focus:outline-hidden focus:border-[#5A2738] ${
                              formErrors.guestPhone ? 'border-rose-500' : 'border-[#E8A7B8]/40'
                            }`}
                          />
                          <Phone className="w-4 h-4 text-[#5A2738] absolute right-4 top-3.5 pointer-events-none" />
                        </div>
                        {formErrors.guestPhone && (
                          <span className="text-[11px] text-rose-500 font-sans-refined mt-1 block">
                            {formErrors.guestPhone}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined block mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="aditi@example.com"
                            value={bookingData.guestEmail}
                            onChange={(e) =>
                              setBookingData((prev) => ({ ...prev, guestEmail: e.target.value }))
                            }
                            className={`w-full px-4 py-3 bg-[#FFFFFF] border rounded-xl text-sm font-sans-refined text-[#5A2738] placeholder:text-[#5A2738]/30 focus:outline-hidden focus:border-[#5A2738] ${
                              formErrors.guestEmail ? 'border-rose-500' : 'border-[#E8A7B8]/40'
                            }`}
                          />
                          <Mail className="w-4 h-4 text-[#5A2738] absolute right-4 top-3.5 pointer-events-none" />
                        </div>
                        {formErrors.guestEmail && (
                          <span className="text-[11px] text-rose-500 font-sans-refined mt-1 block">
                            {formErrors.guestEmail}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-[#5A2738]/60 font-sans-refined block mb-1">
                        Aesthetic Notes / Preferences (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Any hair texture preferences, allergies, or special occasion context..."
                        value={bookingData.specialNotes}
                        onChange={(e) =>
                          setBookingData((prev) => ({ ...prev, specialNotes: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#E8A7B8]/40 rounded-xl text-sm font-sans-refined text-[#5A2738] placeholder:text-[#5A2738]/30 focus:outline-hidden focus:border-[#5A2738]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            /* STEP 05: Post-submission Confirmation Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 px-4 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#5A2738] text-[#FFF9FA] flex items-center justify-center mb-6 shadow-md">
                <Sparkles className="w-8 h-8 text-[#E8A7B8]" />
              </div>

              <span className="text-xs uppercase tracking-[0.35em] text-[#E8A7B8] font-semibold block mb-2">
                RESERVATION RECEIVED
              </span>

              <h4 className="font-serif-luxury text-3xl sm:text-4xl text-[#5A2738] mb-3">
                Your experience request has been received.
              </h4>

              <p className="text-sm font-sans-refined text-[#5A2738]/80 max-w-md mb-8 leading-relaxed font-light">
                Our atelier concierge will contact you at <span className="font-medium text-[#5A2738]">{bookingData.guestPhone}</span> shortly to confirm your private suite and discuss your bespoke preferences.
              </p>

              {/* Receipt Summary Card */}
              <div className="w-full max-w-md p-6 bg-[#FFFFFF] rounded-2xl border border-[#E8A7B8]/30 text-left text-xs font-sans-refined space-y-3 mb-8 shadow-md">
                <div className="flex justify-between border-b border-[#E8A7B8]/20 pb-2">
                  <span className="text-[#5A2738]/60 uppercase tracking-wider">Service</span>
                  <span className="font-semibold text-[#5A2738]">{bookingData.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8A7B8]/20 pb-2">
                  <span className="text-[#5A2738]/60 uppercase tracking-wider">Estimated Fee</span>
                  <span className="font-semibold text-[#5A2738]">{bookingData.servicePrice}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8A7B8]/20 pb-2">
                  <span className="text-[#5A2738]/60 uppercase tracking-wider">Date & Time</span>
                  <span className="text-[#5A2738]">{bookingData.date} · {bookingData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A2738]/60 uppercase tracking-wider">Atelier</span>
                  <span className="text-[#5A2738]">{bookingData.location}</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="px-8 py-3.5 bg-[#5A2738] text-[#FFF9FA] text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#E8A7B8] hover:text-[#5A2738] transition-colors cursor-pointer shadow-md"
              >
                RETURN TO MAISON
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!submitted && (
          <div className="px-6 sm:px-8 py-4 border-t border-[#E8A7B8]/20 bg-[#FFF9FA] flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#5A2738]/70 hover:text-[#5A2738] font-sans-refined py-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              id="booking-modal-next-btn"
              type="button"
              onClick={handleNextStep}
              className="px-8 py-3.5 bg-[#5A2738] text-[#FFF9FA] text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#E8A7B8] hover:text-[#5A2738] transition-all duration-300 shadow-md cursor-pointer inline-flex items-center space-x-2"
            >
              <span>{step === 4 ? 'REQUEST APPOINTMENT' : 'CONTINUE'}</span>
              {step < 4 && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
