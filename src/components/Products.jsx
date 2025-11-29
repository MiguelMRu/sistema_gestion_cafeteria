import { Link } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore.js';
import styles from '../styles/products.module.css';

export function Products() {
    //Cargar estados del store
    const products = useProductStore((state) => state.products)
    const loading = useProductStore((state) => state.loading)
    const error = useProductStore((state) => state.error)


    return (
        <main className={styles['products-section']}>
            {loading ?
                <p>Loading products...</p>
                : products.map(product => (
                    <article key={product.id} className={styles['product-card']}>

                        <Link to={`/producto/${product.id}`}>
                            <img className={styles.image} src={product.image} alt={product.name} />
                            <div className={styles['product-info']}>
                                <h2 className={styles.title}>{product.name}</h2>
                                <p className={styles['product-category']}>{product.category}</p>
                                <p>Precio: {product.price}€</p>
                            </div>
                        </Link>
                    </article>
                ))}
            {error && <p>{error}</p>}
        </main>
    )
}
