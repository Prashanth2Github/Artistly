
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FilterPanelProps {
  filters: {
    category: string;
    location: string;
    priceRange: string;
    availability: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const categories = [
    'Singers',
    'Dancers', 
    'DJs',
    'Speakers',
    'Musicians',
    'Comedians',
    'Magicians',
    'Bands'
  ];

  const locations = [
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

  const priceRanges = [
    { value: 'under-50k', label: 'Under ₹50,000' },
    { value: '50k-100k', label: '₹50,000 - ₹1,00,000' },
    { value: 'above-100k', label: 'Above ₹1,00,000' }
  ];

  const handleCategoryChange = (value: string) => {
    onFiltersChange({
      ...filters,
      category: value === 'all' ? '' : value
    });
  };

  const handleLocationChange = (value: string) => {
    onFiltersChange({
      ...filters,
      location: value === 'all' ? '' : value
    });
  };

  const handlePriceRangeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      priceRange: value === 'all' ? '' : value
    });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      availability: checked
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      location: '',
      priceRange: '',
      availability: false
    });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Filter Artists</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Category</Label>
          <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Location</Label>
          <Select value={filters.location || 'all'} onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <Select value={filters.priceRange || 'all'} onValueChange={handlePriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Price Ranges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Price Ranges</SelectItem>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Availability Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="availability" 
            checked={filters.availability}
            onCheckedChange={handleAvailabilityChange}
          />
          <Label htmlFor="availability" className="text-sm">
            Available Now
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
