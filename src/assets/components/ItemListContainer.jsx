 // src/assets/components/ItemListContainer.jsx
    import React, { useState, useEffect } from 'react';
    import { Link, useParams } from 'react-router-dom';
    import { collection, getDocs, query, where } from 'firebase/firestore';
    import { db } from '../firebase/firebaseConfig'; 
    import ItemList from './ItemList.jsx'; 

    const ItemListContainer = () => {
  const { categoryId } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsCollection = collection(db, "products");
        let q; 

        if (categoryId) {
          q = query(productsCollection, where("category", "==", categoryId));
        } else {
          q = productsCollection;
        }

        const querySnapshot = await getDocs(q); 

        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(productsData);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError("Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]); 

  if (loading) return <p className="loading-message">Cargando productos...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (products.length === 0 && !loading) {
    
    return (
      <p className="not-found-message">
        No hay productos disponibles {categoryId ? `en la categoría "${categoryId}"` : 'en este momento'}.
      </p>
    );
  }

  return (
    <div className="item-list-container">
      {}
      <h2 className="section-title">
        {categoryId ? `Productos de ${categoryId}` : 'Todos nuestros productos'}
      </h2>
      <ItemList items={products} />
    </div>
  );
};

export default ItemListContainer;