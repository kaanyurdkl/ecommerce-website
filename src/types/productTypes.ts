interface Product {
  productId: number;
  productImg: string;
  productTitle: string;
  productType: string;
  productPrice: number;
  productGender: string;
}

interface FavoriteProduct {
  productId: number;
}

export type { Product, FavoriteProduct };
