import { useEffect, useMemo, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export type CategoryFormValues = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  status: "active" | "inactive";
};

type CategoryModalProps = {
  open: boolean;
  mode: "create" | "edit";
  loading?: boolean;
  initialValues?: Partial<CategoryFormValues>;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => void | Promise<void>;
};

const defaultValues: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  imageUrl: "",
  status: "active",
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CategoryModal({
  open,
  mode,
  loading = false,
  initialValues,
  onClose,
  onSubmit,
}: CategoryModalProps) {
  const mergedInitialValues = useMemo<CategoryFormValues>(
    () => ({
      ...defaultValues,
      ...initialValues,
    }),
    [initialValues]
  );

  const [formValues, setFormValues] =
    useState<CategoryFormValues>(mergedInitialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CategoryFormValues, string>>
  >({});
  const [isSlugTouched, setIsSlugTouched] = useState(false);
  const [imagePreviewError, setImagePreviewError] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setFormValues(mergedInitialValues);
    setErrors({});
    setIsSlugTouched(Boolean(mergedInitialValues.slug));
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

  const title = mode === "create" ? "Thêm danh mục" : "Chỉnh sửa danh mục";
  const submitText = mode === "create" ? "Lưu danh mục" : "Cập nhật";

  const setField = <K extends keyof CategoryFormValues>(
    key: K,
    value: CategoryFormValues[K]
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

  const handleNameChange = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      name: value,
      slug: isSlugTouched ? prev.slug : toSlug(value),
    }));

    setErrors((prev) => ({
      ...prev,
      name: "",
      slug: "",
    }));
  };

  const handleSlugChange = (value: string) => {
    setIsSlugTouched(true);
    setField("slug", toSlug(value));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof CategoryFormValues, string>> = {};

    if (!formValues.name.trim()) {
      nextErrors.name = "Vui lòng nhập tên danh mục.";
    }

    if (!formValues.slug.trim()) {
      nextErrors.slug = "Vui lòng nhập slug.";
    }

    if (!formValues.description.trim()) {
      nextErrors.description = "Vui lòng nhập mô tả.";
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
      slug: toSlug(formValues.slug),
      description: formValues.description.trim(),
      imageUrl: formValues.imageUrl.trim(),
      status: formValues.status,
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

        <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto bg-white px-5 pb-5 pt-9 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Tên danh mục
                </label>
                <Input
                  value={formValues.name}
                  onChange={(event) => handleNameChange(event.target.value)}
                  placeholder="Nhập tên danh mục"
                  className="h-11 border-pink-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                {errors.name && (
                  <p className="text-xs text-rose-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Slug
                </label>
                <Input
                  value={formValues.slug}
                  onChange={(event) => handleSlugChange(event.target.value)}
                  placeholder="vi-du-slug"
                  className="h-11 border-pink-200 bg-white font-mono text-sm text-slate-600 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                {errors.slug && (
                  <p className="text-xs text-rose-500">{errors.slug}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_180px]">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Hình ảnh
                </label>
                <div className="relative">
                  <Input
                    value={formValues.imageUrl}
                    onChange={(event) => {
                      setImagePreviewError(false);
                      setField("imageUrl", event.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="h-11 border-pink-200 bg-white pr-10 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                  />
                  <ImagePlus className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.imageUrl && (
                  <p className="text-xs text-rose-500">{errors.imageUrl}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Trạng thái
                </label>
                <select
                  value={formValues.status}
                  onChange={(event) =>
                    setField(
                      "status",
                      event.target.value as CategoryFormValues["status"]
                    )
                  }
                  className="h-11 w-full border border-pink-200 bg-white px-3 text-sm text-slate-600 outline-none transition-[color,box-shadow,border-color] duration-200 ease-out focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-600">
                Mô tả
              </label>
              <textarea
                value={formValues.description}
                onChange={(event) =>
                  setField("description", event.target.value)
                }
                rows={7}
                placeholder="Nhập mô tả danh mục"
                className="min-h-[176px] w-full border border-pink-200 bg-white px-3 py-3 text-sm leading-6 text-slate-600 outline-none transition-[color,box-shadow,border-color] duration-200 ease-out placeholder:text-slate-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
              />
              {errors.description && (
                <p className="text-xs text-rose-500">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 border-l border-pink-100 pl-5">
            <p className="text-sm font-medium text-slate-600">Xem trước</p>

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

            <div className="space-y-2 border border-pink-100 bg-pink-50/20 p-3.5">
              <p className="truncate text-sm font-medium text-slate-900">
                {formValues.name.trim() || "Tên danh mục"}
              </p>
              <p className="truncate font-mono text-xs text-slate-500">
                {formValues.slug.trim() || "slug-danh-muc"}
              </p>
              <p className="line-clamp-4 text-sm leading-6 text-slate-500">
                {formValues.description.trim() ||
                  "Mô tả danh mục sẽ hiển thị ở đây."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-pink-100 bg-white px-5 py-4 sm:px-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 border-slate-200 bg-white px-4 text-slate-700 shadow-none hover:bg-slate-50"
          >
            Hủy
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 bg-pink-500 px-4 text-white shadow-none hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Đang lưu..." : submitText}
          </Button>
        </div>
      </div>
    </div>
  );
}
