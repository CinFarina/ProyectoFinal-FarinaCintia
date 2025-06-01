// src/assets/components/ItemDetailContainer.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ItemDetail from './ItemDetail';
import { useCart } from '../context/Carrito';

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantityAdded, setQuantityAdded] = useState(0);

  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        setError('ID de producto no proporcionado.');
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
          setProduct(null);
          setError('Producto no encontrado.');
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setError('Error al cargar el producto. Intenta recargar la página.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    addItem({ ...product, quantity: quantity });
    alert(`Se agregaron ${quantity} unidades de ${product.name} al carrito.`);
  };

  if (loading) return <p className="loading-message">Cargando detalle del producto...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return <p className="not-found-message">Producto no encontrado.</p>;

  // AQUI ES DONDE SE USA ItemDetail, Y DONDE SE PRODUJO EL ERROR SI NO ESTABA IMPORTADO
  return (
    <ItemDetail
      product={product}
      quantityAdded={quantityAdded}
      handleOnAdd={handleOnAdd}
    />
  );
};

export default ItemDetailContainer;