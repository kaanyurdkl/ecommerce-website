interface Product {
  _id: string;
  user: string;
  name: string;
  image: string;
  category: string;
  type: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface FavoriteProduct {
  _id: string;
}

export type { Product, FavoriteProduct };
