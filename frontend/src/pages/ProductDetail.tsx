import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { CATEGORY_LABELS, formatPrice } from '../utils/format';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section>
        <h1>Producto no encontrado</h1>
        <p>No existe un producto con el id «{id}».</p>
        <Link to="/products">Volver a productos</Link>
      </section>
    );
  }

  const handleQuantityChange = (value: string) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    setQuantity(Math.min(Math.max(1, Math.trunc(parsed)), product.stock));
  };

  return (
    <section className="product-detail">
      <button
        type="button"
        className="product-detail__back"
        onClick={() => navigate('/products')}
      >
        Volver
      </button>
      <span className="product-detail__category">
        {CATEGORY_LABELS[product.category]}
      </span>
      <h1>{product.name}</h1>
      {product.description && <p>{product.description}</p>}
      <p className="product-detail__price">{formatPrice(product.price)}</p>
      <p>Stock disponible: {product.stock}</p>
      <label className="product-detail__quantity">
        Cantidad
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
        />
      </label>
      <button
        type="button"
        className="product-detail__add"
        onClick={() => addToCart(product, quantity)}
        disabled={product.stock === 0}
      >
        Agregar al carrito
      </button>
    </section>
  );
}

export default ProductDetail;
