import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="text-6xl mb-6">🛒</div>

      <h2 className="text-2xl font-semibold mb-3">
        Giỏ hàng của bạn đang trống
      </h2>

      <p className="text-slate-500 mb-6">
        Hãy khám phá các sản phẩm làm đẹp tuyệt vời của chúng tôi nhé!
      </p>

      <Link
        to="/glowup/products"
        className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
      >
        Tiếp tục mua sắm
        <ArrowRightIcon className="w-4 h-4 mt-1" />
      </Link>
    </div>
  );
}
