import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useGetAllListedProperty } from "@/apis/hooks/property.hooks";
import BrowsePropertyCard from "../component/browse-property-card";
import type { PropertyQueryParams } from "@/modules/broker-dashboard-modules/types/property.types";
import Footer from "@/modules/broker-dashboard-modules/component/footer";
import { LandingNavbar } from "@/modules/landing-modules/component/landing-navbar";

const BrowseProperties = () => {
  const [filters, setFilters] = useState<PropertyQueryParams>({
    search: "",
    propertyType: "",
    minPrice: undefined,
    maxPrice: undefined,
  });

  const { data, isLoading } = useGetAllListedProperty(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleFilterChange = (key: keyof PropertyQueryParams, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-primary mb-2">Browse Properties</h1>
          <p className="text-secondary-foreground">Find your dream property from our curated listings</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none h-4 w-4" />
            <Input
              placeholder="Search by title or location..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-10 h-11"
            />
          </div>
          
          <select
            className="h-11 px-4 rounded-md border border-input bg-background text-sm"
            value={filters.propertyType}
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>

          <select
            className="h-11 px-4 rounded-md border border-input bg-background text-sm"
            value={filters.minPrice?.toString() || ""}
            onChange={(e) => handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">Min Price</option>
            <option value="100000">$100k+</option>
            <option value="250000">$250k+</option>
            <option value="500000">$500k+</option>
            <option value="1000000">$1M+</option>
          </select>

          <select
            className="h-11 px-4 rounded-md border border-input bg-background text-sm"
            value={filters.maxPrice?.toString() || ""}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">Max Price</option>
            <option value="250000">Up to $250k</option>
            <option value="500000">Up to $500k</option>
            <option value="1000000">Up to $1M</option>
            <option value="2000000">Up to $2M</option>
          </select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="h-[340px] animate-pulse" />
            ))}
          </div>
        ) : data?.realEstates?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No properties found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.realEstates?.map((property) => (
              <BrowsePropertyCard
                key={property._id}
                property={property}
                isSaved={false}
                onToggleSave={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BrowseProperties;