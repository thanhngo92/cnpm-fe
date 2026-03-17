export type HomeCategoryHighlight = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
};

export const homeCategoryHighlights: HomeCategoryHighlight[] = [
  {
    id: "cat-makeup",
    name: "Trang điểm",
    description: "Tôn vinh nét đẹp tự nhiên",
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    link: "/glowup/products",
  },
  {
    id: "cat-skincare",
    name: "Dưỡng da",
    description: "Nuôi dưỡng từ sâu bên trong",
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    link: "/glowup/products",
  },
  {
    id: "cat-body",
    name: "Chăm sóc cơ thể",
    description: "Duy trì làn da mềm mịn mỗi ngày",
    imageUrl:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0c?auto=format&fit=crop&w=900&q=80",
    link: "/glowup/products",
  },
];