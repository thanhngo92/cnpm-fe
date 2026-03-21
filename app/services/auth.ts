import type { AuthResponse, LoginRequest, RegisterRequest } from "../type/auth";
import type { User } from "../type/user";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const AUTH_TOKEN_KEY = "glowup_token";
const AUTH_USER_KEY = "glowup_user";

export const parseErrorMessage = async (
  response: Response,
  fallbackMessage: string
): Promise<string> => {
  try {
    const data = await response.json();
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
  } catch {
    // Keep fallback message when response body is not JSON.
  }

  return fallbackMessage;
};

export const setAuthToken = (token: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const setAuthUser = (user: User) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

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
  window.localStorage.removeItem(AUTH_USER_KEY);
};

export const loginUser = async (payload: LoginRequest): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await parseErrorMessage(
      response,
      "Đăng nhập thất bại, vui lòng thử lại"
    );
    throw new Error(message);
  }

  const data: AuthResponse = await response.json();
  setAuthToken(data.data.token);
  setAuthUser(data.data.user);

  return data.data.user;
};

export const registerUser = async (
  payload: RegisterRequest
): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await parseErrorMessage(
      response,
      "Đăng ký thất bại, vui lòng thử lại"
    );
    throw new Error(message);
  }

  const data: AuthResponse = await response.json();
  return data.data.user;
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
    const message = await parseErrorMessage(response, "Không thể đăng xuất");
    throw new Error(message);
  }
};
