import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import '../styles/products.css';

export function Products() {

  

const { products, loading } = useProducts();

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
        </main>
    )
}
