import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UpdateProduct } from '../../src/components/UpdateProduct';
import * as productService from '../../src/services/productService';

// Mock dependencies
vi.mock('../../src/components/IngredientsInput', () => ({
    IngredientsInput: () => <div data-testid="ingredients-input">Ingredients Input</div>
}));
vi.mock('../../src/components/SelectCategory', () => ({
    SelectCategory: ({ defaultValue, name }) => <input data-testid="select-category" name={name} defaultValue={defaultValue} />
}));
vi.mock('../../src/services/productService', () => ({
    updateProduct: vi.fn(),
    getProductById: vi.fn()
}));

describe('UpdateProduct', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        category: 'Test Category',
        description: 'Test Description',
        price: 10,
        available: true,
        ingredients: []
    };
    const mockProps = {
        product: mockProduct,
        ingredientInput: '',
        setIngredientInput: vi.fn(),
        handleKeyDown: vi.fn(),
        removeIngredient: vi.fn(),
        handleEdit: vi.fn(),
        setProduct: vi.fn()
    };

    /**
     * Test 1: Verificar que el formulario se renderiza con valores iniciales
     */
    it('should render form with initial values', () => {
        render(<UpdateProduct {...mockProps} />);
        expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
        expect(screen.getByDisplayValue(10)).toBeInTheDocument();
    });

    /**
     * Test 2: Verificar el envío del formulario
     */
    it('should call updateProduct on form submission', async () => {
        productService.updateProduct.mockResolvedValue({});
        productService.getProductById.mockResolvedValue(mockProduct);

        render(<UpdateProduct {...mockProps} />);

        fireEvent.submit(screen.getByRole('button', { name: 'Guardar' }).closest('form'));

        await waitFor(() => {
            expect(productService.updateProduct).toHaveBeenCalled();
            expect(mockProps.handleEdit).toHaveBeenCalled();
        });
    });
});
