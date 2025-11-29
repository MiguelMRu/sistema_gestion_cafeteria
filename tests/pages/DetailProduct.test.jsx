import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DetailProduct from '../../src/pages/DetailProduct';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as productService from '../../src/services/productService';

// Mock child components
vi.mock('../../src/components/Header', () => ({
    Header: () => <div data-testid="header">Header</div>
}));
vi.mock('../../src/components/DeleteProduct', () => ({
    DeleteProduct: () => <div data-testid="delete-product-modal">DeleteProduct Modal</div>
}));
vi.mock('../../src/components/UpdateProduct', () => ({
    UpdateProduct: () => <div data-testid="update-product-form">UpdateProduct Form</div>
}));
vi.mock('../../src/components/ProductDetail', () => ({
    ProductDetail: () => <div data-testid="product-detail-info">ProductDetail Info</div>
}));

// Mock hooks
vi.mock('../../src/hooks/useModal', () => ({
    useModal: () => ({
        handleDelete: vi.fn(),
        openDeleteModal: vi.fn(),
        closeDeleteModal: vi.fn()
    })
}));

const mockHandleEdit = vi.fn();
vi.mock('../../src/hooks/useEditProduct', () => ({
    useEditProduct: () => ({
        handleIngredientKeyDown: vi.fn(),
        removeIngredient: vi.fn(),
        handleEdit: mockHandleEdit,
        editName: 'Editar',
        isEditing: false
    })
}));

// Mock service
vi.mock('../../src/services/productService', () => ({
    getProductById: vi.fn(),
    deleteProduct: vi.fn()
}));

describe('DetailProduct', () => {
    const mockProduct = {
        id: '1',
        name: 'Café',
        image: 'cafe.jpg',
        category: 'Bebidas',
        description: 'Delicioso café',
        price: 2.5,
        available: true,
        ingredients: ['Agua', 'Café']
    };

    beforeEach(() => {
        vi.clearAllMocks();
        productService.getProductById.mockResolvedValue(mockProduct);
    });

    /**
     * Test 1: Verificar que se renderiza la información del producto
     */
    it('should render product details correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/producto/1']}>
                <Routes>
                    <Route path="/producto/:id" element={<DetailProduct />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('product-detail-info')).toBeInTheDocument();
            expect(screen.getByText('Editar')).toBeInTheDocument();
            expect(screen.getByText('Eliminar')).toBeInTheDocument();
        });
    });

    /**
     * Test 2: Verificar la interacción del botón de editar
     */
    it('should call handleEdit when edit button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/producto/1']}>
                <Routes>
                    <Route path="/producto/:id" element={<DetailProduct />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Editar')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Editar'));
        expect(mockHandleEdit).toHaveBeenCalled();
    });

    /**
     * Test 3: Verificar que se muestra el modal de eliminar
     */
    it('should render delete modal', async () => {
        render(
            <MemoryRouter initialEntries={['/producto/1']}>
                <Routes>
                    <Route path="/producto/:id" element={<DetailProduct />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('delete-product-modal')).toBeInTheDocument();
        });
    });
});
