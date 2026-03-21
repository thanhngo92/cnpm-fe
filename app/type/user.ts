export interface User {
	id: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	role?: "admin" | "customer";
	address?: string;
	avatarUrl?: string;
	createdAt?: string;
	updatedAt?: string;
}
