import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, deleteProduct } from '../services/productService'
import { Header } from '../components/Header'
import { DeleteProduct } from '../components/DeleteProduct'
import styles from '../styles/detail_product.module.css'
import { UpdateProduct } from '../components/UpdateProduct'
import { ProductDetail } from '../components/ProductDetail'
import { useModal } from '../hooks/useModal'
import { useEditProduct } from '../hooks/useEditProduct'

export default function DetailProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const deleteProductRef = useRef(null)

  const [ingredientInput, setIngredientInput] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id)
      setProduct(data)

    }

    fetchProduct()
  }, [id])

  const { handleDelete, openDeleteModal, closeDeleteModal } = useModal(deleteProductRef)

  const { handleIngredientKeyDown, removeIngredient, handleEdit, editName, isEditing } = useEditProduct({ product, setProduct, ingredientInput, setIngredientInput })



  return (
    <>
      <Header page='Detalle del producto' />

      <main className={styles['detail-product']}>
        {product && (
          <article key={product.id} className={styles['product-detail-card']}>

            <img src={product.image} alt={product.name} />
            {isEditing ? (
              <UpdateProduct product={product}
                ingredientInput={ingredientInput}
                setIngredientInput={setIngredientInput}
                handleKeyDown={handleIngredientKeyDown}
                removeIngredient={removeIngredient}
                handleEdit={handleEdit}
                setProduct={setProduct}
              />
            ) : (
              <ProductDetail product={product} />
            )}


            <div className={styles['product-detail-actions']}>
              <Link to="/" className={styles.link}>Ver lista de productos</Link>


              <button className={styles['edit-button']}
                onClick={handleEdit}>
                {editName}
              </button>

              <button className={styles['delete-button']}
                onClick={openDeleteModal}>
                Eliminar
              </button>


            </div>

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