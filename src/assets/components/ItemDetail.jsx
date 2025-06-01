// src/assets/components/ItemDetail.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';

const ItemDetail = ({ product, quantityAdded, handleOnAdd }) => {
  const getImageUrl = (imageFileName) => {
    return `/img/${imageFileName}`;
  };

  if (!product) {
    return <p>Cargando detalles del producto...</p>; 
  }

  return (
    <div className="item-detail-container">
      <div className="detail-image-wrapper">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="detail-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x400?text=Error+Loading+Image';
          }}
        />
      </div>
      <div className="detail-info">
        <h2 className="detail-title">{product.name}</h2>
        <p className="detail-description">{product.description || 'Descripción no disponible.'}</p>
        <p className="detail-price">Precio: ${product.price}</p>
        <p className="detail-stock">Stock: {product.stock}</p>

        <div className="detail-actions">
          {quantityAdded > 0 ? (
            <>
              <Link to="/cart" className="btn btn-success">Terminar Compra</Link>
              <Link to="/" className="btn btn-primary">Seguir Comprando</Link>
            </>
          ) : (
            product.stock > 0 ? (
              <ItemCount stock={product.stock} initial={1} onAdd={handleOnAdd} />
            ) : (
              <p className="no-stock-message">Sin stock disponible</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;