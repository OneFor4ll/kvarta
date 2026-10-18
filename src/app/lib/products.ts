
export type Product = {
  id: string;
  name: string;
  tastingNotes: string;
  description: string;
  price: number;
  image: string;
  label?: string;
};

export const products: Product[] = [
  {
    id: "ethiopia",
    name: "Эфиопия Иргачеффе",
    tastingNotes: "Цветочный · Бергамот",
    description: "Светлая обжарка, чтобы раскрыть тонкий аромат.",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=500&q=65",
    label: "Светлая обжарка",
  },
  {
    id: "colombia",
    name: "Колумбия Уила",
    tastingNotes: "Карамель · Красное яблоко",
    description: "Сбалансированный вкус для спокойного утра.",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=500&q=65",
    label: "На каждый день",
  },
  {
    id: "brazil",
    name: "Бразилия Серрадо",
    tastingNotes: "Орех · Шоколад",
    description: "Плотный и понятный вкус. Особенно хорош в эспрессо.",
    price: 26,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=65",
    label: "Для эспрессо",
  },
  {
    id: "drip",
    name: "Дрип-пакеты",
    tastingNotes: "Ассорти · 10 штук",
    description: "Любимый кофе без кофемашины. Нужна только горячая вода.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=70",
    label: "В дорогу",
  },
];
