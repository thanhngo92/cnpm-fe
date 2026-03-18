import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Sidebar, { type Tab } from "./Sidebar";
import Profile from "./Profile";
import MyOrder from "./MyOrder";
import type { TypeUser } from "../../type/auth";

interface AccountModalProps {
  onClose: () => void;
  user: TypeUser | null;
  onLogout: () => void;
  initialTab?: Tab;
}

export default function AccountModal({
  onClose,
  user,
  onLogout,
  initialTab = "profile",
}: AccountModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-rose-900/10 backdrop-blur-[1px]"
        onClick={onClose}
      />

      <div className="relative flex h-[88vh] w-[95vw] max-h-172.5 max-w-295 overflow-hidden border border-rose-100 bg-linear-to-b from-white to-rose-50/30 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 z-20 inline-flex h-9 w-9 items-center justify-center bg-white text-slate-500 transition-colors hover:bg-rose-50 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>

        <Sidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />

        <div className="flex-1 overflow-y-auto bg-white/95 px-6 py-7 pr-6 md:px-8 md:py-8 md:pr-8">
          {activeTab === "profile" && <Profile user={user} />}
          {activeTab === "my-orders" && <MyOrder />}
        </div>
      </div>
    </div>
  );
}
