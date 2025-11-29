import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DeleteProduct } from '../../src/components/DeleteProduct';

describe('DeleteProduct', () => {
    const mockHandleDelete = vi.fn(() => vi.fn()); // Curried function
    const mockCloseDeleteModal = vi.fn();
    const mockProduct = { id: 1, name: 'Test Product' };

    /**
     * Test 1: Verificar el contenido del modal
     */
    it('should render modal content correctly', () => {
        render(
            <DeleteProduct
                deleteProductRef={{ current: null }}
                handleDelete={mockHandleDelete}
                closeDeleteModal={mockCloseDeleteModal}
                product={mockProduct}
            />
        );
        expect(screen.getByText('¿Estás seguro de que deseas eliminar este producto?')).toBeInTheDocument();
    });

    /**
     * Test 2: Verificar la acción de eliminar
     */
    it('should call handleDelete when confirm button is clicked', () => {
        render(
            <DeleteProduct
                deleteProductRef={{ current: null }}
                handleDelete={mockHandleDelete}
                closeDeleteModal={mockCloseDeleteModal}
                product={mockProduct}
            />
        );

        fireEvent.click(screen.getByText('Sí, eliminar'));
        expect(mockHandleDelete).toHaveBeenCalledWith(1);
    });

    /**
    * Test 3: Verificar la acción de cancelar
    */
    it('should call closeDeleteModal when cancel button is clicked', () => {
        render(
            <DeleteProduct
                deleteProductRef={{ current: null }}
                handleDelete={mockHandleDelete}
                closeDeleteModal={mockCloseDeleteModal}
                product={mockProduct}
            />
        );

        fireEvent.click(screen.getByText('Cancelar'));
        expect(mockCloseDeleteModal).toHaveBeenCalled();
    });
});
