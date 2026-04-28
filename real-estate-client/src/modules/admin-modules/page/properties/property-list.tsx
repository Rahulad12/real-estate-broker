import { useGetAllListedProperty } from "@/apis/hooks/property.hooks";
import { useAdminDeleteProperty } from "@/apis/hooks/admin.hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, MapPin, Tag, CircleDollarSign, Edit } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Property } from "@/modules/broker-dashboard-modules/types/property.types";

export const PropertyList = () => {
  const { data, isLoading } = useGetAllListedProperty({ page: 1, limit: 10 });
  const { mutateAsync: deleteProperty, isPending: isDeleting } = useAdminDeleteProperty();

  const handleDelete = async (propertyId: string, title: string) => {
    if (confirm(`Are you sure you want to delete property "${title}"?`)) {
      try {
        await deleteProperty(propertyId);
        toast.success("Property deleted successfully");
      } catch {
        toast.error("Failed to delete property");
      }
    }
  };

  const columns: ColumnDef<Property>[] = [
    {
      accessorKey: "title",
      header: "Property",
      cell: ({ row }) => {
        const property = row.original;
        return (
          <div className="flex flex-col gap-1">
            <span className="font-medium line-clamp-1">{property.title}</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Tag size={12} />
              <span className="capitalize">{property.propertyType}</span>
              <span>•</span>
              <span className="capitalize">{property.type}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "location.address",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-muted-foreground max-w-[200px]">
          <MapPin size={14} className="shrink-0" />
          <span className="text-sm truncate">{row.original.location.address}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 font-semibold text-secondary">
          <CircleDollarSign size={14} />
          NPR {row.original.price.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status === 'available' ? 'outline' : 'secondary'} className="capitalize border-secondary/30 text-secondary">
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const property = row.original;
        return (
          <div className="text-right space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => { /* TODO: Implement Edit */ }}
            >
              <Edit size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleDelete(property._id, property.title)}
              disabled={isDeleting}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin mx-auto mt-20" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Property Management</h1>
          <p className="text-muted-foreground">Manage all property listings.</p>
        </div>
        <Button onClick={() => { /* TODO: Implement Create */ }}>Add New Property</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Properties List</CardTitle>
          <CardDescription>Total listings: {data?.pagination.total || 0}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.realEstates || []}
            searchKey="title"
            searchPlaceholder="Search properties..."
          />
        </CardContent>
      </Card>
    </div>
  );
};
