
import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtistCard from '@/components/ArtistCard';
import FilterPanel from '@/components/FilterPanel';
import { mockArtists } from '@/data/mockData';
import { Artist } from '@/types';
import { useSearchParams } from 'react-router-dom';

const Artists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [filters, setFilters] = useState({
    category: categoryFromUrl || '',
    location: '',
    priceRange: '',
    availability: false
  });

  // Update filters when URL changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== filters.category) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam
      }));
    }
  }, [searchParams]);

  // Update URL when category filter changes
  useEffect(() => {
    if (filters.category) {
      setSearchParams({ category: filters.category });
    } else {
      setSearchParams({});
    }
  }, [filters.category, setSearchParams]);

  const filteredArtists = useMemo(() => {
    return mockArtists.filter((artist: Artist) => {
      // Category filter
      if (filters.category && !artist.category.includes(filters.category)) {
        return false;
      }
      
      // Location filter
      if (filters.location && !artist.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Availability filter
      if (filters.availability && !artist.availability) {
        return false;
      }
      
      // Price range filter
      if (filters.priceRange) {
        const artistPrice = parseInt(artist.feeRange.replace(/[₹,\s-]/g, '').split('₹')[0] || '0');
        switch (filters.priceRange) {
          case 'under-50k':
            return artistPrice < 50000;
          case '50k-100k':
            return artistPrice >= 50000 && artistPrice <= 100000;
          case 'above-100k':
            return artistPrice > 100000;
          default:
            return true;
        }
      }
      
      return true;
    });
  }, [filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Artists
            {filters.category && (
              <span className="text-purple-600 ml-2">- {filters.category}</span>
            )}
          </h1>
          <p className="text-lg text-gray-600">
            Discover talented performers for your next event
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel */}
          <div className="lg:w-1/4">
            <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
          </div>

          {/* Artists Grid */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''}
                {filters.category && ` in ${filters.category}`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredArtists.map((artist: Artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>

            {filteredArtists.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No artists found matching your criteria</p>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Artists;
