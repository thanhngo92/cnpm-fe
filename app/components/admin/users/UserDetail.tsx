import { X, Mail, Phone, MapPin, User as UserIcon } from "lucide-react";
import type { User } from "../../../type/user";

type UserDetailProps = {
  open: boolean;
  user: User | null;
  onClose: () => void;
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-pink-50 py-3.5 last:border-b-0">
      <span className="mt-0.5 shrink-0 text-slate-400">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-medium text-slate-800">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

export default function UserDetail({ open, user, onClose }: UserDetailProps) {
  if (!open || !user) return null;

  const initials = user.fullName
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4 sm:px-6 sm:py-8">
      <button
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
      />

      <div className="relative z-10 flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden border border-pink-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
        {/* X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded border border-transparent text-slate-400 transition-colors duration-200 hover:bg-pink-50 hover:text-pink-600"
        >
          <X className="size-4" />
        </button>

        {/* Avatar header */}
        <div className="flex flex-col items-center bg-[linear-gradient(160deg,rgba(251,207,232,0.4)_0%,rgba(255,255,255,1)_70%)] px-6 pb-5 pt-8">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="h-20 w-20 rounded-full border-2 border-pink-100 object-cover shadow-md"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-pink-100 bg-pink-50 text-xl font-bold text-pink-500 shadow-md">
              {initials}
            </div>
          )}

          <h2 className="mt-3 text-lg font-bold tracking-tight text-slate-900">
            {user.fullName}
          </h2>
        </div>

        {/* Divider */}
        <div className="border-t border-pink-100" />

        {/* Info list */}
        <div className="overflow-y-auto px-5 py-1">
          <InfoRow
            icon={<Mail className="size-4" />}
            label="Email"
            value={user.email}
          />
          <InfoRow
            icon={<Phone className="size-4" />}
            label="Số điện thoại"
            value={user.phoneNumber}
          />
          <InfoRow
            icon={<MapPin className="size-4" />}
            label="Địa chỉ"
            value={user.address ?? ""}
          />
          {user.createdAt && (
            <InfoRow
              icon={<UserIcon className="size-4" />}
              label="Ngày tạo"
              value={new Date(user.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
