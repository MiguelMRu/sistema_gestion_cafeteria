import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Products } from './Products';
import { MemoryRouter } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore.js';

vi.mock('../store/useProductStore.js')


describe('Products', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockProducts = [
        { id: 1, name: 'Café Americano', category: 'Cafés', price: 2.5, image: '/img1.jpg' },
        { id: 2, name: 'Tarta de Queso', category: 'Postres', price: 4.0, image: '/img2.jpg' }
    ];

    it('should render loading products at the start', () => {

        useProductStore.mockImplementation((selector) => selector({
            products: [],
            loading: true,
            error: null
        }));

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const product = screen.getByText(/Loading products/);
        expect(product).toBeInTheDocument();
    });

    it('should render the products from the store', () => {



        useProductStore.mockImplementation((selector) => selector({
            products: mockProducts,
            loading: false,
            error: null
        }));

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(screen.getByText('Café Americano')).toBeInTheDocument();
        expect(screen.getByText('Tarta de Queso')).toBeInTheDocument();
        expect(screen.getByText('Precio: 2.5€')).toBeInTheDocument();
    });

    it('should linkt to the correct product page', () => {

        useProductStore.mockImplementation((selector) => selector({
            products: mockProducts,
            loading: false,
            error: null
        }));

        const id = mockProducts[0].id;

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: "Café Americano Café Americano Cafés Precio: 2.5€" });
        expect(link).toHaveAttribute('href', `/producto/${id}`);
    });

    it('should render the product image', () => {

        useProductStore.mockImplementation((selector) => selector({
            products: mockProducts,
            loading: false,
            error: null
        }));

        const id = mockProducts[0].id;

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const image = screen.getByRole('img', { name: "Café Americano" });
        expect(image).toHaveAttribute('src', `/img1.jpg`);
    });

    it('should render the error message', () => {

        useProductStore.mockImplementation((selector) => selector({
            products: [],
            loading: false,
            error: 'Error al cargar los productos'
        }));

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const error = screen.getByText(/Error al cargar los productos/);
        expect(error).toBeInTheDocument();
    });



});
