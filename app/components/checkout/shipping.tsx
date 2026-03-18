import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Mail, MapPin, Phone, Truck, User } from "lucide-react";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import { getShippingFeeByMethod } from "../../services/checkout";
import type { ShippingMethod } from "../../type/checkout";

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
      <section className="bg-white border border-rose-100 p-6 shadow-(--ui-shadow-card) md:p-8">
        <div className="flex items-center gap-2 mb-7">
          <Truck size={20} className="text-pink-600" />
          <h2 className="text-2xl font-bold text-slate-800">
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Nhập họ và tên"
                className="h-10 w-full border border-rose-100 bg-white pl-10 pr-3 text-sm text-slate-600 placeholder:text-slate-500 outline-none transition-colors duration-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/40"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Nhập số điện thoại"
                className="h-10 w-full border border-rose-100 bg-white pl-10 pr-3 text-sm text-slate-600 placeholder:text-slate-500 outline-none transition-colors duration-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/40"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Nhập email để nhận thông báo đơn hàng"
              className="h-10 w-full border border-rose-100 bg-white pl-10 pr-3 text-sm text-slate-600 placeholder:text-slate-500 outline-none transition-colors duration-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/40"
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
              className="absolute left-3 top-4 text-slate-400"
            />
            <textarea
              rows={4}
              placeholder="Nhập địa chỉ chi tiết (Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
              className="w-full border border-rose-100 bg-white resize-none py-3 pl-10 pr-3 text-sm text-slate-600 placeholder:text-slate-500 outline-none transition-colors duration-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/40"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3">
            Phương thức giao hàng
          </h3>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShippingMethod("standard")}
              className={`w-full border px-4 py-3 text-left transition-all duration-300 ${
                shippingMethod === "standard"
                  ? "border-pink-600 bg-pink-50"
                  : "border-rose-100 bg-white hover:border-pink-200"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center border ${
                      shippingMethod === "standard"
                        ? "border-pink-600 bg-pink-600"
                        : "border-slate-300 bg-white"
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
              className={`w-full border px-4 py-3 text-left transition-all duration-300 ${
                shippingMethod === "express"
                  ? "border-pink-600 bg-pink-50"
                  : "border-rose-100 bg-white hover:border-pink-200"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center border ${
                      shippingMethod === "express"
                        ? "border-pink-600 bg-pink-600"
                        : "border-slate-300 bg-white"
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
