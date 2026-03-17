import { productData } from "../data/product";
import type { Product } from "../type/product";

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").trim();
const PRODUCTS_ENDPOINT = (
  import.meta.env.VITE_PRODUCTS_ENDPOINT ?? "/products"
).trim();

const normalizeProducts = (payload: unknown): Product[] | null => {
  if (Array.isArray(payload)) {
    return payload as Product[];
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data?: unknown }).data)
  ) {
    return (payload as { data: Product[] }).data;
  }

  return null;
};

export const getProducts = async (): Promise<Product[]> => {
  if (!API_BASE_URL) {
    return productData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${PRODUCTS_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Product API is unavailable");
    }

    const payload: unknown = await response.json();
    return normalizeProducts(payload) ?? productData;
  } catch {
    return productData;
  }
};