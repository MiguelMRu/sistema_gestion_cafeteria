import { Link } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore.js';
import '../styles/products.css';

export function Products() {
//Cargar estados del store
const products = useProductStore((state) => state.products)
const loading = useProductStore((state) => state.loading)
const error = useProductStore((state) => state.error)


    return (
        <main className="products-section">
            {loading ? 
                <p>Loading products...</p>
             : products.map(product => (
                    <article key={product.id} className="product-card">

                        <Link to={`/producto/${product.id}`}>
                            <img src={product.image} alt={product.name} />
                            <div className="product-info">
                                <h2>{product.name}</h2>
                                <p className='product-category'>{product.category}</p>
                                <p>Precio: {product.price}€</p>
                            </div>                            
                        </Link>
                    </article>
                ))}
                {error && <p>{error}</p>}
        </main>
    )
}
