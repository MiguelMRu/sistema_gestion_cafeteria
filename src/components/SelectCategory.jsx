export function SelectCategory({ name, defaultValue = "Cafes" }) {
    return (
        <select name={name} defaultValue={defaultValue} >
            <option value="Cafes">Cafés</option>
            <option value="Postres">Postres</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Comidas">Comidas</option>
        </select>
    )
}