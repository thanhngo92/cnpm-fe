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
    description: "Tong hop son, cushion, nen va bang mau dang ban chay",
    imageUrl:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
    link: "/glowup/products",
  },
  {
    id: "cat-skincare",
    name: "Dưỡng da",
    description: "Duong am, phuc hoi, chong lao hoa cho da khoe moi ngay",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    link: "/glowup/products",
  },
  {
    id: "cat-body",
    name: "Chăm sóc cơ thể",
    description: "Tam, duong, tay te bao chet cho lan da mem min va deu mau",
    imageUrl:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80",
    link: "/glowup/products",
  },
];