import styles from '../styles/ingredient_input.module.css'

export function IngredientsInput({
    inputValue,
    onInputChange,
    onKeyDown,
    ingredients,
    onRemove,
    name
}) {
    return (
        <>
            <input
                type="text"
                name={name}
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Escriba un ingrediente y pulse Enter"
            />
            <div className={styles['ingredients-list']}>
                {ingredients?.map((ingredient, index) => (
                    <span key={index} className={styles['ingredient-item']}>
                        {ingredient}
                        <button
                            className={styles['delete-ingredient']}
                            onClick={() => onRemove(index)}
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>
        </>
    )
}