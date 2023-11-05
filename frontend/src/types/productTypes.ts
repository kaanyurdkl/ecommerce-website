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

interface CartItem extends Product {
  quantity: number;
}

interface Cart {
  cartItems: CartItem[];
  shippingAddress: object;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export type { Product, FavoriteProduct, Cart, CartItem };
