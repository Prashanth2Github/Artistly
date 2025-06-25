
import { useState, useEffect } from 'react';

interface Artist {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  category: string[];
  languages: string[];
  feeRange: string;
  experience: string;
  portfolio?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const useArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  const loadArtists = () => {
    const storedArtists = JSON.parse(localStorage.getItem('artistly_artists') || '[]');
    setArtists(storedArtists);
    console.log('Artists loaded:', storedArtists);
  };

  const addArtist = (artist: Artist) => {
    const existingArtists = JSON.parse(localStorage.getItem('artistly_artists') || '[]');
    const updatedArtists = [...existingArtists, artist];
    localStorage.setItem('artistly_artists', JSON.stringify(updatedArtists));
    setArtists(updatedArtists);
    console.log('New artist added:', artist);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  const updateArtist = (artistId: string, updates: Partial<Artist>) => {
    const existingArtists = JSON.parse(localStorage.getItem('artistly_artists') || '[]');
    const updatedArtists = existingArtists.map((artist: Artist) =>
      artist.id === artistId ? { ...artist, ...updates } : artist
    );
    localStorage.setItem('artistly_artists', JSON.stringify(updatedArtists));
    setArtists(updatedArtists);
    console.log('Artist updated:', artistId, updates);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  const deleteArtist = (artistId: string) => {
    const existingArtists = JSON.parse(localStorage.getItem('artistly_artists') || '[]');
    const updatedArtists = existingArtists.filter((artist: Artist) => artist.id !== artistId);
    localStorage.setItem('artistly_artists', JSON.stringify(updatedArtists));
    setArtists(updatedArtists);
    console.log('Artist deleted:', artistId);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    loadArtists();

    // Listen for storage changes from other components
    const handleStorageChange = () => {
      loadArtists();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    artists,
    addArtist,
    updateArtist,
    deleteArtist,
    loadArtists
  };
};
