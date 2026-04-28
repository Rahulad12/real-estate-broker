import { useGetAllListedProperty } from "@/apis/hooks/property.hooks";
import { useAdminDeleteProperty } from "@/apis/hooks/admin.hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, ArrowLeft, Home, MapPin, Tag, CircleDollarSign } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const AdminProperties = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetAllListedProperty({ page, limit: 10 });

  const { mutateAsync: deleteProperty, isPending: isDeleting } = useAdminDeleteProperty();

  const handleDelete = async (propertyId: string, title: string) => {
    if (confirm(`Are you sure you want to delete property "${title}"? This action cannot be undone.`)) {
      try {
        await deleteProperty(propertyId);
        toast.success("Property deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete property");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-primary tracking-tight">Manage Properties</h1>
            <p className="text-muted-foreground">Oversee all property listings and maintain platform quality.</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Home className="h-6 w-6 text-primary" />
          </div>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Properties List</CardTitle>
                <CardDescription>
                  Total listings: {data?.pagination.total || 0}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold">Property</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.realEstates.map((property) => (
                    <TableRow key={property._id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium line-clamp-1">{property.title}</span>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Tag size={12} />
                            <span className="capitalize">{property.propertyType}</span>
                            <span>•</span>
                            <span className="capitalize">{property.type}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground max-w-[200px]">
                          <MapPin size={14} className="shrink-0" />
                          <span className="text-sm truncate">{property.location.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 font-semibold text-secondary">
                          <CircleDollarSign size={14} />
                          NPR {property.price.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={property.status === 'available' ? 'outline' : 'secondary'} className="capitalize border-secondary/30 text-secondary">
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(property._id, property.title)}
                          disabled={isDeleting}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data?.realEstates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No properties found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {data && data.pagination.totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!data.pagination.hasPrevPage}
                >
                  Previous
                </Button>
                <div className="text-sm font-medium">
                  Page {page} of {data.pagination.totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!data.pagination.hasNextPage}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProperties;
