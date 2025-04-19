import React, { createContext, useContext, useState } from 'react';
import products from '../data/Products.jsx';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const c = localStorage.getItem('cart');
    return c ? JSON.parse(c) : {};
  });
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = product => {
    setCart(prev => {
      const updated = { ...prev, [product.id]: (prev[product.id] || 0) + 1 };
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = id => {
    setCart(prev => {
      const updated = { ...prev };
      delete updated[id];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart({});
    localStorage.setItem('cart', '{}');
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const totalPrice = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = products.find(p => p.id === id);
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  const getRecommendations = (query) => {
    if (!query) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q)
    );
  };

  const filteredProducts = () => {
    if (!searchQuery) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice,
        getRecommendations,
        filteredProducts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}