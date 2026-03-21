export interface Category {
  id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  description?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
