import {getProducts, deleteProduct} from '../services/productService.js';
import {useEffect, useState} from 'react';
import '../styles/products.css';

export function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [products]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = (id) => async () => {
        try {
            await deleteProduct(id);
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <section className="products-section">
            {loading ? 
                <p>Loading products...</p>
             : products.map(product => (
                    <article key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p className='product-category'>{product.category}</p>
                            <p>Precio: {product.price}€</p>
                        </div>
                        
                        <button onClick={handleDelete(product.id)}>
                            🗑️ Eliminar
                        </button>
                    </article>
                ))}
        </section>
    )
}
