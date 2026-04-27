import { useNavigate } from "react-router";
import { authService } from "@/apis/auth";
import type { Property } from "@/modules/broker-dashboard-modules/types/property.types";
import PropertyCard from "@/modules/broker-dashboard-modules/component/custom/property-card";

const BrowsePropertyCard = ({
  property,
  isSaved,
  onToggleSave,
}: {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (authService.isAuthenticated()) {
      navigate(`/dashboard/properties/${property._id}`);
    } else {
      navigate(`/login?redirect=/dashboard/properties/${property._id}`);
    }
  };

  return (
    <PropertyCard
      property={property}
      isSaved={isSaved}
      onToggleSave={onToggleSave}
      onCardClick={handleCardClick}
    />
  );
};

export default BrowsePropertyCard;