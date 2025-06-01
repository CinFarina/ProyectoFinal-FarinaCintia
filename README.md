# 📚 Librería Scorpio

Este es un proyecto de Single Page Application (SPA) de e-commerce desarrollado con **React** para el curso de React. Permite a los usuarios explorar un catálogo de productos, gestionar un carrito de compras y finalizar pedidos. Los productos y las órdenes se almacenan y gestionan en **Firebase Firestore**.

## ✨ Funcionalidades Destacadas

* **Catálogo y Detalle de Productos:** Visualización dinámica de productos con vistas detalladas y selector de cantidad (`ItemCount`) con validación de stock.
* **Carrito de Compras:** Gestión completa del carrito (agregar, quitar, vaciar) usando React Context, con resumen de ítems y total.
* **Checkout y Órdenes:** Proceso de finalización de compra con formulario de datos de usuario. Al confirmar, se genera una orden en Firestore y **se actualiza el stock de los productos de forma atómica**.
* **Notificaciones:** Uso de "Toast messages" para feedback de usuario (ej. "Producto agregado", errores de stock).
* **Navegación:** SPA con `React Router DOM` para transiciones fluidas entre secciones (catálogo, categorías, detalle, carrito, checkout).

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React, React Router DOM, Vite, HTML/CSS.
* **Backend/DB:** Firebase Firestore.


## 👨‍💻 Autor

* Cintia Farina
* https://github.com/CinFarina

## 👨‍💻 Dominio:
*https://libreriascorpio.netlify.app/