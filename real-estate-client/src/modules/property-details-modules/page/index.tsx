import { useGetPropertyById } from '@/apis/hooks/property.hooks';
import { useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PropertyMap } from '@/components/ui/map/property-map';
import { useToggleSaveAsFavorite } from '@/apis/hooks/favorite.hooks';
import { Heart, MapPin, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIncrementPropertyViews } from '@/apis/hooks/property.hooks';

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, error } = useGetPropertyById(id);
  const { mutate: toggleFavorite } = useToggleSaveAsFavorite();
  const { mutate: incrementViews } = useIncrementPropertyViews();
  const [isFavorited, setIsFavorited] = useState(false);

  // Increment views when property is loaded
  useEffect(() => {
    if (id) {
      incrementViews(id);
    }
  }, [id, incrementViews]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="mb-6 space-y-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
              Not found
            </p>
            <CardTitle className="text-primary">Property Not Found</CardTitle>
            <CardDescription>The property you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="text-secondary hover:text-button-hover">
              Go back home
            </Button>
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
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <CardHeader className="mb-6 space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
                {listingTypeLabel}
              </p>
              <h1 className="text-2xl font-semibold text-primary">
                {property.title}
              </h1>
              <p className="text-sm text-secondary-foreground flex items-center gap-1">
                <MapPin size={14} className="text-muted-foreground" />
                {property.location.address}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleFavorite}
              className={isFavorited ? 'text-red-500 border-red-500' : 'text-secondary'}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardHeader>

        <Card className="mb-6">
          <CardContent>
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            ) : (
              <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="mb-4 space-y-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
              Pricing
            </p>
            <CardTitle>Price Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Price</p>
                <p className="text-3xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Listing Type</p>
                <p className="text-2xl font-semibold text-secondary">{listingTypeLabel}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="mb-4 space-y-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
                Property
              </p>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-semibold text-secondary-foreground">{propertyTypeLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-secondary-foreground capitalize">{property.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Area</span>
                <span className="font-semibold text-secondary-foreground">{property.area} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bedrooms</span>
                <span className="font-semibold text-secondary-foreground">{property.bedrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bathrooms</span>
                <span className="font-semibold text-secondary-foreground">{property.bathrooms}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="mb-4 space-y-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
                Location
              </p>
              <CardTitle>Property Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-foreground mb-4">{property.location.address}</p>
              <PropertyMap
                lat={Number(property.location.lat)}
                lng={Number(property.location.lng)}
                className="h-48"
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="mb-4 space-y-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
              Overview
            </p>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary-foreground leading-relaxed">{property.description}</p>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4 justify-center">
          <Button size="lg" className="px-8 h-12">
            Contact Agent
          </Button>
          <Button size="lg" variant="outline" className="px-8 h-12">
            Schedule Viewing
          </Button>
        </div>
      </div>
    </div>
  );
}