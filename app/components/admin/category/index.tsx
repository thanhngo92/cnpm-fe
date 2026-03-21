import { useEffect, useMemo, useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { getCategories } from "../../../services/category";
import { getProducts } from "../../../services/product";
import type { Category } from "../../../type/category";
import { Button } from "../../ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import DeleteModal from "../modal/DeleteModal";
import CategoryModal from "../modal/CategoryModal";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productQuantityByCategory, setProductQuantityByCategory] = useState<
    Record<string, number>
  >({});
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);

        const [categoryData, productData] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);

        const quantityByCategory = productData.reduce<Record<string, number>>(
          (acc, product) => {
            acc[product.categoryId] =
              (acc[product.categoryId] ?? 0) + product.stock;
            return acc;
          },
          {}
        );

        if (!mounted) {
          return;
        }

        setCategories(categoryData);
        setProductQuantityByCategory(quantityByCategory);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const query = keyword.trim().toLowerCase();

    if (!query) {
      return categories;
    }

    return categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query) ||
        (category.description ?? "").toLowerCase().includes(query)
      );
    });
  }, [categories, keyword]);

  const openCreateModal = () => {
    setSelectedCategory(null);
    setIsCategoryModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setSelectedCategory(null);
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <>
      <section className="space-y-5">
        <div className="space-y-4 border border-pink-100 bg-white p-4 shadow-[0_8px_24px_rgba(236,72,153,0.05)] sm:p-5">
          <CardHeader className="space-y-4 p-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 space-y-1.5">
                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                  Quản lý danh mục
                </CardTitle>
                <CardDescription className="max-w-2xl text-sm leading-6 text-slate-600">
                  Quản lý thông tin danh mục, trạng thái hoạt động và số lượng
                  sản phẩm.
                </CardDescription>
              </div>

              <Button
                className="h-10 shrink-0 bg-pink-500 px-4 text-white shadow-none hover:bg-pink-600"
                size="sm"
                onClick={openCreateModal}
              >
                <Plus className="size-4" />
                Thêm danh mục
              </Button>
            </div>

            <div className="group relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-pink-500" />
              <Input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Tìm theo tên, slug hoặc mô tả..."
                className="h-11 border-slate-200 bg-white pl-9 text-slate-700 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
              />
            </div>
          </CardHeader>
        </div>

        <div className="border border-pink-100 bg-white shadow-[0_10px_28px_rgba(236,72,153,0.04)]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-235 table-fixed text-sm">
                <thead>
                  <tr className="bg-pink-50/60 text-left text-slate-500">
                    <th
                      style={{ width: "22%" }}
                      className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide"
                    >
                      Danh mục
                    </th>
                    <th
                      style={{ width: "17%" }}
                      className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                    >
                      Slug
                    </th>
                    <th
                      style={{ width: "24%" }}
                      className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                    >
                      Mô tả
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                    >
                      Trạng thái
                    </th>
                    <th
                      style={{ width: "10%" }}
                      className="px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wide"
                    >
                      Số lượng
                    </th>
                    <th
                      style={{ width: "12%" }}
                      className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wide"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {isLoading && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center text-sm text-slate-400"
                      >
                        Đang tải dữ liệu danh mục...
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    filteredCategories.map((category) => {
                      const quantity =
                        productQuantityByCategory[category.id] ?? 0;
                      const isActive = category.status === "active";

                      return (
                        <tr
                          key={category.id}
                          className="border-b border-pink-50 transition-colors duration-200 last:border-b-0 hover:bg-pink-50/30"
                        >
                          <td className="px-4 py-3.5 align-middle">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={category.imageUrl}
                                alt={category.name}
                                className="h-10 w-10 shrink-0 object-cover"
                              />

                              <div className="min-w-0 overflow-hidden">
                                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-slate-900">
                                  {category.name}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-3.5 py-3.5 align-middle">
                            <span className="block truncate font-mono text-xs text-slate-500">
                              {category.slug}
                            </span>
                          </td>

                          <td className="px-3.5 py-3.5 align-middle text-slate-500">
                            <p className="line-clamp-2 leading-6">
                              {category.description?.trim() || "-"}
                            </p>
                          </td>

                          <td className="px-3.5 py-3.5 align-middle">
                            <span
                              className={`inline-flex min-h-8 items-center px-3 py-1 text-xs font-semibold ${
                                isActive
                                  ? "bg-pink-50 text-pink-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {isActive ? "Hoạt động" : "Không hoạt động"}
                            </span>
                          </td>

                          <td className="px-3 py-3.5 text-center align-middle font-semibold tabular-nums text-slate-800">
                            {quantity.toLocaleString("vi-VN")}
                          </td>

                          <td className="px-4 py-3.5 text-right align-middle">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                title="Chỉnh sửa danh mục"
                                onClick={() => openEditModal(category)}
                                className="inline-flex items-center gap-2 rounded p-1.5 text-slate-600 transition-colors duration-200 hover:bg-pink-50 hover:text-pink-600"
                              >
                                <Edit className="size-4" />
                              </button>

                              <button
                                type="button"
                                title="Xóa danh mục"
                                onClick={() => openDeleteModal(category)}
                                className="inline-flex items-center gap-2 rounded p-1.5 text-slate-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {!isLoading && filteredCategories.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center text-sm text-slate-400"
                      >
                        Không tìm thấy danh mục phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </div>
      </section>

      <CategoryModal
        open={isCategoryModalOpen}
        mode={selectedCategory ? "edit" : "create"}
        initialValues={
          selectedCategory
            ? {
                name: selectedCategory.name,
                slug: selectedCategory.slug,
                description: selectedCategory.description ?? "",
                imageUrl: selectedCategory.imageUrl,
                status: selectedCategory.status,
              }
            : undefined
        }
        onClose={closeCategoryModal}
        onSubmit={async () => {
          closeCategoryModal();
        }}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        title="Xóa danh mục"
        description="Danh mục này sẽ bị gỡ khỏi danh sách quản trị."
        confirmText="Xóa danh mục"
        onClose={closeDeleteModal}
        onConfirm={() => {}}
      />
    </>
  );
}
