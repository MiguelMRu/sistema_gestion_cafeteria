import { Header } from "../components/Header";
import {createProduct} from '../services/productService'
import { useState } from "react";
import '../styles/create_product.css'


export default function CreateProduct() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const unsplash_regex = "^https?:\\/\\/images\\.unsplash\\.com\\/photo-[a-zA-Z0-9_-]+(\\?.*)?$";
  const number_regex = "^-?\\d+(\\.\\d+)?$";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Obtenemos los datos del formulario como un objeto
    const productData = Object.fromEntries(formData);
    // Validar que ningún campo esté vacío
    for (const [key, value] of formData.entries()) {
      if (!value) {
        setError(`El campo "${key}" es obligatorio.`);
        return;
      }

    }


    // El precio debe ser un número positivo o decimal separado por punto
    if (!productData.price.match(number_regex)) {
      setError('Precio no valido.');
      return;
    }

    // la descripción tenga al menos 10 caracteres
    if(productData.description.length < 10){
      setError('La descripción debe tener al menos 10 caracteres.');
      return;
    }
    // la imagen debe ser una URL válida de Unsplash
    if (!productData.image.match(unsplash_regex)) {
      setError('La imagen debe ser una URL válida de Unsplash.');
      return;
    }
    setError(null);
    
    
    await createProduct(productData);

    event.target.reset();
    setSuccess('Producto creado con éxito.');
  };

  return (
    <>
      <Header page="Crear Producto" />
      <main>
        <h1>Crear Producto</h1>
       <form onSubmit={handleSubmit}>
         <input type="text" name="name" placeholder="Nombre del producto" />
         <select name="category" >
           <option value="cafes">Cafés</option>
           <option value="postres">Postres</option>
           <option value="bebidas">Bebidas</option>
           <option value="comidas">Comidas</option>
         </select>
          <input type="number" step="0.1" name="price" placeholder="Precio del producto" min={0} />
          <textarea name="description" placeholder="Descripción del producto"></textarea>
          <input type="text" name="image" placeholder="URL de la imagen del producto debe ser de Unsplash" />
          <input type="checkbox" name="available" /> Disponible
          {/*TODO: Implementar la lógica para agregar ingredientes */}
          <input type="text" name="ingredients" placeholder="Escribe y presiona Enter para agregar..."/>
         <button type="submit">Crear Producto</button>
       </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </main>
    </>
  );
}
