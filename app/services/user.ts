import type {
  FetchUserResponse,
  TypeUser,
} from "../type/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const AUTH_TOKEN_KEY = "glowup_token";

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const fetchUser = async (): Promise<TypeUser> => {
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
    throw new Error("Failed to fetch user");
  }

  const data: FetchUserResponse = await response.json();
  return data.data;
};

export const logoutUser = async () => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  clearAuthToken();

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
};
