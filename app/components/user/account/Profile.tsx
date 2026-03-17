import { Mail, MapPin, Phone, Save, User } from "lucide-react";
import type { TypeUser } from "../../../type/auth";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

interface ProfileProps {
  user: TypeUser | null;
}

export default function Profile({ user }: ProfileProps) {
  const displayName = user?.fullName?.trim() || "Người dùng";
  const phoneNumber = user?.phoneNumber?.trim() || "Chưa cập nhật";
  const email = user?.email?.trim() || "Chưa cập nhật";
  const address = (
    (user as TypeUser & { address?: string; deliveryAddress?: string })
      ?.deliveryAddress ||
    (user as TypeUser & { address?: string; deliveryAddress?: string })
      ?.address ||
    "Chưa cập nhật địa chỉ"
  )
    .toString()
    .trim();

  return (
    <section className="w-full">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-white text-slate-600 shadow-[0_6px_14px_rgba(15,23,42,0.05)]">
          <User className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold leading-tight text-slate-900">
            {displayName}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Thông tin tài khoản</p>
        </div>
      </div>

      <form className="max-w-4xl space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label className="mb-2 block text-sm font-medium text-slate-700">
              Họ và tên
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
              <Input
                value={displayName}
                readOnly
                className="h-11 !rounded-none !border-0 bg-white pl-11 pr-4 text-base text-slate-700 shadow-none transition-colors focus-visible:ring-pink-200/70"
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-slate-700">
              Số điện thoại
            </Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
              <Input
                value={phoneNumber}
                readOnly
                className="h-11 !rounded-none !border-0 bg-white pl-11 pr-4 text-base text-slate-700 shadow-none transition-colors focus-visible:ring-pink-200/70"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <Input
              value={email}
              readOnly
              className="h-11 !rounded-none !border-0 bg-white pl-11 pr-4 text-base text-slate-700 shadow-none transition-colors focus-visible:ring-pink-200/70"
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 block text-sm font-medium text-slate-700">
            Địa chỉ giao hàng
          </Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 h-4.5 w-4.5 text-slate-400" />
            <Textarea
              value={address}
              readOnly
              className="min-h-24 resize-none !rounded-none !border-0 bg-white py-3 pl-11 pr-4 text-base text-slate-700 shadow-none transition-colors focus-visible:ring-pink-200/70"
            />
          </div>
        </div>

        <Button
          type="button"
          className="mt-2 h-11 w-full !rounded-none bg-pink-600 text-sm font-semibold text-white hover:bg-pink-700 md:w-auto md:min-w-52"
        >
          <Save className="h-4.5 w-4.5" />
          Lưu thay đổi
        </Button>
      </form>
    </section>
  );
}
