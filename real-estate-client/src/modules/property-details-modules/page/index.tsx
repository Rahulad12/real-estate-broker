import { useGetPropertyById } from '@/apis/hooks/property.hooks';
import { useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToggleSaveAsFavorite } from '@/apis/hooks/favorite.hooks';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, error } = useGetPropertyById(id);
  const { mutate: toggleFavorite } = useToggleSaveAsFavorite();
  const [isFavorited, setIsFavorited] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-96 w-full rounded-lg" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Property Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">The property you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    toggleFavorite({ realEstateId: property._id, isFavorite: !isFavorited });
    setIsFavorited(!isFavorited);
  };

  const propertyTypeLabel = {
    house: 'House',
    apartment: 'Apartment',
    land: 'Land',
  }[property.propertyType];

  const listingTypeLabel = {
    buy: 'For Sale',
    rent: 'For Rent',
  }[property.type];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with title and action buttons */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <p className="text-lg text-gray-600">{property.location.address}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggleFavorite}
            className={isFavorited ? 'text-red-500' : ''}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Main property image */}
        <div className="mb-6">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">No image available</p>
            </div>
          )}
        </div>

        {/* Price and listing type */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${property.price.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Listing Type</p>
                <p className="text-2xl font-semibold text-blue-600">{listingTypeLabel}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-semibold">{propertyTypeLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-semibold capitalize">{property.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Area</span>
                <span className="font-semibold">{property.area} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bedrooms</span>
                <span className="font-semibold">{property.bedrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bathrooms</span>
                <span className="font-semibold">{property.bathrooms}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{property.location.address}</p>
              <div className="bg-gray-200 rounded-lg p-4 h-40 flex items-center justify-center">
                <p className="text-gray-600 text-sm">
                  Coordinates: {property.location.lat}, {property.location.lng}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </CardContent>
        </Card>

        {/* Contact buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button size="lg" className="px-8">
            Contact Agent
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            Schedule Viewing
          </Button>
        </div>
      </div>
    </div>
  );
}
