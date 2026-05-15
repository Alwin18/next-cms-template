import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

/* ============================================================
   TYPES
   ============================================================ */

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

export interface CreateUserPayload {
  name: string;
  email: string;
  role: User["role"];
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {
  id: string;
}

export const userKeys = {
  all: () => ["users"] as const,
  lists: () => ["users", "list"] as const,
  list: (params: UsersParams) => ["users", "list", params] as const,
  detail: (id: string) => ["users", "detail", id] as const,
};

const fetchUsers = async (params: UsersParams): Promise<UsersResponse> => {
  const { data } = await api.get<UsersResponse>("/users", { params });
  return data;
};

const fetchUser = async (id: string): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const { data } = await api.post<User>("/users", payload);
  return data;
};

const updateUser = async ({ id, ...payload }: UpdateUserPayload): Promise<User> => {
  const { data } = await api.patch<User>(`/users/${id}`, payload);
  return data;
};

const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

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

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      // Update cache detail langsung tanpa refetch
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      // Invalidate list agar data terbaru muncul di tabel
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
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