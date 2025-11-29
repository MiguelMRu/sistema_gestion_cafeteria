import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from '../../src/pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';

// Mock de todos los componentes hijos
vi.mock('../../src/components/Header', () => ({
    Header: () => <div data-testid="header">Header</div>
}));

vi.mock('../../src/components/Filters', () => ({
    Filters: () => <div data-testid="filters">Filters</div>
}));

vi.mock('../../src/components/Products', () => ({
    Products: () => <div data-testid="products">Products</div>
}));

// Mock del hook useCategories
vi.mock('../../src/hooks/useCategories.jsx', () => ({
    useCategories: vi.fn(() => [])
}));

// Mock del store de Zustand
let mockFetchProducts;

vi.mock('../../src/store/useProductStore.js', () => ({
    useProductStore: (selector) => {
        mockFetchProducts = vi.fn();
        return selector({
            products: [],
            loading: false,
            error: null,
            filters: {
                search: '',
                category: '',
                availability: '',
            },
            fetchProducts: mockFetchProducts,
            setFilters: vi.fn()
        });
    }
}));

describe('Dashboard', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        mockFetchProducts = vi.fn();
    });

    /**
     *Verificar que el Dashboard se renderiza correctamente
     */
    it('should render Dashboard with all child components', () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        // Verificar que todos los componentes hijos están presentes
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('filters')).toBeInTheDocument();
        expect(screen.getByTestId('products')).toBeInTheDocument();
    });

    /**
     * TEST 2: Verificar que fetchProducts se llama al montar el componente
     */
    it('should call fetchProducts on component mount', () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        // Verificar que fetchProducts fue llamado
        expect(mockFetchProducts).toHaveBeenCalled();
    });

    /**
     * Verificar que fetchProducts se llama solo una vez
     */
    it('should call fetchProducts exactly once on mount', () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        // Verificar que fetchProducts fue llamado exactamente 1 vez
        expect(mockFetchProducts).toHaveBeenCalledTimes(1);
    });
});
