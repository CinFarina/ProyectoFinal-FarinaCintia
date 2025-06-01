// src/assets/components/Cart.jsx
import React from 'react';
import { useCart } from '../context/Carrito';
import { Link } from 'react-router-dom';
import CartItem from './CartItem'; 

const Cart = () => {
  const { cart, removeItem, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">Tu Carrito</h2>
        <p className="cart-empty-message">No hay productos en el carrito.</p>
        <Link to="/" className="btn btn-primary">Ver Productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu Carrito</h2>
      <ul className="cart-items-list">
        {cart.map(item => (
          <CartItem key={item.id} item={item} onRemove={removeItem} />
        ))} {}
      </ul>
      <div className="cart-total">
        <p>Total de ítems: {totalItems()}</p>
        <p>Total a pagar: ${totalPrice().toFixed(2)}</p>
      </div>
      <div className="cart-actions">
        <button onClick={clearCart} className="btn btn-danger">
          Vaciar Carrito
        </button>
        <Link to="/checkout" className="btn btn-success">
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
};

export default Cart;