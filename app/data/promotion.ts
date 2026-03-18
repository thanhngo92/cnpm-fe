import type { Product } from "../type/product";

export type VoucherColor = "emerald" | "blue" | "pink";
export type VoucherIcon = "ticket" | "truck" | "gift";

export type PromotionVoucher = {
  id: string;
  title: string;
  description: string;
  expiresAt: string;
  color: VoucherColor;
  icon: VoucherIcon;
};

export type PromotionProduct = Product & {
  discountPercent: number;
};

export const promotionVouchers: PromotionVoucher[] = [
  {
    id: "voucher-skincare-70k",
    title: "Giam 70K",
    description: "Ap dung don tu 699K cho nhom Cham soc da",
    expiresAt: "31/03/2026",
    color: "emerald",
    icon: "ticket",
  },
  {
    id: "voucher-freeship",
    title: "Freeship 35K",
    description: "Mien phi giao hang toi da 35K cho don tu 399K",
    expiresAt: "15/04/2026",
    color: "blue",
    icon: "truck",
  },
  {
    id: "voucher-makeup-12-percent",
    title: "Giam 12%",
    description: "Giam toi da 180K cho san pham Trang diem",
    expiresAt: "20/04/2026",
    color: "pink",
    icon: "gift",
  },
];

export const promotionProducts: PromotionProduct[] = [
  {
    id: "promo-laneige-cream-skin",
    name: "Laneige Cream Skin Refiner 170ml",
    brand: "Laneige",
    description: "Nuoc can bang duong am cao, tao lop nen da mem muot.",
    price: 520000,
    stock: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    categoryId: "cat-skincare",
    createdAt: "2026-03-17T00:00:00.000Z",
    updatedAt: "2026-03-17T00:00:00.000Z",
    discountPercent: 18,
  },
  {
    id: "promo-innisfree-green-tea-serum",
    name: "Innisfree Green Tea Seed Serum 80ml",
    brand: "Innisfree",
    description: "Serum cap am nhanh, ho tro phuc hoi do am cho da met moi.",
    price: 470000,
    stock: 34,
    imageUrl:
      "https://images.unsplash.com/photo-1571781418606-70265b9cce90?auto=format&fit=crop&w=900&q=80",
    categoryId: "cat-skincare",
    createdAt: "2026-03-17T00:00:00.000Z",
    updatedAt: "2026-03-17T00:00:00.000Z",
    discountPercent: 14,
  },
  {
    id: "promo-merzy-liptint",
    name: "Merzy The First Velvet Tint",
    brand: "Merzy",
    description: "Son tint chat velvet mem moi, mau len dam net va ben mau.",
    price: 219000,
    stock: 51,
    imageUrl:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80",
    categoryId: "cat-makeup",
    createdAt: "2026-03-17T00:00:00.000Z",
    updatedAt: "2026-03-17T00:00:00.000Z",
    discountPercent: 22,
  },
  {
    id: "promo-peripera-cushion",
    name: "Peripera Mood Vegan Glow Cushion",
    brand: "Peripera",
    description: "Cushion glow nhe, de tan, cho lop nen trong treo ca ngay.",
    price: 389000,
    stock: 19,
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
    categoryId: "cat-makeup",
    createdAt: "2026-03-17T00:00:00.000Z",
    updatedAt: "2026-03-17T00:00:00.000Z",
    discountPercent: 16,
  },
  {
    id: "promo-neutrogena-body-oil",
    name: "Neutrogena Body Oil Light Sesame",
    brand: "Neutrogena",
    description: "Duong da body bong khoe, ket cau nhe va thoa nhanh tham.",
    price: 295000,
    stock: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    categoryId: "cat-body",
    createdAt: "2026-03-17T00:00:00.000Z",
    updatedAt: "2026-03-17T00:00:00.000Z",
    discountPercent: 12,
  },
];