// src/assets/components/Item.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  const imageUrl = product.image ? `/img/${product.image}` : 'https://placehold.co/150x150/E0E0E0/333333?text=Sin+Imagen';

  return (
    <div className="product-item">
      <img
        src={imageUrl}
        alt={product.name}
        className="product-item-image"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/333333?text=Error+Imagen'; }}
      /> {}
      <h3>{product.name}</h3> {}
      <p>Precio: ${product.price}</p>
      <p className="stock-info">Stock: {product.stock}</p>
      <Link to={`/product/${product.id}`} className="btn btn-primary">
        Ver Detalle
      </Link>
    </div>
  );
};

export default Item;