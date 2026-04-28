import { useGetAllSchedulings, useUpdateSchedulingStatus } from "@/apis/hooks/admin.hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, User, Home, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Scheduling } from "@/modules/admin-modules/types/admin.types";

export const SchedulingList = () => {
  const { data, isLoading } = useGetAllSchedulings(1, 10);
  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateSchedulingStatus();

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateStatus({ id, data: { status } });
      toast.success(`Request marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const columns: ColumnDef<Scheduling>[] = [
    {
      id: "property_title",
      accessorKey: "property.title",
      header: "Property",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Home size={14} className="text-muted-foreground" />
          <span className="font-medium">{row.original.property.title}</span>
        </div>
      ),
    },
    {
      accessorKey: "user.userName",
      header: "Requested By",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <User size={14} className="text-muted-foreground" />
            <span>{row.original.user.userName}</span>
          </div>
          <span className="text-xs text-muted-foreground">{row.original.user.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "requestedDate",
      header: "Requested Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-muted-foreground" />
          {new Date(row.original.requestedDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
          pending: 'outline',
          confirmed: 'default',
          completed: 'secondary',
          cancelled: 'destructive',
          rescheduled: 'outline'
        };
        return <Badge variant={variants[status]} className="capitalize">{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const item = row.original;
        if (item.status === 'completed' || item.status === 'cancelled') return null;
        return (
          <div className="text-right space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={() => handleStatusUpdate(item._id, 'confirmed')}
              disabled={isUpdating}
              title="Confirm"
            >
              <CheckCircle size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleStatusUpdate(item._id, 'cancelled')}
              disabled={isUpdating}
              title="Cancel"
            >
              <XCircle size={18} />
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
          <h1 className="text-2xl font-bold">Scheduling Management</h1>
          <p className="text-muted-foreground">View and manage viewing requests.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests List</CardTitle>
          <CardDescription>Total requests: {data?.pagination.total || 0}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.schedulings || []}
            searchKey="property_title" // Note: DataTable might need adjustment for nested keys or I should flatten data
            searchPlaceholder="Search requests..."
          />
        </CardContent>
      </Card>
    </div>
  );
};
