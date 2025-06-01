// src/assets/components/ItemList.jsx
import React from 'react';
import Item from './Item.jsx';

const ItemList = ({ items }) => {
  return (
    <div className="product-grid"> {}
      {items.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;