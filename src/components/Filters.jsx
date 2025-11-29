import { FilterSelect } from "./FilterSelect"
import { useCategories } from "../hooks/useCategories"
import { useProductStore } from "../store/useProductStore";
import { useDebounce } from "use-debounce"
import { useState, useEffect } from "react";
import styles from "../styles/filters.module.css"

export function Filters() {
  const categories = useCategories();
  const filters = useProductStore((state) => state.filters);
  const setFilters = useProductStore((state) => state.setFilters);

  const [searchInput, setSearchInput] = useState(filters.search);

  const [debouncedSearch] = useDebounce(searchInput, 300);

  // Cuando el valor debounced cambia, actualizar el filtro global
  useEffect(() => {
    setFilters({ ...filters, search: debouncedSearch });
  }, [debouncedSearch]); // ⚠️ Solo depende de debouncedSearch



  const handleSearchChange = (e) => {
    setSearchInput(e.target.value); // Actualizar estado local
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleAvailabilityChange = (e) => {
    setFilters({ ...filters, availability: e.target.value });
  };

  return (
    <nav className={styles.filters}>
      <form className={styles['filters-form']}>
        <input
          type="text"
          placeholder="Buscar productos"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <FilterSelect
          options={categories}
          value={filters.category}
          onChange={handleCategoryChange}
        />

        <FilterSelect
          options={[
            { value: 'disponible', label: 'Disponible' },
            { value: 'no_disponible', label: 'No disponible' }
          ]}
          value={filters.availability}
          onChange={handleAvailabilityChange}
        />



      </form>
    </nav>
  )
}