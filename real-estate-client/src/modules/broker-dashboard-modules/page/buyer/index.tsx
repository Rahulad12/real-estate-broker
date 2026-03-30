import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Building2,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyCard from "../../component/custom/property-card";
import PropertyCardSkeleton from "../../component/skeleton/property-card-skeleton";
import { useGetAllListedProperty } from "@/apis/hooks/property.hooks";
import {
  useGetFavoritesByUser,
  useToggleSaveAsFavorite,
} from "@/apis/hooks/favorite.hooks";

const BuyerDashboard = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // ── Data fetching ──
  const { data: allListedProperties, isLoading: allListedPropertiesLoading } =
    useGetAllListedProperty();

  // Fetch all favorites with a high limit to get all saved IDs at once
  const { data: favoritesData } = useGetFavoritesByUser({
    page: 1,
    limit: 1000,
  });

  const { mutateAsync: toggleSaveAsFavorite } = useToggleSaveAsFavorite();

  // Build a Set of saved property IDs from the favorites API — isFavorite:true only
  const savedPropertyIds = new Set<string>(
    (favoritesData?.data?.favorites ?? [])
      .filter((fav) => fav.isFavorite)
      .map((fav) => fav.realEstateId._id)
  );

  const toggleSave = async (id: string) => {
    const currentlySaved = savedPropertyIds.has(id);
    try {
      await toggleSaveAsFavorite({
        realEstateId: id,
        isFavorite: !currentlySaved,
      });
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const propertyTypes = [
    ...new Set(allListedProperties?.map((p) => p.propertyType) || []),
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ── Page Header ── */}
      <div className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Buyer Dashboard
              </p>
              <h1 className="text-2xl font-bold text-primary tracking-tight">
                Properties for Sale
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {allListedProperties?.length ?? 0} listings available ·{" "}
                {savedPropertyIds.size} saved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters Bar ── */}
      <div className="bg-background border-b border-border sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by title or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Type filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 h-9 text-sm">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Type
                {selectedTypes.length > 0 && (
                  <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {selectedTypes.length}
                  </Badge>
                )}
                <ChevronDown className="h-3 w-3 ml-0.5 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuLabel>Property Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {propertyTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleType(type)}
                  className="capitalize"
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
              <SelectItem value="area">Largest Area</SelectItem>
            </SelectContent>
          </Select>

          {/* Active filter chips */}
          {selectedTypes.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="capitalize gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={() => toggleType(type)}
            >
              {type} <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      </div>

      {/* ── Listings Grid ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {allListedPropertiesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : allListedProperties?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-lg font-semibold text-foreground">
              No properties found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
            {(search || selectedTypes.length > 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedTypes([]);
                }}
              >
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              Showing {allListedProperties?.length} of{" "}
              {allListedProperties?.length} properties
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allListedProperties?.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  isSaved={savedPropertyIds.has(property._id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;