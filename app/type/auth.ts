export interface TypeUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: TypeUser;
    token: string;
  };
}

export interface FetchUserResponse {
  success: boolean;
  message: string;
  data: TypeUser;
}