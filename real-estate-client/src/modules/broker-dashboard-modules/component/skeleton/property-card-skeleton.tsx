import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border border-border/60">
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <CardContent className="p-4 flex flex-col gap-3">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/5" />
        <div className="flex gap-3 mt-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default PropertyCardSkeleton;
