import { useEffect, useMemo, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import type { Category } from "../../../type/category";

export type ProductFormValues = {
  name: string;
  brand: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  categoryId: string;
};

type ProductModalProps = {
  open: boolean;
  mode: "create" | "edit";
  loading?: boolean;
  categories: Category[];
  initialValues?: Partial<ProductFormValues>;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
};

const defaultValues: ProductFormValues = {
  name: "",
  brand: "",
  description: "",
  price: "",
  stock: "",
  imageUrl: "",
  categoryId: "",
};



export default function ProductModal({
  open,
  mode,
  loading = false,
  categories,
  initialValues,
  onClose,
  onSubmit,
}: ProductModalProps) {
  const mergedInitialValues = useMemo<ProductFormValues>(
    () => ({
      ...defaultValues,
      ...initialValues,
    }),
    [initialValues]
  );

  const [formValues, setFormValues] =
    useState<ProductFormValues>(mergedInitialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormValues, string>>
  >({});
  const [imagePreviewError, setImagePreviewError] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setFormValues(mergedInitialValues);
    setErrors({});
    setImagePreviewError(false);
  }, [open, mergedInitialValues]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const submitText = mode === "create" ? "Lưu sản phẩm" : "Cập nhật";

  const setField = <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ProductFormValues, string>> = {};

    if (!formValues.name.trim()) {
      nextErrors.name = "Vui lòng nhập tên sản phẩm.";
    }

    if (!formValues.brand.trim()) {
      nextErrors.brand = "Vui lòng nhập thương hiệu.";
    }

    if (!formValues.categoryId) {
      nextErrors.categoryId = "Vui lòng chọn danh mục.";
    }

    if (!formValues.price.trim() || isNaN(Number(formValues.price)) || Number(formValues.price) < 0) {
      nextErrors.price = "Vui lòng nhập giá hợp lệ.";
    }

    if (!formValues.stock.trim() || isNaN(Number(formValues.stock)) || Number(formValues.stock) < 0) {
      nextErrors.stock = "Vui lòng nhập số lượng hợp lệ.";
    }

    if (!formValues.imageUrl.trim()) {
      nextErrors.imageUrl = "Vui lòng nhập đường dẫn hình ảnh.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    await onSubmit({
      name: formValues.name.trim(),
      brand: formValues.brand.trim(),
      description: formValues.description.trim(),
      price: formValues.price.trim(),
      stock: formValues.stock.trim(),
      imageUrl: formValues.imageUrl.trim(),
      categoryId: formValues.categoryId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-5 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="relative z-10 flex max-h-[calc(100vh-2.5rem)] w-full max-w-4xl flex-col overflow-hidden border border-pink-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
        {/* X – absolute, không chiếm layout */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex items-center rounded border border-transparent p-1.5 text-slate-400 transition-colors duration-200 hover:border-pink-100 hover:bg-pink-50 hover:text-pink-600"
        >
          <X className="size-4" />
        </button>

        {/* Body */}
        <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto bg-white px-5 pb-5 pt-9 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          {/* Left – form fields */}
          <div className="space-y-5">
            {/* Tên sản phẩm – full width */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Tên sản phẩm
              </label>
              <Input
                value={formValues.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Nhập tên sản phẩm"
                className="h-10 border-pink-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
              />
              {errors.name && (
                <p className="text-xs text-rose-500">{errors.name}</p>
              )}
            </div>

            {/* Thương hiệu & Danh mục */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Thương hiệu
                </label>
                <Input
                  value={formValues.brand}
                  onChange={(e) => setField("brand", e.target.value)}
                  placeholder="Nhập thương hiệu"
                  className="h-10 border-pink-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                {errors.brand && (
                  <p className="text-xs text-rose-500">{errors.brand}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Danh mục
                </label>
                <select
                  value={formValues.categoryId}
                  onChange={(e) => setField("categoryId", e.target.value)}
                  className="h-10 w-full border border-pink-200 bg-white px-3 text-sm text-slate-900 outline-none transition-[color,box-shadow,border-color] duration-200 ease-out focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
                >
                  <option value="" className="text-slate-400">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-xs text-rose-500">{errors.categoryId}</p>
                )}
              </div>
            </div>

            {/* Giá & Tồn kho */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Giá bán (₫)
                </label>
                <Input
                  type="number"
                  min={0}
                  value={formValues.price}
                  onChange={(e) => setField("price", e.target.value)}
                  placeholder="0"
                  className="h-10 border-pink-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                {errors.price && (
                  <p className="text-xs text-rose-500">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Tồn kho
                </label>
                <Input
                  type="number"
                  min={0}
                  value={formValues.stock}
                  onChange={(e) => setField("stock", e.target.value)}
                  placeholder="0"
                  className="h-10 border-pink-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                {errors.stock && (
                  <p className="text-xs text-rose-500">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Hình ảnh */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Hình ảnh
              </label>
              <div className="relative">
                <Input
                  value={formValues.imageUrl}
                  onChange={(e) => {
                    setImagePreviewError(false);
                    setField("imageUrl", e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="h-10 border-pink-200 bg-white pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                <ImagePlus className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </div>
              {errors.imageUrl && (
                <p className="text-xs text-rose-500">{errors.imageUrl}</p>
              )}
            </div>

            {/* Mô tả */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Mô tả
              </label>
              <textarea
                value={formValues.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={5}
                placeholder="Nhập mô tả sản phẩm"
                className="min-h-[128px] w-full border border-pink-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none transition-[color,box-shadow,border-color] duration-200 ease-out placeholder:text-slate-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>

          {/* Right – preview */}
          <div className="space-y-4 border-l border-pink-100 pl-5">
            <p className="pt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Xem trước
            </p>

            <div className="flex h-[220px] items-center justify-center overflow-hidden border border-pink-100 bg-pink-50/30">
              {formValues.imageUrl.trim() && !imagePreviewError ? (
                <img
                  src={formValues.imageUrl}
                  alt={formValues.name || "Preview"}
                  className="h-full w-full object-cover"
                  onError={() => setImagePreviewError(true)}
                />
              ) : (
                <div className="px-4 text-center text-sm text-slate-400">
                  {formValues.imageUrl.trim()
                    ? "Không thể tải hình ảnh"
                    : "Chưa có hình ảnh"}
                </div>
              )}
            </div>

            <div className="space-y-1.5 border border-pink-100 bg-pink-50/20 p-3.5">
              <p className="truncate text-sm font-semibold text-slate-900">
                {formValues.name.trim() || "Tên sản phẩm"}
              </p>
              {formValues.brand.trim() && (
                <p className="truncate text-xs text-slate-500">
                  {formValues.brand.trim()}
                </p>
              )}
              {formValues.price !== "" && !isNaN(Number(formValues.price)) && (
                <p className="text-sm font-semibold tabular-nums text-pink-600">
                  {Number(formValues.price).toLocaleString("vi-VN")} đ
                </p>
              )}
              <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                {formValues.description.trim() ||
                  "Mô tả sản phẩm sẽ hiển thị ở đây."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-pink-100 bg-white px-5 py-4 sm:px-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-none hover:bg-slate-50"
          >
            Hủy
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 bg-pink-500 px-4 text-sm text-white shadow-none hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Đang lưu..." : submitText}
          </Button>
        </div>
      </div>
    </div>
  );
}
