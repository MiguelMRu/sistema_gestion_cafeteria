import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, deleteProduct } from '../services/productService'
import { Header } from '../components/Header'
import { DeleteProduct } from '../components/DeleteProduct'
import '../styles/detail_product.css'

export default function DetailProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const deleteProductRef = useRef(null)
  
  
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
  const availableClass = product.available ? 'available' : 'not-available'

  const handleDelete = (id) => async () => {
        try {
            await deleteProduct(id);
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

  const openDeleteModal = () => {
        deleteProductRef.current.showModal();
    }

    const closeDeleteModal = () => {
        deleteProductRef.current.close();
    }

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
            <p className={`product-detail-availability ${availableClass}`}>{available}</p>
            <h3>Ingredientes:</h3>
              <ul className='product-detail-ingredients'>
              {product.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <Link to="/">Volver a la lista de productos</Link>
          <button className='delete-button' onClick={openDeleteModal}>Eliminar producto</button>

          <DeleteProduct
            deleteProductRef={deleteProductRef}
            handleDelete={handleDelete}
            closeDeleteModal={closeDeleteModal}
            product={product}
          />
        </article>
      )}
      
    </main>
    </>
    )
  }