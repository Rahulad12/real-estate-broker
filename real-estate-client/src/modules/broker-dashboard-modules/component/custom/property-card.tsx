import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice, placeholderImage } from "@/utils/helper";
import { Badge } from "@/components/ui/badge";
import { Bath, BedDouble, Building2, Heart, Home, MapPin, Maximize2, Warehouse } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Property } from "../../types/property.types";
import { useNavigate } from "react-router-dom";


const propertyTypeIcon = (type: string) => {
  if (type === "villa") return <Home className="h-3 w-3" />;
  if (type === "commercial") return <Warehouse className="h-3 w-3" />;
  return <Building2 className="h-3 w-3" />;
};

const PropertyCard =({
  property,
  isSaved,
  onToggleSave,
  onCardClick,
}: {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCardClick?: () => void;
}) =>{
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    } else {
      navigate(`/dashboard/properties/${property._id}`);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(property._id);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group overflow-hidden border border-border/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={placeholderImage(property.propertyType)}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge className="capitalize text-[10px] font-semibold px-2 py-0.5 gap-1 bg-background/90 text-foreground border border-border/40 backdrop-blur-sm">
            {propertyTypeIcon(property.propertyType)}
            {property.propertyType}
          </Badge>
          {property.status === "available" && (
            <Badge className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-500/90 text-white border-0 backdrop-blur-sm">
              Available
            </Badge>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={handleSaveClick}
          className={cn(
            "absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border",
            isSaved
              ? "bg-rose-500 border-rose-500 text-white shadow-md scale-110"
              : "bg-background/80 border-border/40 text-muted-foreground hover:text-rose-500 hover:border-rose-300 hover:bg-background"
          )}
          aria-label={isSaved ? "Remove from saved" : "Save property"}
        >
          <Heart className={cn("h-3.5 w-3.5 transition-all", isSaved && "fill-current")} />
        </button>
      </div>

      {/* Content */}
      <CardContent className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 flex-1">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="text-xs truncate">{property.location.address}</span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {property.description}
        </p>

        <Separator className="my-1" />

        {/* Stats */}
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

      <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between gap-2">
        <p className="text-base font-bold text-foreground">
          {formatPrice(property.price)}
        </p>
      </CardFooter>
    </Card>
  );
}
export default PropertyCard