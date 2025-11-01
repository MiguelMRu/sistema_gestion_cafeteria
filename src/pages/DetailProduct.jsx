import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/productService'

export default function DetailProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

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

  return (
    <div>
      <h1>Detalle del Producto</h1>
      <p>Aquí puedes ver los detalles de un producto específico.</p>
    </div>
  );
}
