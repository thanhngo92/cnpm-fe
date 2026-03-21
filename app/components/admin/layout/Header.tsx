import { useMemo } from "react";
import useAuth from "../../../hooks/useAuth";

export default function Header() {
  const { user, isLoading } = useAuth();

  const displayName = useMemo(() => {
    const name = user?.fullName?.trim();
    if (name) {
      return name;
    }

    return isLoading ? "Đang tải..." : "Người dùng";
  }, [user?.fullName, isLoading]);

  const subtitle = useMemo(() => {
    if (user?.role === "admin") {
      return "Quản trị viên";
    }

    if (user?.email) {
      return user.email;
    }

    return "Tài khoản của bạn";
  }, [user?.role, user?.email]);

  const initials = useMemo(() => {
    const name = user?.fullName?.trim();

    if (!name) {
      return "U";
    }

    const words = name.split(/\s+/).filter(Boolean);
    const first = words[0]?.[0] ?? "";
    const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";

    return `${first}${last}`.toUpperCase() || "U";
  }, [user?.fullName]);

  return (
    <header className="sticky top-0 z-20 h-16 shrink-0 border-b border-pink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-360 items-center justify-between px-4 md:px-5 lg:px-6">
        <div className="min-w-0"></div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden text-right text-sm sm:block">
            <p className="max-w-56 truncate font-semibold text-slate-900">
              {displayName}
            </p>
            <p className="max-w-56 truncate text-slate-500">{subtitle}</p>
          </div>

          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={displayName}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm font-semibold text-white">
              {initials}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
