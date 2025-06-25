
export interface Artist {
  id: string;
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  feeRange: string;
  fee?: string; // Add fee property as optional
  location: string;
  profileImage?: string;
  rating?: number;
  experience?: string;
  contactInfo?: {
    email: string;
    phone: string;
  };
  availability?: boolean;
}

export interface BookingRequest {
  id: string;
  artistId: string;
  artistName: string;
  eventDate: string;
  eventType: string;
  location: string;
  budget: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface FilterOptions {
  category: string;
  location: string;
  priceRange: string;
}
