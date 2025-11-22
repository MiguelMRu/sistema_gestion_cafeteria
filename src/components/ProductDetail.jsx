export function ProductDetail({ product }) {
    const available = product.available ? 'Disponible' : 'No disponible'
    const availableClass = product.available ? 'available' : 'not-available'

    return (
        <div className='product-detail-info'>
            <h2>{product.name}</h2>
            <p className='product-detail-category'>{product.category}</p>
            <p>{product.description}</p>
            <p className='product-detail-price'>Precio: {product.price}€</p>
            <p className={`product-detail-availability ${availableClass}`}>{available}</p>
            <h3>Ingredientes:</h3>
            <ul className='product-detail-ingredients'>
                {product.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    )
}