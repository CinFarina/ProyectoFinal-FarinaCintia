// src/assets/components/ItemCount.jsx
import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);
  const { showToast } = useToast(); 

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(count); 
    showToast('✅ Producto agregado al carrito'); 
  };

  return (
    <div className="item-count-container">
      <button className="item-count-button" onClick={decrement} disabled={count <= 1}>
        -
      </button>
      <span className="item-count-display">{count}</span>
      <button className="item-count-button" onClick={increment} disabled={count >= stock}>
        +
      </button>
      <button
        className="btn btn-primary add-to-cart-button"
        onClick={handleAddToCart} 
        disabled={stock === 0}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ItemCount;