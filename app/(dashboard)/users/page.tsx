"use client";

import { useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useUsers, useDeleteUser, User } from "@/hooks/use-users";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { LoadingOverlay } from "@/components/loading-overlay";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const roleStyles = {
        admin: "bg-primary/10 text-primary",
        editor: "bg-amber-100 text-amber-800",
        viewer: "bg-muted text-muted-foreground",
      } as const;

      return (
        <Badge
          variant="outline"
          className={roleStyles[row.original.role]}
        >
          {row.original.role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    cell: ({ row }) => <DeleteButton id={row.original.id} />,
  },
];

function DeleteButton({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteUser();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-muted-foreground hover:text-destructive"
      disabled={isPending}
      onClick={() => mutate(id)}
    >
      <Trash2 className="h-3.5 w-3.5" />
    </Button>
  );
}

export default function UsersPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, isLoading } = useUsers({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  });

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage CMS users and their roles.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={data?.data ?? []}
          rowCount={data?.total}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}