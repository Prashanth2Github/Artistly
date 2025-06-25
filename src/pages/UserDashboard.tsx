
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useBookings } from '@/hooks/useBookings';
import { 
  Calendar, 
  Clock,
  MapPin,
  Plus
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { bookings, updateBooking } = useBookings();

  // Filter bookings for this user
  const userBookings = bookings.filter(booking => 
    booking.clientEmail === user?.email
  );

  const cancelBooking = (bookingId: string) => {
    updateBooking(bookingId, { status: 'cancelled' });
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const stats = {
    totalBookings: userBookings.length,
    pendingBookings: userBookings.filter(b => b.status === 'pending').length,
    confirmedBookings: userBookings.filter(b => b.status === 'confirmed').length,
    totalSpent: userBookings
      .filter(b => b.status === 'confirmed')
      .reduce((total, booking) => total + parseInt(booking.fee.replace(/[₹,]/g, '') || '0'), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Manage your bookings and discover new artists.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => window.location.href = '/artists'} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Book New Artist
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/artists'} className="flex-1">
                  Browse Artists
                </Button>
              </div>
            </CardContent>
          </Card>
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
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-3xl font-bold text-blue-600">₹{stats.totalSpent.toLocaleString()}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {userBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No bookings yet</p>
                  <Button onClick={() => window.location.href = '/artists'}>
                    Book Your First Artist
                  </Button>
                </div>
              ) : (
                userBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{booking.artistName}</h3>
                        <p className="text-sm text-gray-600">{booking.eventType}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {booking.eventDate} at {booking.eventTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {booking.eventLocation}
                          </div>
                        </div>
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
                      <p className="text-sm"><strong>Fee:</strong> {booking.fee}</p>
                      <p className="text-sm"><strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>

                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel Booking
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

      <Footer />
    </div>
  );
};

export default UserDashboard;
