
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useArtists } from '@/hooks/useArtists';
import { useBookings } from '@/hooks/useBookings';
import { 
  Calendar, 
  DollarSign, 
  Clock,
  CheckCircle,
  XCircle,
  Edit
} from 'lucide-react';

const ArtistDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { artists } = useArtists();
  const { bookings, updateBooking } = useBookings();

  // Find artist data for current user
  const artistData = artists.find(artist => artist.email === user?.email);

  // Filter bookings for this artist
  const artistBookings = bookings.filter(booking => 
    booking.artistName === user?.name || booking.artistId === user?.id
  );

  const updateBookingStatus = (bookingId: string, status: 'confirmed' | 'cancelled') => {
    updateBooking(bookingId, { status });
    
    toast({
      title: "Booking Updated",
      description: `Booking ${status} successfully.`,
    });
  };

  const stats = {
    totalBookings: artistBookings.length,
    pendingBookings: artistBookings.filter(b => b.status === 'pending').length,
    confirmedBookings: artistBookings.filter(b => b.status === 'confirmed').length,
    totalEarnings: artistBookings
      .filter(b => b.status === 'confirmed')
      .reduce((total, booking) => total + parseInt(booking.fee.replace(/[₹,]/g, '') || '0'), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Artist Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Manage your bookings and profile.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingBookings}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.confirmedBookings}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Earnings</p>
                  <p className="text-3xl font-bold text-blue-600">₹{stats.totalEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Status */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Status</CardTitle>
            </CardHeader>
            <CardContent>
              {artistData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Application Status:</span>
                    <Badge 
                      variant={
                        artistData.status === 'approved' ? 'default' :
                        artistData.status === 'rejected' ? 'destructive' : 'secondary'
                      }
                    >
                      {artistData.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Categories:</span>
                    <p className="text-sm text-gray-600">{artistData.category?.join(', ')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Fee Range:</span>
                    <p className="text-sm text-gray-600">{artistData.feeRange}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No artist profile found</p>
                  <Button onClick={() => window.location.href = '/onboarding'}>
                    Complete Artist Registration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bookings Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {artistBookings.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No bookings yet</p>
                ) : (
                  artistBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{booking.eventType}</h3>
                          <p className="text-sm text-gray-600">{booking.clientName}</p>
                          <p className="text-sm text-gray-600">{booking.eventDate} at {booking.eventTime}</p>
                        </div>
                        <Badge 
                          variant={
                            booking.status === 'confirmed' ? 'default' :
                            booking.status === 'cancelled' ? 'destructive' : 'secondary'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm"><strong>Location:</strong> {booking.eventLocation}</p>
                        <p className="text-sm"><strong>Fee:</strong> {booking.fee}</p>
                        <p className="text-sm"><strong>Client:</strong> {booking.clientEmail}</p>
                      </div>

                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArtistDashboard;
