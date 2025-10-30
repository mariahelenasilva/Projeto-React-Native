import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Adiciona produto ao carrinho com id único
  function addToCart(produto) {
    setCart((prevCart) => [
      ...prevCart,
      { ...produto, cartItemId: Date.now() + Math.random() }
    ]);
  }

  // Remove apenas o item específico pelo cartItemId
  function removeFromCart(cartItemId) {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  }

  // Limpa todo o carrinho
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar o contexto facilmente
export function useCart() {
  return useContext(CartContext);
}
