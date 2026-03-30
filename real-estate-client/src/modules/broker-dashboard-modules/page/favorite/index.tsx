import { useState } from "react";
import {
  useGetFavoritesByUser,
  useToggleSaveAsFavorite,
} from "@/apis/hooks/favorite.hooks";
import PropertyCard from "../../component/custom/property-card";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PropertyCardSkeleton from "../../component/skeleton/property-card-skeleton";
import { Link } from "react-router";

const LIMIT = 9;

const Favorite = () => {
  const [page, setPage] = useState(1);

  //mutation
  const { data: allfavoriteByUser, isLoading: favoriteLoading } =
    useGetFavoritesByUser({
      page,
      limit: LIMIT,
    });
  const { mutateAsync: toggleSaveAsFavorite } = useToggleSaveAsFavorite();

  const favorites = allfavoriteByUser?.data?.favorites ?? [];
  const total = allfavoriteByUser?.data?.pagination?.total ?? 0;
  const totalPages = allfavoriteByUser?.data?.pagination?.totalPages ?? 0;

  // Build paginator page list with ellipsis
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => {
      if (totalPages <= 5) return true;
      return p === 1 || p === totalPages || Math.abs(p - page) <= 1;
    })
    .reduce<(number | "...")[]>((acc, p, idx, arr) => {
      if (
        idx > 0 &&
        typeof arr[idx - 1] === "number" &&
        (p as number) - (arr[idx - 1] as number) > 1
      ) {
        acc.push("...");
      }
      acc.push(p);
      return acc;
    }, []);

  const toggleSave = async (id: string, isFavorite: boolean) => {
    await toggleSaveAsFavorite({
      realEstateId: id,
      isFavorite: !isFavorite,
    });
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-12 py-10">
      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary tracking-tight">
          Saved Properties
        </h1>

        {total > 0 && (
          <p className="mt-1 text-sm text-muted-foreground">
            {total} {total === 1 ? "property" : "properties"} saved
          </p>
        )}

        <Separator className="mt-5" />
      </div>

      {/* ── Loading skeletons ── */}
      {favoriteLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!favoriteLoading && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 text-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center">
            <Heart className="h-7 w-7 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground mb-1">
              No saved properties yet
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Properties you save will appear here for easy access.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">Browse Listings</Link>
          </Button>
        </div>
      )}

      {/* ── Grid ── */}
      {!favoriteLoading && favorites.length > 0 && (
        <>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
            {favorites.map((favorite) => (
              <PropertyCard
                key={favorite._id}
                property={favorite.realEstateId}
                isSaved={true}
                onToggleSave={() =>
                  toggleSave(favorite.realEstateId._id, favorite.isFavorite)
                }
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Page <span className="text-foreground font-medium">{page}</span>{" "}
                of{" "}
                <span className="text-foreground font-medium">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>

                {/* Page numbers */}
                {pageNumbers.map((p, idx) =>
                  p === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-8 h-8 flex items-center justify-center text-xs text-muted-foreground"
                    >
                      ···
                    </span>
                  ) : (
                    <Button
                      key={p}
                      variant={page === p ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8 text-xs"
                      onClick={() => setPage(p as number)}
                    >
                      {p}
                    </Button>
                  ),
                )}

                {/* Next */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorite;
