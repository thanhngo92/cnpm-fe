export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Son lì cao cấp",
    price: 320000,
    quantity: 1,
    image: "💄",
  },
  {
    id: 2,
    name: "Serum dưỡng da",
    price: 540000,
    quantity: 2,
    image: "✨",
  },
    {
    id: 3,
    name: "Son lì cao cấp 22",
    price: 320000,
    quantity: 1,
    image: "💄",
  },
  //   {
  //   id: 4,
  //   name: "Son lì cao cấp 3212",
  //   price: 320000,
  //   quantity: 1,
  //   image: "💄",
  // },
  //   {
  //   id: 5,
  //   name: "Son lì cao cấp 321",
  //   price: 320000,
  //   quantity: 1,
  //   image: "💄",
  // },
];