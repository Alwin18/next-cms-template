import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
}

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  per_page: number;
}

export interface UsersParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export const userKeys = {
  all: () => ["users"] as const,
  lists: () => ["users", "list"] as const,
  list: (params: UsersParams) => ["users", "list", params] as const,
  detail: (id: string) => ["users", "detail", id] as const,
};

async function fetchUsers(params: UsersParams): Promise<UsersResponse> {
  const searchParams = new URLSearchParams({
    page: String(params.page ?? 1),
    per_page: String(params.per_page ?? 20),
    ...(params.search ? { search: params.search } : {}),
  });

  const res = await fetch(`/api/users?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
}

export function useUsers(params: UsersParams = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => fetchUsers(params),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}