import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../../data/user/cartData";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-white">
      {/* Image */}
      <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-3xl">
        {item.image}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{item.name}</h3>

        <p className="text-sm text-slate-600">
          {item.price.toLocaleString()} đ
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
        <button
          className="px-3 py-2 hover:bg-slate-100"
          onClick={() => onQuantityChange(item.id, -1)}
        >
          <Minus size={16} />
        </button>

        <span className="px-4">{item.quantity}</span>

        <button
          className="px-3 py-2 hover:bg-slate-100"
          onClick={() => onQuantityChange(item.id, 1)}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Remove */}
      <button
        className="text-red-500 hover:text-red-600"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
