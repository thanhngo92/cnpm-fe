import { useNavigate } from "react-router";
import { Mail, MapPin, Phone, Truck, User } from "lucide-react";
import OrderSummary from "../../../components/user/checkout/OrderSummary";

export default function ShippingPage() {
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-10 items-start">
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-7">
          <Truck size={20} className="text-pink-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Thông tin giao hàng
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Họ và tên
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Nhập họ và tên"
                className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Số điện thoại
            </label>
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Nhập số điện thoại"
                className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:border-pink-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email (Tùy chọn)
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Nhập email để nhận thông báo đơn hàng"
              className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Địa chỉ nhận hàng
          </label>
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-5 text-slate-400"
            />
            <textarea
              rows={4}
              placeholder="Nhập địa chỉ chi tiết (Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
              className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:border-pink-500 resize-none"
            />
          </div>
        </div>
      </section>

      <OrderSummary
        buttonLabel="Tiếp tục thanh toán"
        onSubmit={() => navigate("/glowup/checkout/payment")}
      />
    </div>
  );
}
