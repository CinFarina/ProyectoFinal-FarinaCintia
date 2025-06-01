// src/assets/context/Carrito.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (itemToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(prod => prod.id === itemToAdd.id);
      if (existingItem) {
        return prevCart.map(prod =>
          prod.id === itemToAdd.id ? { ...prod, quantity: prod.quantity + itemToAdd.quantity } : prod
        );
      } else {
        return [...prevCart, itemToAdd];
      }
    });
  };

  const removeItem = (itemId) => {
    setCart(prevCart => prevCart.filter(prod => prod.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some(prod => prod.id === itemId);
  };

  const totalItems = () => cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = () => cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, isInCart, totalItems, totalPrice }}> {/* <-- ¡AÑADE totalItems AQUÍ! */}
      {children}
    </CartContext.Provider>
  );
};