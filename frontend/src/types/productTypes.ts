interface Product {
  _id: number;
  name: string;
  image: string;
  description: string;
  type: string;
  price: number;
  category: string;
}

interface FavoriteProduct {
  _id: number;
}

export type { Product, FavoriteProduct };
