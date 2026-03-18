import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Landmark, QrCode, Truck, Wallet } from "lucide-react";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import useCheckout from "../../hooks/useCheckout";
import type { PaymentMethod } from "../../type/checkout";

const paymentMethods: {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    id: "ewallet",
    title: "Thanh toán bằng ví điện tử",
    description: "Momo, ZaloPay, ApplePay, VNPay",
    icon: <Wallet size={18} />,
  },
  {
    id: "cod",
    title: "Thanh toán khi nhận hàng",
    description: "Thanh toán bằng tiền mặt khi giao hàng",
    icon: <Truck size={18} />,
  },
  {
    id: "bank",
    title: "Thanh toán bằng thẻ ngân hàng",
    description: "Vietcombank, Agribank, ACB, NamABank,...",
    icon: <Landmark size={18} />,
  },
  {
    id: "qr",
    title: "Thanh toán bằng QR Code",
    description: "Thanh toán nhanh bằng mã QR",
    icon: <QrCode size={18} />,
  },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("ewallet");

  const { shippingMethod, shippingFee } = useCheckout(location.state);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/glowup/cart", { replace: true });
    }
  }, [items.length, navigate]);

  const handleNext = () => {
    switch (method) {
      case "qr":
      case "ewallet":
      case "bank":
        navigate("/glowup/checkout/qr-payment", {
          state: {
            shippingMethod,
            paymentMethod: method,
          },
        });
        break;
      case "cod":
      default:
        navigate("/glowup/checkout/complete", {
          state: {
            shippingMethod,
            paymentMethod: "cod",
          },
        });
        break;
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-10 items-start">
      <section className="bg-white border border-rose-100 p-6 shadow-(--ui-shadow-card) md:p-8">
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <Wallet size={20} className="text-pink-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Phương thức thanh toán
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Thông tin thanh toán của bạn sẽ luôn được bảo mật
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentMethods.map((item) => {
            const active = method === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMethod(item.id)}
                className={`min-h-24 border p-4 text-left transition-all duration-300 ${
                  active
                    ? "border-pink-600 bg-pink-50"
                    : "border-rose-100 bg-white hover:border-pink-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 shrink-0 ${
                      active ? "text-pink-600" : "text-slate-500"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 leading-5">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 leading-5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <OrderSummary
        buttonLabel="Thanh toán"
        shippingFee={shippingFee}
        onSubmit={handleNext}
      />
    </div>
  );
}
