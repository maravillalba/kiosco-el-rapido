import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header>
      <Link to="/">Kiosko El Rápido</Link>
      <nav>
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/products">Productos</NavLink>
        <NavLink to="/cart">Carrito ({totalItems})</NavLink>
      </nav>
    </header>
  );
}
