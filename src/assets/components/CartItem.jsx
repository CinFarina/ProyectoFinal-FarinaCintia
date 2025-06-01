// src/assets/components/CartItem.jsx
import React from 'react';

const CartItem = ({ item, onRemove }) => {
  return (
    <li className="cart-item">
      <div className="cart-item-details">
        <img src={`/img/${item.image}`} alt={item.name} className="cart-item-image" />
        <div className="cart-item-info">
          <h4>{item.name}</h4>
          <p>Categoría: {item.category}</p>
        </div>
      </div>
      <span className="cart-item-quantity">Cantidad: {item.quantity}</span>
      <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
      <button onClick={() => onRemove(item.id)} className="btn btn-danger">
        Eliminar
      </button>
    </li>
  );
};

export default CartItem;