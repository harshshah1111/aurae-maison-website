import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp, Users, CalendarCheck, MousePointer, Activity, Trash2, Download } from 'lucide-react';
import { analytics } from '../services/analytics';
import { AnalyticsEvent, AnalyticsEventType } from '../types';
import GradualBlur from './GradualBlur';

interface AnalyticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDrawer: React.FC<AnalyticsDrawerProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [counts, setCounts] = useState<Record<AnalyticsEventType, number>>({} as Record<AnalyticsEventType, number>);
  const [funnel, setFunnel] = useState({
    visitorsEstimated: 0,
    heroInteractions: 0,
    serviceExplorations: 0,
    bookingStarts: 0,
    bookingCompletions: 0,
    conversionRate: '0.0',
  });

  useEffect(() => {
    if (isOpen) {
      setEvents(analytics.getEvents());
      setCounts(analytics.getEventCounts());
      setFunnel(analytics.getFunnelMetrics());

      const unsubscribe = analytics.subscribe((_, allEvents) => {
        setEvents(allEvents);
        setCounts(analytics.getEventCounts());
        setFunnel(analytics.getFunnelMetrics());
      });

      return unsubscribe;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('Reset local analytics session events?')) {
      analytics.clear();
      setEvents([]);
      setCounts(analytics.getEventCounts());
      setFunnel(analytics.getFunnelMetrics());
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aurae_analytics_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#5A2738]/60 backdrop-blur-xs flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="w-full max-w-xl bg-[#FFF9FA] text-[#5A2738] h-full shadow-2xl flex flex-col border-l border-[#E8A7B8]/40"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E8A7B8]/20 flex items-center justify-between bg-[#FFF9FA]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#F6DDE3] text-[#5A2738] flex items-center justify-center border border-[#E8A7B8]/40">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8A7B8] font-semibold block">
                EXECUTIVE INTELLIGENCE
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#5A2738]">
                Website Analytics & Funnel
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExport}
              title="Export Events JSON"
              className="p-2 text-[#5A2738]/60 hover:text-[#5A2738] rounded-lg hover:bg-[#F6DDE3]/50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleClear}
              title="Reset Analytics"
              className="p-2 text-[#5A2738]/60 hover:text-rose-500 rounded-lg hover:bg-[#F6DDE3]/50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#5A2738]/60 hover:text-[#5A2738] rounded-lg hover:bg-[#F6DDE3]/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Analytics Body with GradualBlur Transitions */}
        <div className="relative grow overflow-hidden flex flex-col min-h-0">
          <div className="p-6 overflow-y-auto grow space-y-8 font-sans-refined">
            {/* Funnel Overview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif-luxury text-xl text-[#5A2738]">
                  Primary Conversion Funnel
                </h4>
                <span className="text-xs text-[#5A2738] font-semibold uppercase tracking-wider">
                  {funnel.conversionRate}% Conversion
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { label: '01 · Total Visitors (Est.)', val: funnel.visitorsEstimated, icon: Users },
                  { label: '02 · Hero CTA Interaction', val: funnel.heroInteractions, icon: MousePointer },
                  { label: '03 · Service Explorations', val: funnel.serviceExplorations, icon: TrendingUp },
                  { label: '04 · Booking Initiations', val: funnel.bookingStarts, icon: CalendarCheck },
                  { label: '05 · Booking Completions', val: funnel.bookingCompletions, icon: Activity },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E8A7B8]/30 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <step.icon className="w-4 h-4 text-[#5A2738]" />
                      <span className="text-xs font-medium text-[#5A2738]">{step.label}</span>
                    </div>
                    <span className="font-serif-luxury text-lg font-semibold text-[#5A2738]">
                      {step.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Breakdown Cards */}
            <div>
              <h4 className="font-serif-luxury text-xl text-[#5A2738] mb-3">
                Interaction Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#FFFFFF] rounded-xl border border-[#E8A7B8]/30 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#5A2738]/60 block mb-1">
                    Category Clicks
                  </span>
                  <span className="font-serif-luxury text-2xl text-[#5A2738]">
                    {counts.service_category_click || 0}
                  </span>
                </div>

                <div className="p-3.5 bg-[#FFFFFF] rounded-xl border border-[#E8A7B8]/30 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#5A2738]/60 block mb-1">
                    Gallery Views
                  </span>
                  <span className="font-serif-luxury text-2xl text-[#5A2738]">
                    {counts.gallery_view || 0}
                  </span>
                </div>

                <div className="p-3.5 bg-[#FFFFFF] rounded-xl border border-[#E8A7B8]/30 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#5A2738]/60 block mb-1">
                    Artist Direct Inquiries
                  </span>
                  <span className="font-serif-luxury text-2xl text-[#5A2738]">
                    {counts.artist_view || 0}
                  </span>
                </div>

                <div className="p-3.5 bg-[#FFFFFF] rounded-xl border border-[#E8A7B8]/30 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#5A2738]/60 block mb-1">
                    External Map / Social
                  </span>
                  <span className="font-serif-luxury text-2xl text-[#5A2738]">
                    {(counts.maps_click || 0) + (counts.instagram_click || 0) + (counts.phone_click || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Event Stream */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif-luxury text-xl text-[#5A2738]">
                  Live Real-Time Stream
                </h4>
                <span className="text-[10px] uppercase tracking-wider text-[#5A2738]/50">
                  {events.length} captured
                </span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {events.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#5A2738]/40">
                    No events captured yet in this session.
                  </div>
                ) : (
                  [...events].reverse().map((ev) => (
                    <div
                      key={ev.id}
                      className="p-2.5 bg-[#FFFFFF] rounded-lg border border-[#E8A7B8]/20 text-xs flex items-center justify-between shadow-xs"
                    >
                      <div>
                        <span className="font-mono font-medium text-[#5A2738] block text-[11px]">
                          {ev.event}
                        </span>
                        {ev.metadata && (
                          <span className="text-[10px] text-[#5A2738]/60">
                            {JSON.stringify(ev.metadata)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#5A2738]/40 shrink-0 font-mono">
                        {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <GradualBlur
            target="parent"
            position="top"
            height="1.5rem"
            strength={1.5}
            divCount={4}
            opacity={0.8}
          />
          <GradualBlur
            target="parent"
            position="bottom"
            height="2rem"
            strength={2}
            divCount={5}
            opacity={0.85}
          />
        </div>
      </motion.div>
    </div>
  );
};
