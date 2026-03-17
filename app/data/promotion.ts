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

export type PromotionDeal = {
  productId: string;
  discountPercent: number;
};

export const promotionVouchers: PromotionVoucher[] = [
  {
    id: "voucher-50k",
    title: "Giảm 50K",
    description: "Cho đơn hàng từ 500K",
    expiresAt: "30/03/2026",
    color: "emerald",
    icon: "ticket",
  },
  {
    id: "voucher-freeship",
    title: "Freeship",
    description: "Miễn phí giao hàng tối đa 30K",
    expiresAt: "15/03/2026",
    color: "blue",
    icon: "truck",
  },
  {
    id: "voucher-10-percent",
    title: "Giảm 10%",
    description: "Giảm tối đa 100K",
    expiresAt: "10/04/2026",
    color: "pink",
    icon: "gift",
  },
];

export const promotionDeals: PromotionDeal[] = [
  {
    productId: "prd-rose-water-toner",
    discountPercent: 20,
  },
  {
    productId: "prd-cica-cleanser",
    discountPercent: 15,
  },
  {
    productId: "prd-skin-tint",
    discountPercent: 18,
  },
  {
    productId: "prd-body-cream",
    discountPercent: 12,
  },
];