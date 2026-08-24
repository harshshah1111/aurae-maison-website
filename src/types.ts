export type ServiceCategory = 'HAIR' | 'SKIN' | 'BEAUTY' | 'NAILS';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  duration: string;
  price: string;
  description?: string;
  tag?: string;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio?: string;
}

export interface GalleryItem {
  id: string;
  number?: string;
  title: string;
  category: string;
  image: string;
  aspect?: string;
  span?: string;
}

export interface BookingData {
  category: ServiceCategory | '';
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  artistId?: string;
  artistName?: string;
  date: string;
  timeSlot: string;
  location: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialNotes?: string;
}

export type AnalyticsEventType =
  | 'hero_cta_click'
  | 'service_category_click'
  | 'service_view'
  | 'gallery_view'
  | 'artist_view'
  | 'booking_start'
  | 'booking_service_selected'
  | 'booking_completed'
  | 'phone_click'
  | 'maps_click'
  | 'instagram_click'
  | 'scroll_50'
  | 'scroll_90';

export interface AnalyticsEvent {
  id: string;
  event: AnalyticsEventType;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
