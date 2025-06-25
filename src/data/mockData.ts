
import { Artist, BookingRequest } from '@/types';

export const categories = [
  'Singers',
  'Dancers',
  'Speakers',
  'DJs',
  'Musicians',
  'Comedians',
  'Magicians',
  'Bands'
];

export const languages = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Marathi',
  'Bengali',
  'Gujarati',
  'Punjabi',
  'Malayalam',
  'Kannada'
];

export const feeRanges = [
  'Under ₹10,000',
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  'Above ₹1,00,000'
];

export const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow'
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    bio: 'Professional classical singer with 10+ years of experience in Bollywood and classical music.',
    category: ['Singers'],
    languages: ['Hindi', 'English'],
    feeRange: '₹25,000 - ₹50,000',
    location: 'Mumbai',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616c7e016e5?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    experience: '10+ years',
    contactInfo: {
      email: 'priya.sharma@email.com',
      phone: '+91 9876543210'
    },
    availability: true
  },
  {
    id: '2',
    name: 'DJ Arjun',
    bio: 'Electronic music producer and DJ specializing in wedding and party events.',
    category: ['DJs'],
    languages: ['Hindi', 'English', 'Punjabi'],
    feeRange: '₹50,000 - ₹1,00,000',
    location: 'Delhi',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    rating: 4.6,
    experience: '8+ years',
    contactInfo: {
      email: 'dj.arjun@email.com',
      phone: '+91 9876543211'
    },
    availability: true
  },
  {
    id: '3',
    name: 'Meera Dance Academy',
    bio: 'Traditional and contemporary dance group performing Bharatanatyam, Hip-hop, and Bollywood.',
    category: ['Dancers'],
    languages: ['Tamil', 'English', 'Hindi'],
    feeRange: '₹10,000 - ₹25,000',
    location: 'Chennai',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    experience: '12+ years',
    contactInfo: {
      email: 'meera.dance@email.com',
      phone: '+91 9876543212'
    },
    availability: true
  },
  {
    id: '4',
    name: 'Dr. Rajesh Kumar',
    bio: 'Motivational speaker and corporate trainer with expertise in leadership and personal development.',
    category: ['Speakers'],
    languages: ['English', 'Hindi'],
    feeRange: 'Above ₹1,00,000',
    location: 'Bangalore',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    rating: 4.7,
    experience: '15+ years',
    contactInfo: {
      email: 'dr.rajesh@email.com',
      phone: '+91 9876543213'
    },
    availability: true
  },
  {
    id: '5',
    name: 'Rohan Stand-Up',
    bio: 'Stand-up comedian and entertainer perfect for corporate events and private parties.',
    category: ['Comedians'],
    languages: ['English', 'Hindi', 'Marathi'],
    feeRange: '₹25,000 - ₹50,000',
    location: 'Pune',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    rating: 4.5,
    experience: '6+ years',
    contactInfo: {
      email: 'rohan.comedy@email.com',
      phone: '+91 9876543214'
    },
    availability: true
  },
  {
    id: '6',
    name: 'Acoustic Vibes Band',
    bio: 'Live acoustic band specializing in Bollywood covers and original compositions.',
    category: ['Musicians', 'Bands'],
    languages: ['Hindi', 'English'],
    feeRange: '₹50,000 - ₹1,00,000',
    location: 'Mumbai',
    profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    experience: '9+ years',
    contactInfo: {
      email: 'acoustic.vibes@email.com',
      phone: '+91 9876543215'
    },
    availability: true
  }
];

export const mockBookingRequests: BookingRequest[] = [
  {
    id: '1',
    artistId: '1',
    artistName: 'Priya Sharma',
    eventDate: '2024-07-15',
    eventType: 'Wedding',
    location: 'Mumbai',
    budget: '₹40,000',
    clientName: 'Amit Patel',
    clientEmail: 'amit.patel@email.com',
    clientPhone: '+91 9876543220',
    message: 'Looking for a classical singer for our wedding reception.',
    status: 'pending',
    createdAt: '2024-06-20'
  },
  {
    id: '2',
    artistId: '2',
    artistName: 'DJ Arjun',
    eventDate: '2024-07-20',
    eventType: 'Corporate Party',
    location: 'Delhi',
    budget: '₹75,000',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.johnson@company.com',
    clientPhone: '+91 9876543221',
    message: 'Need a DJ for our annual company celebration.',
    status: 'approved',
    createdAt: '2024-06-18'
  }
];
