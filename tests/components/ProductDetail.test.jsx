import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductDetail } from '../../src/components/ProductDetail';

describe('ProductDetail', () => {
    const mockProduct = {
        name: 'Test Product',
        category: 'Test Category',
        description: 'Test Description',
        price: 10.5,
        available: true,
        ingredients: ['Ing1', 'Ing2']
    };

    /**
     * Test 1: Verificar que se renderiza la información del producto
     */
    it('should render product information correctly', () => {
        render(<ProductDetail product={mockProduct} />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Category')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Precio: 10.5€')).toBeInTheDocument();
        expect(screen.getByText('Disponible')).toBeInTheDocument();
    });

    /**
     * Test 2: Verificar la lista de ingredientes
     */
    it('should render ingredients list', () => {
        render(<ProductDetail product={mockProduct} />);
        expect(screen.getByText('Ing1')).toBeInTheDocument();
        expect(screen.getByText('Ing2')).toBeInTheDocument();
    });
});
