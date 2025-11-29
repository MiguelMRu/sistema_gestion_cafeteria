import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SelectCategory } from '../../src/components/SelectCategory';

describe('SelectCategory', () => {
    // Test para verificar que el componente se renderiza correctamente
    it('should render the select component', () => {
        render(<SelectCategory />);
        // Buscamos el elemento
        const select = screen.getByRole('combobox');
        // Verificamos que el select esté en el documento
        expect(select).toBeInTheDocument();
    });

    // Test para verificar que se renderizan todas las opciones de categorías
    it('should render all categories options', () => {
        render(<SelectCategory />);

        // Definimos las opciones esperadas
        const options = [
            { value: 'Cafes', label: 'Cafés' },
            { value: 'Postres', label: 'Postres' },
            { value: 'Bebidas', label: 'Bebidas' },
            { value: 'Comidas', label: 'Comidas' }
        ];

        // Iteramos sobre cada opción para verificar su existencia y valor
        options.forEach(option => {
            // Buscamos la opción por su etiqueta visible
            const optionElement = screen.getByRole('option', { name: option.label });
            // Verificamos que la opción esté en el documento
            expect(optionElement).toBeInTheDocument();
            // Verificamos que el valor de la opción sea el correcto
            expect(optionElement.value).toBe(option.value);
        });
    });
});

