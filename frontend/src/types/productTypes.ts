interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  price: number;
  category: string;
}

interface FavoriteProduct {
  _id: string;
}

export type { Product, FavoriteProduct };
