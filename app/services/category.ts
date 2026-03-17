import { categoryData } from "../data/category";
import type { Category } from "../type/category";

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").trim();
const CATEGORIES_ENDPOINT = (
  import.meta.env.VITE_CATEGORIES_ENDPOINT ?? "/categories"
).trim();

const normalizeCategories = (payload: unknown): Category[] | null => {
  if (Array.isArray(payload)) {
    return payload as Category[];
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data?: unknown }).data)
  ) {
    return (payload as { data: Category[] }).data;
  }

  return null;
};

export const getCategories = async (): Promise<Category[]> => {
  if (!API_BASE_URL) {
    return categoryData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${CATEGORIES_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Category API is unavailable");
    }

    const payload: unknown = await response.json();
    return normalizeCategories(payload) ?? categoryData;
  } catch {
    return categoryData;
  }
};