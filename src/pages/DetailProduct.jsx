import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, deleteProduct } from '../services/productService'
import { Header } from '../components/Header'
import { DeleteProduct } from '../components/DeleteProduct'
import '../styles/detail_product.css'
import { UpdateProduct } from '../components/UpdateProduct'
import { ProductDetail } from '../components/ProductDetail'

export default function DetailProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const deleteProductRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  const [ingredientInput, setIngredientInput] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id)
      setProduct(data)

    }

    fetchProduct()
  }, [id])

  //Funcion para eliminar producto
  const handleDelete = (id) => async () => {
    try {
      await deleteProduct(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  //Abrir modal de eliminacion
  const openDeleteModal = () => {
    deleteProductRef.current.showModal();
  }

  //Cerrar modal de eliminacion
  const closeDeleteModal = () => {
    deleteProductRef.current.close();
  }

  //Modificar estado de edicion
  const handleEdit = () => {
    setIsEditing(!isEditing)

  }

  const editName = isEditing ? 'Cancelar' : 'Editar'

  //Funcion para agregar ingredientes
  const handleIngredientKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const values = ingredientInput.trim().split(','); // Separar por comas

      if (ingredientInput.trim() === '') return;

      if (values.length > 1) {
        // Si hay varios ingredientes separados por comas
        const newIngredients = [];
        for (let ingredient of values) {
          ingredient = ingredient.trim();
          if (ingredient && !product.ingredients.includes(ingredient)) {
            newIngredients.push(ingredient);
          }
        }

        if (newIngredients.length > 0) {
          setProduct(prev => ({
            ...prev,
            ingredients: [...(prev.ingredients || []), ...newIngredients]
          }));
        }
      } else {
        // Si es un solo ingrediente
        const value = values[0];
        if (!product.ingredients.includes(value)) {
          setProduct(prev => ({
            ...prev,
            ingredients: [...(prev.ingredients || []), value]
          }));
        }
      }

      setIngredientInput("");
    }
  };

  //Funcion para eliminar ingredientes
  const removeIngredient = (indexToRemove) => {
    setProduct(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, index) => index !== indexToRemove)
    }));
  };



  return (
    <>
      <Header page='Detalle del producto' />

      <main className='detail-product'>
        {product && (
          <article key={product.id} className='product-detail-card'>

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


            <div className='product-detail-actions'>
              <Link to="/">Ver lista de productos</Link>


              <button className='edit-button'
                onClick={handleEdit}>
                {editName}
              </button>

              <button className='delete-button'
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