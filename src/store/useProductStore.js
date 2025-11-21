import { create } from 'zustand';
import { getProducts } from '../services/productService.js';

export const useProductStore = create((set, get) => ({
    // Estado
    products: [],
    loading: true,
    error: null,
    filters: {
        search: '',
        category: 'all',
        availability: 'all'
    },

    // Acciones, es una funcion que actualiza el estado de los filtros y llama a fetchProducts para obetner los productos filtrados
    setFilters: (newFilters) => {
        set({ filters: newFilters });
        get().fetchProducts(); 
    },

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const data = await getProducts();
            const { filters } = get(); // Obtener los filtros actuales del store

            // Si no hay filtros activos, mostrar todos los productos
            if (!filters.search && filters.category === 'all' && filters.availability === 'all') {
                console.log('Mostrando todos los productos:', data);
                set({ products: data, loading: false });
                return;
            }

            // Inicializar filterProducts con TODOS los datos
            let filterProducts = [...data];

            // Aplicar filtro de búsqueda
            if (filters.search) {
                filterProducts = filterProducts.filter(product =>
                    product.name.toLowerCase().includes(filters.search.toLowerCase())
                );
            }

            // Aplicar filtro de categoría
            if (filters.category && filters.category !== 'all') {
                filterProducts = filterProducts.filter(product =>
                    product.category === filters.category
                );
            }

            // Aplicar filtro de disponibilidad
            if (filters.availability && filters.availability !== 'all') {
                const isAvailable = filters.availability === 'disponible';
                filterProducts = filterProducts.filter(product =>
                    product.available === isAvailable
                );
            }

            console.log('Productos filtrados:', filterProducts);
            set({ products: filterProducts, loading: false });

        } catch (error) {
            console.error('Error fetching products:', error);
            set({ loading: false, error: "Ha habido un error al obtener los productos intenta a recargar la página" });
            
        }
    }
}));