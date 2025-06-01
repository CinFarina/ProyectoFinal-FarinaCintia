// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './assets/components/NavBar';
import ItemListContainer from './assets/components/ItemListContainer'; 
import ItemDetailContainer from './assets/components/ItemDetailContainer'; 
import Cart from './assets/components/Cart';
import Checkout from './assets/components/Checkout';
import NotFound from './assets/components/NotFound';
import { CartProvider } from './assets/context/Carrito';
import { ToastProvider } from './assets/context/ToastContext'; // Correcto

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* ¡AQUÍ ES DONDE DEBE ESTAR TOASTPROVIDER ENVOLVIENDO TODO! */}
      <ToastProvider> 
        <CartProvider> 
          <NavBar />
          <main style={{ flexGrow: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/product/:productId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </CartProvider>
      </ToastProvider> {/* ¡Y AQUÍ SE CIERRA! */}
    </div>
  );
}

export default App;