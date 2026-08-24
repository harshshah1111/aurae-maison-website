import { AnalyticsEvent, AnalyticsEventType } from '../types';

const STORAGE_KEY = 'aurae_analytics_events';

class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private listeners: Array<(event: AnalyticsEvent, allEvents: AnalyticsEvent[]) => void> = [];

  constructor() {
    this.loadEvents();
  }

  private loadEvents() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch {
      this.events = [];
    }
  }

  private saveEvents() {
    try {
      // Keep latest 200 events
      const trimmed = this.events.slice(-200);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // ignore storage errors
    }
  }

  public track(event: AnalyticsEventType, metadata?: Record<string, unknown>) {
    const newEvent: AnalyticsEvent = {
      id: Math.random().toString(36).substring(2, 9),
      event,
      timestamp: new Date().toISOString(),
      metadata,
    };

    this.events.push(newEvent);
    this.saveEvents();

    this.listeners.forEach((listener) => {
      try {
        listener(newEvent, [...this.events]);
      } catch (err) {
        console.error('Analytics listener error', err);
      }
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AURAÉ Analytics] ${event}`, metadata || '');
    }

    // Forward to Google Analytics gtag if loaded
    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: Function }).gtag === 'function') {
      try {
        (window as unknown as { gtag: Function }).gtag('event', event, metadata || {});
      } catch {
        // ignore gtag tracking errors
      }
    }
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public getEventCounts(): Record<AnalyticsEventType, number> {
    const counts: Record<string, number> = {
      hero_cta_click: 0,
      service_category_click: 0,
      service_view: 0,
      gallery_view: 0,
      artist_view: 0,
      booking_start: 0,
      booking_service_selected: 0,
      booking_completed: 0,
      phone_click: 0,
      maps_click: 0,
      instagram_click: 0,
      scroll_50: 0,
      scroll_90: 0,
    };

    this.events.forEach((e) => {
      if (counts[e.event] !== undefined) {
        counts[e.event]++;
      } else {
        counts[e.event] = 1;
      }
    });

    return counts as Record<AnalyticsEventType, number>;
  }

  public getFunnelMetrics() {
    const counts = this.getEventCounts();
    const heroClicks = counts.hero_cta_click || 0;
    const serviceExploration = (counts.service_category_click || 0) + (counts.service_view || 0);
    const bookingStarts = counts.booking_start || 0;
    const bookingCompletions = counts.booking_completed || 0;

    return {
      visitorsEstimated: Math.max(1, heroClicks + serviceExploration + bookingStarts + 12),
      heroInteractions: heroClicks,
      serviceExplorations: serviceExploration,
      bookingStarts,
      bookingCompletions,
      conversionRate: bookingStarts > 0 ? ((bookingCompletions / bookingStarts) * 100).toFixed(1) : '0.0',
    };
  }

  public subscribe(callback: (event: AnalyticsEvent, allEvents: AnalyticsEvent[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  public clear() {
    this.events = [];
    localStorage.removeItem(STORAGE_KEY);
    this.listeners.forEach((l) => l({ id: '0', event: 'hero_cta_click', timestamp: new Date().toISOString() }, []));
  }
}

export const analytics = new AnalyticsTracker();
