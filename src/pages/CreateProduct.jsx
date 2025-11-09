import { Header } from "../components/Header";
import { useForm } from "../hooks/useForm";
import '../styles/create_product.css'


export default function CreateProduct() {

  
  const { 
    error,
    success,
    ingredientInput,
    ingredients,
    handleKeyDown,
    handleSubmit,
    setIngredientInput,
    setIngredients,
    setSuccess
  } = useForm();
  
  if(success){
    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  }
  

  return (
    <>
      <Header page="Crear Producto" />
      <main className="create-product-page">
        <h1>Crear Producto</h1>
       <form onSubmit={handleSubmit}>
         <input type="text" name="name" placeholder="Nombre del producto" />
         <select name="category" >
           <option value="Cafes">Cafés</option>
           <option value="Postres">Postres</option>
           <option value="Bebidas">Bebidas</option>
           <option value="Comidas">Comidas</option>
         </select>
          <input type="number" step="0.1" name="price" placeholder="Precio del producto" min={0} />
          <textarea name="description" placeholder="Descripción del producto"></textarea>
          <input type="text" name="image" placeholder="URL de la imagen del producto debe ser de Unsplash" />
          <label htmlFor="available">
          <input type="checkbox" name="available" />
            Disponible
          </label>
          <input 
            type="text" 
            name="ingredients" 
            value={ingredientInput} 
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escriba un ingrediente o varios separados por comas"/>
          <div className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="ingredient-item">{ingredient} 
              <button 
                className="delete-ingredient" 
                onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>  
              </button>
              </span>
            ))}
          </div>

         <button type="submit" >Crear Producto</button>
       </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </main>
    </>
  );
  }