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

interface CartItem extends Product {
  quantity: number;
}

interface Cart {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export type { Product, FavoriteProduct, Cart, CartItem };
