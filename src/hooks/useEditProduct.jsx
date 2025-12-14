import { useState } from 'react';

export function useEditProduct({ product, setProduct, ingredientInput, setIngredientInput }) {

    const [isEditing, setIsEditing] = useState(false)
    const editName = isEditing ? 'Cancelar' : 'Editar'
    //Modificar estado de edicion
    const handleEdit = () => {
        setIsEditing(!isEditing)

    }

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

    return {
        handleIngredientKeyDown,
        removeIngredient,
        handleEdit,
        editName,
        isEditing
    }
}