import { useGetTrendingProperties } from "@/apis/hooks/property.hooks";
import { TrendingUp } from "lucide-react";
import BrowsePropertyCard from "@/modules/browse-properties-modules/component/browse-property-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { Property } from "@/modules/broker-dashboard-modules/types/property.types";

export const TrendingProperties = () => {
  const { data: properties, isLoading } = useGetTrendingProperties(6);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
              Most Popular
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">
            Trending Properties
          </h2>
          <p className="text-secondary-foreground max-w-2xl mx-auto">
            Most viewed and highest rated properties by our community
          </p>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[340px] animate-pulse bg-muted rounded-xl" />
            ))}
          </div>
        ) : properties?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No trending properties yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties?.map((property: Property) => (
              <BrowsePropertyCard
                key={property._id}
                property={property}
                isSaved={false}
                onToggleSave={() => {}}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 border-primary/30 text-primary hover:bg-primary/5"
          >
            <Link to="/browse">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
