
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Mail, Calendar } from 'lucide-react';
import { Artist } from '@/types';
import { useState } from 'react';
import BookingModal from './BookingModal';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={artist.profileImage || 'https://images.unsplash.com/photo-1494790108755-2616c7e016e5?w=400&h=400&fit=crop&crop=face'} 
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          {artist.availability && (
            <Badge className="absolute top-2 right-2 bg-green-600">
              Available
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold truncate">{artist.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{artist.rating || 4.5}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{artist.bio}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex flex-wrap gap-1">
              {artist.category.map((cat, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center space-x-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{artist.location}</span>
            </div>
            
            <div className="text-purple-600 font-semibold">
              {artist.feeRange}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsBookingModalOpen(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </div>
          
          <div className="flex justify-between mt-3 pt-3 border-t">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 text-sm">
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 text-sm">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
          </div>
        </CardContent>
      </Card>

      <BookingModal 
        artist={artist}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default ArtistCard;
