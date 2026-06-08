/**
 * Vela Resort Type Definitions
 * Centralized types for the application
 */

// Villa Types
export interface Villa {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  amenities: string[];
}

export interface VillaAvailability {
  id: number;
  name: string;
  basePrice: number;
  peakPrice: number;
  available: number;
}

// Experience Types
export interface Experience {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Gallery Types
export interface GalleryImage {
  id: number;
  title: string;
  image: string;
}

export interface LightboxImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

// Testimonial Types
export interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  rating: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  message: string;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: string;
}

// Theme Types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Animation Types
export interface AnimationVariant {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
}

// API Response Types (for future backend integration)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface BookingResponse {
  id: string;
  villaId: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface InquiryResponse {
  id: string;
  email: string;
  status: 'received' | 'processing' | 'responded';
  createdAt: string;
}
