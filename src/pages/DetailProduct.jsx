import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById } from '../services/productService'
import { Header } from '../components/Header'

export default function DetailProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id)
      setProduct(data)

    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div>Cargando...</div>
  }

  const available = product.available ? 'Disponible' : 'No disponible'

  return (
    <>
    <Header page='Detalle del producto' />

    <main className='detail-product'>
      {product && (
        <article key={product.id} className='product-detail-card'>
          <img src={product.image} alt={product.name} />
          <div className='product-detail-info'>
            <h2>{product.name}</h2>
            <p className='product-detail-category'>{product.category}</p>
            <p>{product.description}</p>
            <p className='product-detail-price'>Precio: {product.price}€</p>
            <p className='product-detail-availability'>{available}</p>
              
              <ul className='product-detail-ingredients'>
              {product.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </article>
      )}
      <Link to="/">Volver a la lista de productos</Link>
    </main>
    </>
    )
  }