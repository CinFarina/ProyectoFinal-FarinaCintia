// src/assets/components/CartWidget.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/Carrito'; 

const CartWidget = () => {
  const { totalItems } = useCart(); 

  if (totalItems() === 0) {
    return null;
  }

  return (
    <Link to="/cart" className="cart-widget">
      <span className="cart-widget-icon" role="img" aria-label="Carrito de compras">🛒</span> {}
      <span className="cart-widget-count">{totalItems()}</span>
    </Link>
  );
};

export default CartWidget;