import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import './Cart.css';

interface OrderSummary {
  totalItems: number;
  totalPrice: number;
}

function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const [confirmedOrder, setConfirmedOrder] = useState<OrderSummary | null>(
    null,
  );

  // Simulado: en la Parte 2 se envía el pedido a POST /api/orders
  const handleCheckout = () => {
    setConfirmedOrder({ totalItems, totalPrice });
    clearCart();
  };

  if (confirmedOrder) {
    return (
      <section className="cart">
        <h1>Carrito</h1>
        <div className="cart__confirmation" role="status">
          <p>
            ¡Pedido confirmado! (simulado) Productos:{' '}
            {confirmedOrder.totalItems}. Total:{' '}
            {formatPrice(confirmedOrder.totalPrice)}. En la Parte 2 se envía a
            la API.
          </p>
          <Link to="/products">Seguir comprando</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="cart">
        <h1>Carrito</h1>
        <p>Tu carrito está vacío</p>
        <Link to="/products">Ver productos</Link>
      </section>
    );
  }

  return (
    <section className="cart">
      <h1>Carrito</h1>
      <ul className="cart__list">
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onChangeQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </ul>
      <div className="cart__summary">
        <p>Productos: {totalItems}</p>
        <p className="cart__total">Total: {formatPrice(totalPrice)}</p>
        <div className="cart__actions">
          <button type="button" className="cart__clear" onClick={clearCart}>
            Vaciar carrito
          </button>
          <button
            type="button"
            className="cart__checkout"
            onClick={handleCheckout}
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
