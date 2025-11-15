import { FilterSelect } from "./FilterSelect"
import { useCategories } from "../hooks/useCategories"
import { useProducts } from "../hooks/useProducts"

export function Filters() {
  const categories = useCategories();
  const { filters, setFilters } = useProducts();

  const handleSearchChange = (e) => {
    setFilters({
      search: e.target.value
    });
  };

  const handlefilterChange = (e, type) => {
    setFilters({
      [type]: e.target.value
    });
  };

  return (
    <nav>
      <form>
        <input type="text" placeholder="Buscar productos" onChange={handleSearchChange} />
        <FilterSelect options={categories} value={filters.category} onChange={e => handlefilterChange(e, 'category')} />
        <FilterSelect 
        options={[
                  {value: 'disponible', label: 'Disponible' },
                  { value: 'no_disponible', label: 'No disponible'}
                  ]}
                  value={filters.availability}
                  onChange={e => handlefilterChange(e, 'availability')}
        />

        

      </form>
    </nav>
  )
}