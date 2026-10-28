import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import type { Category } from '../types';
import { CATEGORY_LABELS } from '../utils/format';
import './Products.css';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const selected = CATEGORIES.find((c) => c === categoryParam) ?? null;

  const visibleProducts = selected
    ? products.filter((product) => product.category === selected)
    : products;

  const handleFilter = (category: Category | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <section>
      <h1>Productos</h1>

      <div className="products__filters">
        <button
          type="button"
          aria-pressed={selected === null}
          onClick={() => handleFilter(null)}
        >
          Todos
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selected === category}
            onClick={() => handleFilter(category)}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <div className="products__grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
