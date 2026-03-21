import type { FetchUserResponse } from "../type/auth";
import type { User } from "../type/user";
import { userData } from "../data/user";
import {
  clearAuthToken,
  getAuthToken,
  parseErrorMessage,
} from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const toAdminUser = (raw: unknown, index: number): User => {
  const item = (raw ?? {}) as Record<string, unknown>;

  const id = String(item.id ?? `user-${index + 1}`);
  const fullName = String(item.fullName ?? item.name ?? "Người dùng");
  const email = String(item.email ?? "");
  const phoneNumber = String(item.phoneNumber ?? item.phone ?? "");
  const address = String(item.address ?? item.deliveryAddress ?? "");
  const rawRole = String(item.role ?? "customer").toLowerCase();
  const role: User["role"] = rawRole === "admin" ? "admin" : "customer";
  const avatarUrl = String(item.avatarUrl ?? "https://i.pravatar.cc/120?u=" + id);

  return {
    id,
    fullName,
    email,
    phoneNumber,
    address,
    role,
    avatarUrl,
  };
};

export const fetchUser = async (): Promise<User> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Missing auth token");
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthToken();
    }
    const message = await parseErrorMessage(
      response,
      "Không thể lấy thông tin người dùng"
    );
    throw new Error(message);
  }

  const data: FetchUserResponse = await response.json();
  return data.data;
};

export const getUser = async (): Promise<User> => {
  return fetchUser();
};

export const getUsers = async (): Promise<User[]> => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthToken();
    }
    return userData;
  }

  const payload = (await response.json()) as
    | { data?: unknown[] }
    | unknown[];
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.data)
      ? payload.data
      : [];

  const users = list.map(toAdminUser);
  return users.length > 0 ? users : userData;
};

