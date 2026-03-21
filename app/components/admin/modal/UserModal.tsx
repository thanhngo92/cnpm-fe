import { useEffect, useState } from "react";
import { X, ImagePlus } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import type { User } from "../../../type/user";

export type UserFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatarUrl: string;
};

type UserModalProps = {
  open: boolean;
  mode: "create" | "edit";
  loading?: boolean;
  initialValues?: Partial<UserFormValues>;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void | Promise<void>;
};

const defaultValues: UserFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  avatarUrl: "",
};

export default function UserModal({
  open,
  mode,
  loading = false,
  initialValues,
  onClose,
  onSubmit,
}: UserModalProps) {
  const [formValues, setFormValues] = useState<UserFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormValues, string>>
  >({});
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    if (!open) return;
    setFormValues({ ...defaultValues, ...initialValues });
    setErrors({});
    setAvatarError(false);
  }, [open, initialValues]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const submitText = mode === "create" ? "Lưu người dùng" : "Cập nhật";

  const setField = <K extends keyof UserFormValues>(
    key: K,
    value: UserFormValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const next: Partial<Record<keyof UserFormValues, string>> = {};

    if (!formValues.fullName.trim()) {
      next.fullName = "Vui lòng nhập họ tên.";
    }

    if (!formValues.email.trim()) {
      next.email = "Vui lòng nhập email.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      next.email = "Email không hợp lệ.";
    }

    if (!formValues.phoneNumber.trim()) {
      next.phoneNumber = "Vui lòng nhập số điện thoại.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSubmit({
      fullName: formValues.fullName.trim(),
      email: formValues.email.trim(),
      phoneNumber: formValues.phoneNumber.trim(),
      address: formValues.address.trim(),
      avatarUrl: formValues.avatarUrl.trim(),
    });
  };

  const initials = formValues.fullName
    .trim()
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-5 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="relative z-10 flex max-h-[calc(100vh-2.5rem)] w-full max-w-3xl flex-col overflow-hidden border border-pink-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
        {/* X – absolute, không chiếm layout */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex items-center rounded border border-transparent p-1.5 text-slate-400 transition-colors duration-200 hover:bg-pink-50 hover:text-pink-600"
        >
          <X className="size-4" />
        </button>

        {/* Body */}
        <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto bg-white px-5 pb-5 pt-9 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px]">
          {/* Left – fields */}
          <div className="space-y-4">
            {/* Họ tên */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Họ và tên
              </label>
              <Input
                value={formValues.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                placeholder="Nhập họ và tên"
                className="h-10 border-pink-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email & SĐT */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Email
                </label>
                <Input
                  type="email"
                  value={formValues.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="example@email.com"
                  className="h-10 border-pink-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                {errors.email && (
                  <p className="text-xs text-rose-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Số điện thoại
                </label>
                <Input
                  value={formValues.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                  placeholder="0901 234 567"
                  className="h-10 border-pink-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-rose-500">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Địa chỉ
              </label>
              <Input
                value={formValues.address}
                onChange={(e) => setField("address", e.target.value)}
                placeholder="Số nhà, đường, quận/huyện, tỉnh/thành"
                className="h-10 border-pink-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
              />
            </div>

            {/* Avatar URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Ảnh đại diện (URL)
              </label>
              <div className="relative">
                <Input
                  value={formValues.avatarUrl}
                  onChange={(e) => {
                    setAvatarError(false);
                    setField("avatarUrl", e.target.value);
                  }}
                  placeholder="https://example.com/avatar.jpg"
                  className="h-10 border-pink-200 bg-white pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
                />
                <ImagePlus className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Right – preview */}
          <div className="space-y-4 border-l border-pink-100 pl-5">
            <p className="pt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Xem trước
            </p>

            <div className="flex h-[180px] items-center justify-center overflow-hidden border border-pink-100 bg-pink-50/30">
              {formValues.avatarUrl.trim() && !avatarError ? (
                <img
                  src={formValues.avatarUrl}
                  alt={formValues.fullName || "Avatar"}
                  className="h-full w-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-2xl font-bold text-pink-500">
                  {initials || "?"}
                </div>
              )}
            </div>

            <div className="space-y-1.5 border border-pink-100 bg-pink-50/20 p-3.5">
              <p className="truncate text-sm font-semibold text-slate-900">
                {formValues.fullName.trim() || "Họ và tên"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {formValues.email.trim() || "email@example.com"}
              </p>
              {formValues.phoneNumber.trim() && (
                <p className="truncate text-xs text-slate-500">
                  {formValues.phoneNumber.trim()}
                </p>
              )}
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
