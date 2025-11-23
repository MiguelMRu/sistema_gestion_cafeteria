import { IngredientsInput } from "./IngredientsInput";
import { updateProduct, getProductById } from '../services/productService'
import { SelectCategory } from './SelectCategory'
import { useRef } from 'react'
import '../styles/update_product.css'

export function UpdateProduct({ product,
    ingredientInput,
    setIngredientInput,
    handleKeyDown,
    removeIngredient,
    handleEdit,
    setProduct }) {

    const formRef = useRef(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateProduct(product.id, {
                name: formRef.current.name.value,
                category: formRef.current.category.value,
                description: formRef.current.description.value,
                price: formRef.current.price.value,
                available: formRef.current.available.checked,
                ingredients: product.ingredients
            })

            const updatedProduct = await getProductById(product.id)
            setProduct(updatedProduct)

            handleEdit()
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <form className='product-detail-info product-update'
            onSubmit={handleSubmit}
            ref={formRef}
        >
            <input type="text" name="name" defaultValue={product.name} autoComplete="off" />
            <SelectCategory name="category" defaultValue={product.category} autoComplete="off" />
            <textarea type="text" name="description" defaultValue={product.description} autoComplete="off" />
            <input type="number" step="0.1" name="price" defaultValue={product.price} className='product-detail-price' autoComplete="off" />
            <label htmlFor="available">
                <input id="available" type="checkbox" name="available" defaultChecked={product.available} autoComplete="off" />
                Disponible
            </label>
            <IngredientsInput
                name="ingredients"
                inputValue={ingredientInput}
                onInputChange={setIngredientInput}
                onKeyDown={handleKeyDown}
                ingredients={product.ingredients}
                onRemove={removeIngredient}
            />
            <button type="submit">Guardar</button>
        </form>

    )
}