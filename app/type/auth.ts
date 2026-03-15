export interface TypeUser {
  _id: string;
  fullName: string;
  email: string | null;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchUserResponse {
  success: boolean;
  message: string;
  data: TypeUser;
}