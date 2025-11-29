import { Header } from "../components/Header";
import { useForm } from "../hooks/useForm";
import { IngredientsInput } from "../components/IngredientsInput";
import { SelectCategory } from "../components/SelectCategory";
import styles from '../styles/create_product.module.css'


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

  if (success) {
    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  }


  return (
    <>
      <Header page="Crear Producto" />
      <main className={styles['create-product-page']}>
        <h1 className={styles.title}>Crear Producto</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="name" placeholder="Nombre del producto" />
          <SelectCategory />
          <input type="number" step="0.1" name="price" placeholder="Precio del producto" min={0} />
          <textarea name="description" placeholder="Descripción del producto"></textarea>
          <input type="text" name="image" placeholder="URL de la imagen del producto debe ser de Unsplash" />
          <label htmlFor="available">
            <input type="checkbox" name="available" />
            Disponible
          </label>
          <IngredientsInput
            name="ingredients"
            inputValue={ingredientInput}
            onInputChange={setIngredientInput}
            ingredients={ingredients}
            onKeyDown={handleKeyDown}
            onRemove={(index) => setIngredients(ingredients.filter((_, i) => i !== index))}
          />

          <button type="submit" className={styles.button}>Crear Producto</button>
        </form>
        {error && <p className={styles['error-message']}>{error}</p>}
        {success && <p className={styles['success-message']}>{success}</p>}
      </main>
    </>
  );
}