import {getProducts, deleteProduct} from '../services/productService.js';
import {useEffect, useState} from 'react';

export function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

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

    return (
        <section className="products-section">
            {loading ? (
                <p>Loading products...</p>
            ) : (
                products.map(product => (
                    <div key={product.id} className="product-card">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={async () => {
                            try {
                                await deleteProduct(product.id);
                                setProducts(products.filter(p => p.id !== product.id));
                            } catch (error) {
                                console.error('Error deleting product:', error);
                            }
                        }}>
                            Delete
                        </button>
                    </div>
                ))
        </section>
    )
}
