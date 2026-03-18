import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../../data/cart";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number | string, delta: number) => void;
  onRemove: (id: number | string) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const isImageUrl =
    item.image.startsWith("http") || item.image.startsWith("/");

  return (
    <div className="flex items-center gap-4 bg-white border border-slate-200/80 p-4 shadow-(--ui-shadow-soft) transition-all duration-300 hover:shadow-(--ui-shadow-card)">
      {/* Image */}
      <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-slate-200 bg-slate-50">
        {isImageUrl ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          item.image
        )}
      </div>
      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{item.name}</h3>
        <p className="text-sm text-slate-600">
          {item.price.toLocaleString()} đ
        </p>
      </div>
      {/* Quantity */}
      <div className="flex items-center border border-slate-200/80">
        <button
          className="px-3 py-2 transition-colors hover:bg-slate-100"
          onClick={() => onQuantityChange(item.id, -1)}
        >
          <Minus size={16} />
        </button>
        <span className="px-4 text-sm font-medium text-slate-900">
          {item.quantity}
        </span>
        <button
          className="px-3 py-2 transition-colors hover:bg-slate-100"
          onClick={() => onQuantityChange(item.id, 1)}
        >
          <Plus size={16} />
        </button>
      </div>
      {/* Remove */}
      <button
        className="ml-2 text-slate-400 transition-colors hover:text-red-600"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
