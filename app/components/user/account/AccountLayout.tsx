import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Sidebar, { type Tab } from "./Sidebar";
import Profile from "./Profile";
import MyOrder from "./MyOrder";
import type { TypeUser } from "../../../type/auth";

interface AccountModalProps {
  onClose: () => void;
  user: TypeUser | null;
  onLogout: () => void;
}

export default function AccountModal({
  onClose,
  user,
  onLogout,
}: AccountModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

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
        className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]"
        onClick={onClose}
      />

      <div className="bg-ui-page relative flex h-[88vh] w-[95vw] max-h-172.5 max-w-295 overflow-hidden shadow-[0_18px_48px_rgba(15,23,42,0.14)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 z-20 inline-flex h-9 w-9 items-center justify-center bg-white text-slate-500"
        >
          <X className="h-4 w-4" />
        </button>

        <Sidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />

        <div className="flex-1 overflow-y-auto bg-transparent px-7 py-8 pr-7 md:px-8 md:py-9 md:pr-8">
          {activeTab === "profile" && <Profile user={user} />}
          {activeTab === "my-orders" && <MyOrder />}
        </div>
      </div>
    </div>
  );
}
