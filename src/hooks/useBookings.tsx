
import { useState, useEffect } from 'react';

interface Booking {
  id: string;
  artistId: string;
  artistName: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  eventLocation: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  fee: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  guestCount?: string;
  duration?: string;
  specialRequests?: string;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem('artistly_bookings') || '[]');
    setBookings(storedBookings);
    console.log('Bookings loaded:', storedBookings);
  };

  const addBooking = (booking: Booking) => {
    const existingBookings = JSON.parse(localStorage.getItem('artistly_bookings') || '[]');
    const updatedBookings = [...existingBookings, booking];
    localStorage.setItem('artistly_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    console.log('New booking added:', booking);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  const updateBooking = (bookingId: string, updates: Partial<Booking>) => {
    const existingBookings = JSON.parse(localStorage.getItem('artistly_bookings') || '[]');
    const updatedBookings = existingBookings.map((booking: Booking) =>
      booking.id === bookingId ? { ...booking, ...updates } : booking
    );
    localStorage.setItem('artistly_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    console.log('Booking updated:', bookingId, updates);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  const deleteBooking = (bookingId: string) => {
    const existingBookings = JSON.parse(localStorage.getItem('artistly_bookings') || '[]');
    const updatedBookings = existingBookings.filter((booking: Booking) => booking.id !== bookingId);
    localStorage.setItem('artistly_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    console.log('Booking deleted:', bookingId);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    loadBookings();

    // Listen for storage changes from other components
    const handleStorageChange = () => {
      loadBookings();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    bookings,
    addBooking,
    updateBooking,
    deleteBooking,
    loadBookings
  };
};
