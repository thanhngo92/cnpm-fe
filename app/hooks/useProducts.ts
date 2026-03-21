import { useEffect, useMemo, useState } from "react";

import { getCategories } from "../services/category";
import { getProducts } from "../services/product";
import type { Category } from "../type/category";
import type { Product } from "../type/product";

const ALL_CATEGORY_ID = "all";
type CategoryFilter = typeof ALL_CATEGORY_ID | string;

export const useProducts = (slug?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<CategoryFilter>(ALL_CATEGORY_ID);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCatalogData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productResponse, categoryResponse] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (!isMounted) {
          return;
        }

        setProducts(productResponse);
        setCategories(categoryResponse);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Không thể tải dữ liệu sản phẩm"
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCatalogData();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeCategories = useMemo(
    () => categories.filter((category) => category.status === "active"),
    [categories]
  );

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!slug) {
      setCategoryId(ALL_CATEGORY_ID);
      return;
    }

    const matchedCategory = activeCategories.find(
      (category) => category.slug === slug
    );

    if (!matchedCategory) {
      setCategoryId(ALL_CATEGORY_ID);
      return;
    }

    setCategoryId(matchedCategory.id);
  }, [slug, loading, activeCategories]);

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        categoryId === ALL_CATEGORY_ID || product.categoryId === categoryId;

      const matchesQuery =
        normalizedKeyword.length === 0 ||
        product.name.toLowerCase().includes(normalizedKeyword) ||
        product.brand.toLowerCase().includes(normalizedKeyword);

      return matchesCategory && matchesQuery;
    });
  }, [categoryId, keyword, products]);

  return {
    products,
    categories: activeCategories,
    filteredProducts,
    loading,
    error,
    categoryId,
    setCategoryId,
    keyword,
    setKeyword,
  };
};