import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Mail, MapPin, Phone, Truck, User } from "lucide-react";
import OrderSummary from "../../../components/user/checkout/OrderSummary";
import { useCart } from "../../../context/CartContext";
import { getShippingFeeByMethod } from "../../../services/checkout";
import type { ShippingMethod } from "../../../type/checkout";

export default function ShippingPage() {
  const navigate = useNavigate();
  const { items } = useCart();
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("standard");

  useEffect(() => {
    if (items.length === 0) {
      navigate("/glowup/cart", { replace: true });
    }
  }, [items.length, navigate]);

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-10 items-start">
      <section className="bg-ui-surface p-6 shadow-[0_14px_30px_rgba(15,23,42,0.08)] md:p-8">
        <div className="flex items-center gap-2 mb-7">
          <Truck size={20} className="text-pink-600" />
          <h2 className="text-2xl font-bold text-slate-900">
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
                className="bg-ui-surface-muted h-11 w-full pl-11 pr-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-pink-200"
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
                className="bg-ui-surface-muted h-11 w-full pl-11 pr-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-pink-200"
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
              className="bg-ui-surface-muted h-11 w-full pl-11 pr-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-pink-200"
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
              className="bg-ui-surface-soft w-full resize-none py-4 pl-11 pr-4 text-base text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-slate-900 mb-3">
            Phương thức giao hàng
          </h3>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShippingMethod("standard")}
              className={`w-full px-4 py-3.5 text-left shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition-colors ${
                shippingMethod === "standard"
                  ? "bg-pink-100"
                  : "bg-ui-surface-muted hover:bg-rose-50"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center ${
                      shippingMethod === "standard"
                        ? "bg-pink-600"
                        : "bg-rose-200"
                    }`}
                  >
                    {shippingMethod === "standard" && (
                      <span className="h-2.5 w-2.5 bg-white" />
                    )}
                  </span>

                  <div>
                    <p className="text-base font-semibold text-slate-900 leading-6">
                      Giao hàng tiêu chuẩn
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Dự kiến giao trong 2-3 ngày
                    </p>
                  </div>
                </div>

                <p className="text-lg font-semibold text-slate-900 whitespace-nowrap">
                  30.000 đ
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setShippingMethod("express")}
              className={`w-full px-4 py-3.5 text-left shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition-colors ${
                shippingMethod === "express"
                  ? "bg-pink-100"
                  : "bg-ui-surface-muted hover:bg-rose-50"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center ${
                      shippingMethod === "express"
                        ? "bg-pink-600"
                        : "bg-rose-200"
                    }`}
                  >
                    {shippingMethod === "express" && (
                      <span className="h-2.5 w-2.5 bg-white" />
                    )}
                  </span>

                  <div>
                    <p className="text-base font-semibold text-slate-900 leading-6">
                      Giao hàng nhanh
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Dự kiến giao trong 24h
                    </p>
                  </div>
                </div>

                <p className="text-lg font-semibold text-slate-900 whitespace-nowrap">
                  50.000 đ
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      <OrderSummary
        buttonLabel="Tiếp tục thanh toán"
        shippingFee={getShippingFeeByMethod(shippingMethod)}
        onSubmit={() =>
          navigate("/glowup/checkout/payment", {
            state: { shippingMethod },
          })
        }
      />
    </div>
  );
}
