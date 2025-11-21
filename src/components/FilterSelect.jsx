export function FilterSelect({ options, value, onChange }) {

    return (
        <select value={value} onChange={onChange}>
            <option value="all">Todos</option>
            {options.map((option, index) => (
                <option 
                    key={index} 
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    )
}