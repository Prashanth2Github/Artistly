
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useArtists } from '@/hooks/useArtists';
import { useBookings } from '@/hooks/useBookings';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { artists, updateArtist, deleteArtist } = useArtists();
  const { bookings, updateBooking } = useBookings();
  const [selectedArtist, setSelectedArtist] = useState<any>(null);

  const updateArtistStatus = (artistId: string, status: 'approved' | 'rejected') => {
    updateArtist(artistId, { status });
    
    toast({
      title: "Status Updated",
      description: `Artist ${status === 'approved' ? 'approved' : 'rejected'} successfully.`,
    });
  };

  const handleDeleteArtist = (artistId: string) => {
    deleteArtist(artistId);
    
    toast({
      title: "Artist Deleted",
      description: "Artist has been removed from the system.",
    });
  };

  const updateBookingStatus = (bookingId: string, status: 'confirmed' | 'cancelled') => {
    updateBooking(bookingId, { status });
    
    toast({
      title: "Booking Updated",
      description: `Booking ${status} successfully.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const stats = {
    totalArtists: artists.length,
    pendingApplications: artists.filter(a => a.status === 'pending').length,
    approvedArtists: artists.filter(a => a.status === 'approved').length,
    totalBookings: bookings.length,
    revenue: bookings
      .filter(b => b.status === 'confirmed')
      .reduce((total, booking) => total + parseInt(booking.fee.replace(/[₹,]/g, '') || '0'), 0)
  };

  if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Access Denied
              </h2>
              <p className="text-gray-600 mb-6">
                You don't have permission to access this dashboard.
              </p>
              <Button onClick={() => window.location.href = '/'}>
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.role === 'admin' ? 'Admin' : 'Manager'} Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user.name}! Manage artist submissions and track application status.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artists</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArtists}</div>
              <p className="text-xs text-muted-foreground">All artist applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingApplications}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Artists</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approvedArtists}</div>
              <p className="text-xs text-muted-foreground">Active artists</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">₹{stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From confirmed bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Artist Submissions Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Artist Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {artists.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Artist Name</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Fee Range</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {artists.map((artist) => (
                      <TableRow key={artist.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{artist.name}</div>
                            <div className="text-sm text-gray-600">{artist.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {artist.category.slice(0, 2).map((cat) => (
                              <Badge key={cat} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                            {artist.category.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{artist.category.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {artist.location}
                        </TableCell>
                        <TableCell className="text-sm">
                          {artist.feeRange}
                        </TableCell>
                        <TableCell className="text-sm">
                          {artist.experience}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(artist.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(artist.status)}
                            {artist.status.charAt(0).toUpperCase() + artist.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(artist.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            {artist.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateArtistStatus(artist.id, 'approved')}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateArtistStatus(artist.id, 'rejected')}
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedArtist(artist)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteArtist(artist.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No submissions yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Artist applications will appear here once they're submitted.
                </p>
                <Button onClick={() => window.location.href = '/onboarding'}>
                  Add Test Submission
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Artist</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.artistName}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.clientName}</div>
                            <div className="text-sm text-gray-600">{booking.clientEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.eventType}</div>
                            <div className="text-sm text-gray-600">{booking.eventLocation}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {booking.eventDate} at {booking.eventTime}
                        </TableCell>
                        <TableCell className="font-medium">
                          {booking.fee}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              booking.status === 'confirmed' ? 'default' :
                              booking.status === 'cancelled' ? 'destructive' : 'secondary'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {booking.status === 'pending' && (
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No bookings yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Artist Detail Modal */}
        {selectedArtist && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Artist Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedArtist.name}</h3>
                  <p className="text-gray-600">{selectedArtist.email}</p>
                  <p className="text-gray-600">{selectedArtist.phone}</p>
                  <p className="text-gray-600">{selectedArtist.location}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Bio</h4>
                  <p className="text-sm text-gray-600">{selectedArtist.bio}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Categories</h4>
                    <p className="text-sm text-gray-600">{selectedArtist.category.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Languages</h4>
                    <p className="text-sm text-gray-600">{selectedArtist.languages.join(', ')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Experience</h4>
                    <p className="text-sm text-gray-600">{selectedArtist.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Fee Range</h4>
                    <p className="text-sm text-gray-600">{selectedArtist.feeRange}</p>
                  </div>
                </div>
                
                {selectedArtist.portfolio && (
                  <div>
                    <h4 className="font-medium">Portfolio</h4>
                    <a 
                      href={selectedArtist.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {selectedArtist.portfolio}
                    </a>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setSelectedArtist(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
