import styles from '../styles/detail_product.module.css'

export function ProductDetail({ product }) {
    const available = product.available ? 'Disponible' : 'No disponible'
    const availableClass = product.available ? 'available' : 'not-available'

    return (
        <div className={styles['product-detail-info']}>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles['product-detail-category']}>{product.category}</p>
            <p>{product.description}</p>
            <p className={styles['product-detail-price']}>Precio: {product.price}€</p>
            <p className={`${styles['product-detail-availability']} ${styles[availableClass]}`}>{available}</p>
            <h3>Ingredientes:</h3>
            <ul className={styles['product-detail-ingredients']}>
                {product.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    )
}