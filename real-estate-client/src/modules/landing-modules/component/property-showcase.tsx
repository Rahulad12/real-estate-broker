import { useGetAllListedProperty } from "@/apis/hooks/property.hooks";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";
import { formatPrice, placeholderImage } from "@/utils/helper";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { Property } from "@/modules/broker-dashboard-modules/types/property.types";

const PropertyCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-[4/3]" />
    <CardContent className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-full" />
    </CardContent>
    <CardFooter className="px-4 pb-4">
      <Skeleton className="h-5 w-24" />
    </CardFooter>
  </Card>
);

const PropertyShowcaseCard = ({ property }: { property: Property }) => {
  return (
    <Card
      onClick={() => window.location.href = `/dashboard/properties/${property._id}`}
      className="group overflow-hidden border border-border/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={placeholderImage(property.propertyType)}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge className="capitalize text-[10px] font-semibold px-2 py-0.5 bg-background/90 text-foreground border border-border/40 backdrop-blur-sm">
            {property.propertyType}
          </Badge>
          {property.status === "available" && (
            <Badge className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-500/90 text-white border-0">
              Available
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="text-xs truncate">{property.location.address}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" />
              {property.bedrooms} bd
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" />
            {property.bathrooms} ba
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5" />
            {property.area.toLocaleString()} ft²
          </span>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <p className="text-base font-bold text-foreground">
          {formatPrice(property.price)}
        </p>
      </CardFooter>
    </Card>
  );
};

export const PropertyShowcase = () => {
  const { data: properties, isLoading } = useGetAllListedProperty({ page: 1, limit: 6 });

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Featured Properties
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">
            Discover Trending Properties
          </h2>
          <p className="text-secondary-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of the most sought-after properties available in the market.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : properties?.properties && properties.properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.properties.slice(0, 6).map((property) => (
              <PropertyShowcaseCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No properties available at the moment.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="h-11 px-8 border-primary/30 text-primary hover:bg-primary/5">
            <Link to="/dashboard">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};