export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartItems: CartItem[] = [
  {
    id: "prd-cetaphil-cleanser",
    name: "Cetaphil Gentle Skin Cleanser 500ml",
    price: 369000,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1556228578-dd6f3a79f5f0?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prd-loreal-hyaluron-serum",
    name: "L'Oreal Revitalift Hyaluron Serum 30ml",
    price: 379000,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prd-3ce-velvet-lip-tint",
    name: "3CE Velvet Lip Tint",
    price: 329000,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=400&q=80",
  },
];