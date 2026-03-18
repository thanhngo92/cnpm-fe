import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import OrderNote from "./OrderNote";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-linear-to-b from-rose-100/55 via-rose-50/40 to-pink-100/35">
      {/* Soft radial glow effects */}
      <div className="absolute -top-40 right-0 h-80 w-80 bg-rose-200/35 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-72 w-72 bg-pink-200/25 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 h-96 w-96 bg-rose-50/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-10 font-serif">
          Giỏ hàng của bạn
        </h1>
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={removeItem}
              />
            ))}
            {/* Order note */}
            <OrderNote />
          </div>
          {/* Summary */}
          <CartSummary items={items} />
        </div>
      </div>
    </div>
  );
}
