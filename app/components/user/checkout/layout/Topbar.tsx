import { Link, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function Topbar() {
  const { pathname } = useLocation();

  let step = 1;

  if (pathname.includes("/payment") || pathname.includes("/qr-payment")) {
    step = 2;
  }

  if (pathname.includes("/complete")) {
    step = 3;
  }

  const backLink =
    step === 1
      ? { to: "/glowup/cart", label: "Quay lại giỏ hàng" }
      : step === 2
        ? { to: "/glowup/checkout", label: "Quay lại giao hàng" }
        : null;

  const steps = [
    { id: 1, label: "Giao hàng" },
    { id: 2, label: "Thanh toán" },
    { id: 3, label: "Hoàn tất" },
  ];

  return (
    <div className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-8">
        {backLink && (
          <Link
            to={backLink.to}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-pink-600 mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            {backLink.label}
          </Link>
        )}

        <h1 className="text-3xl font-bold text-slate-900 mb-8">Thanh toán</h1>

        <div className="flex items-center justify-center">
          {steps.map((item, index) => {
            const active = step >= item.id;
            const current = step === item.id;

            return (
              <div key={item.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-30">
                  <div
                    className={`flex h-9 w-9 items-center justify-center text-sm font-semibold transition-colors ${
                      active
                        ? "bg-pink-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {item.id}
                  </div>

                  <span
                    className={`mt-3 text-sm ${
                      current ? "text-pink-600 font-semibold" : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`w-20 md:w-28 h-0.5 mx-3 md:mx-4 -translate-y-4 ${
                      step > item.id ? "bg-pink-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
