import { useState } from "react";
import { createProduct } from "../services/productService";

export function useForm() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientInput, setIngredientInput] = useState("");
    const unsplash_regex = "^https?:\\/\\/images\\.unsplash\\.com\\/photo-[a-zA-Z0-9_-]+(\\?.*)?$";
    const number_regex = "^-?\\d+(\\.\\d+)?$";


    const handleKeyDown = (e) => {
    //Al presionar Enter se agrega el ingrediente a la lista si no está vacío y no está repetido
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = ingredientInput.trim().split(',');

        if (value === '') return;

        if (value.length > 1) {
          for (let ingredient of value) {
            ingredient = ingredient.trim();
            if (ingredient && !ingredients.includes(ingredient)) {
              setIngredients(prevIngredients => [...prevIngredients, ingredient]);
            }
          }
        } else {
          setIngredients([...ingredients, value]);
        }
        setIngredientInput("");

      
    }
  }

      const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const formData = new FormData(event.target);
        // Obtenemos los datos del formulario como un objeto
        const productData = Object.fromEntries(formData);
        // Validar que ningún campo esté vacío
        for (const [key, value] of formData.entries()) {
          if(key === 'ingredients' && ingredients.length > 0) continue ; // Saltar la validación de ingredientes si hay al menos uno agregado

          if (!value) {
            setError(`El campo ${key} es obligatorio.`);
            return;
          }

        }      

        /* Validaciones adicionales */
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
          setError('La imagen debe ser una URL válida de Unsplash. Para tener un ejemplo puedes copiar esta URL: https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400');
          return;
        }

        /* Modificaciones de valores*/
        //Modificar url para que tenga el formato correcto de Unsplash obtenemos la id de la foto y le ponemos ancho fijo de 400px
        productData.image = productData.image.split('?')[0] + '?w=400';

        // Agregar los ingredientes al objeto productData
        productData.ingredients = ingredients;


        // Crear el producto
        await createProduct(productData);

        
      // Reiniciar el formulario y los estados
        event.target.reset();
        setError(null);
        setSuccess('Producto creado con éxito.');
        setIngredients([]);

      } catch (e) {
        if (e.code === '23505') {
          setError('Ya existe un producto con ese nombre. Por favor elige otro nombre.');
        } else {
          setError('Error al crear el producto. Inténtalo de nuevo.');
        }

      }
    }
    
    return { 
      error,
      success,
      ingredientInput,
      ingredients,
      handleKeyDown,
      handleSubmit,
      setIngredientInput,
      setIngredients,
      setSuccess
    };

  }
