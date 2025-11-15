import { getProducts } from '../services/productService.js';
import { useEffect, useState, useCallback } from 'react';
 export function useProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        availability: 'all'
    });


     const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            
              // Si no hay filtros activos, mostrar todos los productos
            if (!filters.search && filters.category === 'all' && filters.availability === 'all') {
                console.log('Mostrando todos los productos:', data);
                setProducts(data);
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
            setProducts(filterProducts);
           // setProducts(filterProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [filters.search, filters.category, filters.availability]);

    useEffect(() => {
        fetchProducts();
    }, [filters.search, filters.category, filters.availability, fetchProducts]);
    return { products, loading, filters, setFilters };
}   

/* log de data sin filtros
0
: 
{id: 39, name: 'Tarta de Chocolate Belga', category: 'Postres', price: 5.5, description: 'Exquisita tarta de chocolate belga con tres capas …0% cacao. Temporalmente agotada por alta demanda.', …}
1
: 
{id: 38, name: 'Latte de Vainilla', category: 'Cafés', price: 4.2, description: 'afé latte suave y cremoso aromatizado con extracto… delicada de la vainilla. Servido con arte latte.', …}
2
: 
{id: 36, name: 'Croissant de Jamón y Queso', category: 'comidas', price: 5.2, description: 'Croissant francés recién horneado, mantecoso y hoj…a y tomate. Perfecto para el desayuno o merienda.', …}
3
: 
{id: 7, name: 'Cortado', category: 'Cafés', price: 1.1, description: 'Espreso cortado con un poco de leche', …}
4
: 
{id: 6, name: 'Cheesecake de Fresa', category: 'Postres', price: 4.25, description: 'Delicioso cheesecake con base de galleta y fresas frescas', …}
5
: 
{id: 5, name: 'Cappuccino Clásico', category: 'Cafés', price: 3.5, description: 'Espresso italiano con leche vaporizada y espuma cremosa', …}
length
: 
6
[[Prototype]]
: 
Array(0)


*/ 