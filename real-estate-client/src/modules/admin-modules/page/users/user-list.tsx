import React from 'react';
import { useGetAllUsers, useDeleteUser } from "@/apis/hooks/admin.hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Mail, Calendar, Shield, Edit } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/modules/admin-modules/types/admin.types";

export const UserList = () => {
  const [page] = React.useState(1);
  const { data, isLoading } = useGetAllUsers(page, 10);
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleDelete = async (userId: string, userName: string) => {
    if (confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
      } catch {
        toast.error("Failed to delete user");
      }
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "userName",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs">
              {user.userName.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{user.userName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail size={14} />
          {row.original.email}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <Badge variant={role === 'admin' ? 'default' : 'secondary'} className="capitalize gap-1">
            {role === 'admin' && <Shield size={10} />}
            {role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Joined Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={14} />
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;
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
              onClick={() => handleDelete(user._id, user.userName)}
              disabled={isDeleting || user.role === 'admin'}
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
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage and monitor platform users.</p>
        </div>
        <Button onClick={() => { /* TODO: Implement Create */ }}>Add New User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>Total users: {data?.pagination.total || 0}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.users || []}
            searchKey="userName"
            searchPlaceholder="Search users..."
          />
        </CardContent>
      </Card>
    </div>
  );
};
