import React, { useState } from 'react';
import { useCart } from '../context/Carrito';
import { collection, addDoc, Timestamp, writeBatch, doc, getDoc } from 'firebase/firestore'; // Importar writeBatch, doc, getDoc
import { db } from '../firebase/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext'; // Asumiendo que quieres usar showToast para errores también

const Checkout = () => {
  const { cart, totalPrice, clearCart, totalItems } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    confirmEmail: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { showToast } = useToast(); // Hook para mostrar notificaciones

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.phone) newErrors.phone = 'El teléfono es obligatorio.';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido.';
    }
    if (!formData.confirmEmail) {
      newErrors.confirmEmail = 'La confirmación del email es obligatoria.';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Los emails no coinciden.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Formulario inválido. Errores:", errors);
      showToast('Por favor, completa todos los campos correctamente.', 'error'); // Mostrar toast de error
      return;
    }

    if (cart.length === 0) {
      console.warn("El carrito está vacío, no se puede crear la orden.");
      showToast('Tu carrito está vacío. Agrega productos para comprar.', 'warning');
      navigate('/'); // Redirigir si el carrito está vacío
      return;
    }

    setLoading(true);
    console.log("1. Iniciando proceso de compra y actualización de stock...");

    try {
      const batch = writeBatch(db); // Iniciar un batch para la transacción

      const outOfStock = []; // Array para productos sin stock suficiente

      // 2. Preparar las operaciones de lectura y actualización de stock
      const productsRef = collection(db, 'products');

      for (const item of cart) {
        const docRef = doc(productsRef, item.id);
        const docSnap = await getDoc(docRef); // Leer el documento dentro de la transacción

        if (docSnap.exists()) {
          const productData = docSnap.data();
          const currentStock = productData.stock;

          if (currentStock >= item.quantity) {
            // Actualizar stock en el batch
            batch.update(docRef, { stock: currentStock - item.quantity });
          } else {
            // Producto sin stock suficiente
            outOfStock.push(item.name);
          }
        } else {
          // El producto ya no existe en la base de datos
          outOfStock.push(item.name + " (no encontrado)");
        }
      }

      if (outOfStock.length > 0) {
        // Si hay productos sin stock, abortar la transacción y notificar
        setLoading(false);
        const errorMessage = `No hay suficiente stock para: ${outOfStock.join(', ')}. Por favor, ajusta tu carrito.`;
        console.error(errorMessage);
        showToast(errorMessage, 'error', 7000); // Mostrar toast de error con duración más larga
        // Opcional: podrías navegar a la página del carrito para que el usuario ajuste las cantidades
        // navigate('/cart');
        return; // Salir de la función sin crear la orden
      }

      // 3. Crear la orden si todo el stock es suficiente
      const order = {
        buyer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: totalPrice(),
        date: Timestamp.fromDate(new Date())
      };
      console.log("3. Objeto de orden a enviar:", order);

      const orderDocRef = doc(collection(db, "orders")); // Crear una referencia de documento para la orden
      batch.set(orderDocRef, order); // Añadir la orden al batch con .set()

      // 4. Ejecutar el batch (la transacción)
      await batch.commit(); // Ejecuta todas las operaciones de forma atómica

      setOrderId(orderDocRef.id); // Usar el ID generado para la orden
      clearCart();
      console.log("4. Orden creada y stock actualizado exitosamente con ID:", orderDocRef.id);
      showToast('¡Compra finalizada con éxito!', 'success');

    } catch (error) {
      console.error("5. Error al procesar la compra (en el catch):", error);
      // Firebase errors pueden tener un 'code' específico
      if (error.code === 'aborted') {
          showToast('La transacción fue abortada. Intenta de nuevo.', 'error');
      } else {
          showToast("Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.", 'error');
      }
    } finally {
      setLoading(false);
      console.log("6. Proceso de orden y stock finalizado. Loading:", false);
    }
  };

  if (loading) return <p className="loading-message">Procesando tu compra...</p>;

  if (orderId) {
    return (
      <div className="checkout-container">
        <h2 className="checkout-title">¡Compra Finalizada con Éxito!</h2>
        <p className="order-id-message">Tu número de orden es: <strong>{orderId}</strong></p>
        <div className="cart-actions">
          <Link to="/" className="btn btn-primary">Volver a Inicio</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !orderId) {
    return (
      <div className="checkout-container">
        <h2 className="checkout-title">Proceso de Compra</h2>
        <p className="cart-empty-message">Tu carrito está vacío. Agrega productos antes de finalizar la compra.</p>
        <Link to="/" className="btn btn-primary">Ver Productos</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar Compra</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmEmail">Confirmar Email:</label>
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
            required
          />
          {errors.confirmEmail && <p className="form-error">{errors.confirmEmail}</p>}
        </div>
        <div className="checkout-summary">
          <p>Cantidad de ítems: {totalItems()}</p>
          <p className="total">Total: ${totalPrice().toFixed(2)}</p>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Generando Orden...' : 'Confirmar Compra'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;