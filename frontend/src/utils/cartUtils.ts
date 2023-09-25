const addDecimals = (num) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (cart) => {
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  cart.itemsPrice = addDecimals(itemsPrice);

  const shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.shippingPrice = addDecimals(shippingPrice);

  const taxPrice = 0.15 * cart.itemsPrice;
  cart.taxPrice = addDecimals(taxPrice);

  const totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  cart.totalPrice = addDecimals(totalPrice);

  localStorage.setItem("cart", JSON.stringify(cart));
};
