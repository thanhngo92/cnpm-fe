import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { getProducts } from "../../../services/product";
import { getCategories } from "../../../services/category";
import type { Product } from "../../../type/product";
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
import ProductDetail from "./ProductDetail";
import ProductModal from "../modal/ProductModal";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setIsLoading(true);

        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (!mounted) {
          return;
        }

        setProducts(productData);
        setCategories(categoryData);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const categoryNameById = useMemo(() => {
    return categories.reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = item.name;
      return acc;
    }, {});
  }, [categories]);

  const filteredProducts = useMemo(() => {
    const query = keyword.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((item) => {
      const categoryName = categoryNameById[item.categoryId] ?? "";
      const inName = item.name.toLowerCase().includes(query);
      const inCategory = categoryName.toLowerCase().includes(query);
      const inDescription = (item.description ?? "")
        .toLowerCase()
        .includes(query);

      return inName || inCategory || inDescription;
    });
  }, [products, keyword, categoryNameById]);

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="space-y-5">
      <div className="space-y-4 border border-pink-100 bg-white p-4 shadow-[0_8px_24px_rgba(236,72,153,0.05)] sm:p-5">
        <CardHeader className="space-y-4 p-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 space-y-1.5">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Quản lý sản phẩm
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 text-slate-600">
                Quản lý thông tin sản phẩm, danh mục, giá bán và tồn kho.
              </CardDescription>
            </div>

            <Button
              className="h-10 shrink-0 bg-pink-500 px-4 text-white shadow-none hover:bg-pink-600"
              size="sm"
              onClick={() => setIsProductModalOpen(true)}
            >
              <Plus className="size-4" />
              Thêm sản phẩm
            </Button>
          </div>

          <div className="group relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-pink-500" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm theo tên, mô tả hoặc danh mục..."
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
                    Sản phẩm
                  </th>
                  <th
                    style={{ width: "17%" }}
                    className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Danh mục
                  </th>
                  <th
                    style={{ width: "24%" }}
                    className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Mô tả
                  </th>
                  <th
                    style={{ width: "15%" }}
                    className="py-3.5 pl-3.5 pr-4 text-right text-xs font-semibold uppercase tracking-wide"
                  >
                    Giá bán
                  </th>
                  <th
                    style={{ width: "10%" }}
                    className="py-3.5 pl-3.5 pr-4 text-right text-xs font-semibold uppercase tracking-wide"
                  >
                    Tồn kho
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
                      Đang tải dữ liệu sản phẩm...
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredProducts.map((item) => {
                    const categoryName =
                      categoryNameById[item.categoryId] ?? "Chưa phân loại";

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-pink-50 transition-colors duration-200 last:border-b-0 hover:bg-pink-50/30"
                      >
                        <td className="px-4 py-3.5 align-middle">
                          <button
                            type="button"
                            onClick={() => openProductDetail(item)}
                            className="flex w-full items-center gap-2.5 text-left"
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-10 w-10 shrink-0 object-cover"
                            />

                            <div className="min-w-0 overflow-hidden">
                              <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-slate-900 transition-colors duration-200 hover:text-pink-600">
                                {item.name}
                              </p>
                            </div>
                          </button>
                        </td>

                        <td className="px-3.5 py-3.5 align-middle">
                          <span className="block truncate text-sm text-slate-600">
                            {categoryName}
                          </span>
                        </td>

                        <td className="px-3.5 py-3.5 align-middle text-slate-500">
                          <p className="line-clamp-2 leading-6">
                            {item.description?.trim() || "-"}
                          </p>
                        </td>

                        <td className="py-3.5 pl-3.5 pr-4 text-right align-middle font-semibold tabular-nums text-slate-800">
                          {(item.price ?? 0).toLocaleString("vi-VN")} đ
                        </td>

                        <td className="py-3.5 pl-3.5 pr-4 text-right align-middle font-semibold tabular-nums text-slate-800">
                          {(item.stock ?? 0).toLocaleString("vi-VN")}
                        </td>

                        <td className="px-4 py-3.5 text-right align-middle">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              title="Chỉnh sửa sản phẩm"
                              onClick={() => openEditModal(item)}
                              className="inline-flex items-center gap-2 p-1.5 text-slate-600 transition-colors duration-200 hover:text-pink-600 hover:bg-pink-50 rounded"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              type="button"
                              title="Xóa sản phẩm"
                              onClick={() => openDeleteModal(item)}
                              className="inline-flex items-center gap-2 p-1.5 text-slate-600 transition-colors duration-200 hover:text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                {!isLoading && filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-sm text-slate-400"
                    >
                      Không tìm thấy sản phẩm phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </div>

      <DeleteModal
        open={isDeleteModalOpen}
        title="Xóa sản phẩm"
        description="Sản phẩm này sẽ bị xóa khỏi danh sách quản trị."
        confirmText="Xóa sản phẩm"
        onClose={closeDeleteModal}
        onConfirm={() => {}}
      />

      <ProductDetail
        open={isProductDetailOpen}
        product={selectedProduct}
        categoryName={
          selectedProduct
            ? (categoryNameById[selectedProduct.categoryId] ??
              "Chưa phân loại")
            : undefined
        }
        onClose={closeProductDetail}
      />

      <ProductModal
        open={isProductModalOpen}
        mode="create"
        categories={categories}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={() => {}}
      />

      <ProductModal
        open={isEditModalOpen}
        mode="edit"
        categories={categories}
        initialValues={
          productToEdit
            ? {
                name: productToEdit.name,
                brand: productToEdit.brand,
                description: productToEdit.description ?? "",
                price: String(productToEdit.price),
                stock: String(productToEdit.stock),
                imageUrl: productToEdit.imageUrl,
                categoryId: productToEdit.categoryId,
              }
            : undefined
        }
        onClose={() => {
          setIsEditModalOpen(false);
          setProductToEdit(null);
        }}
        onSubmit={() => {}}
      />
    </section>
  );
}
