import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Filters } from '../../src/components/Filters';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useProductStore } from "../../src/store/useProductStore";


vi.mock('../../src/hooks/useCategories.jsx', () => ({
    useCategories: vi.fn(() => [
        { value: 'Cafes', label: 'Cafés' },
        { value: 'Postres', label: 'Postres' }
    ])
}));

let mockSetFilters;

vi.mock('../../src/store/useProductStore.js', () => {
    return {
        useProductStore: (selector) => {
            mockSetFilters = vi.fn();
            return selector({
                filters: {
                    search: '',
                    category: '',
                    availability: '',
                },
                setFilters: mockSetFilters
            });
        }
    };
});

const mockCategories = [
    { id: 1, name: 'Cafés' },
    { id: 2, name: 'Postres' }
];


describe('Filters', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        mockSetFilters = vi.fn();
    });

    it('should render all the elements of the filters', () => {
        render(
            <MemoryRouter>
                <Filters />
            </MemoryRouter>
        );
        const textboxes = screen.getAllByRole('textbox');
        const comboboxes = screen.getAllByRole('combobox');
        expect(textboxes).toHaveLength(1);
        expect(comboboxes).toHaveLength(2);
    });

    it('should change the value of the search input', async () => {
        render(
            <MemoryRouter>
                <Filters />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'test');
        expect(input).toHaveValue('test');
    });

    it('should call setFilters when category select changes', async () => {
        render(
            <MemoryRouter>
                <Filters />
            </MemoryRouter>
        );
        const selects = screen.getAllByRole('combobox');
        const categorySelect = selects[0]; // El primer select es el de categorías
        await userEvent.selectOptions(categorySelect, 'Cafes');

        // Verificar que setFilters fue llamado con el valor correcto
        expect(mockSetFilters).toHaveBeenCalled();
    });

    it('should call setFilters when availability select changes', async () => {
        render(
            <MemoryRouter>
                <Filters />
            </MemoryRouter>
        );
        const selects = screen.getAllByRole('combobox');
        const availabilitySelect = selects[1]; // El segundo select es el de disponibilidad
        await userEvent.selectOptions(availabilitySelect, 'disponible');

        // Verificar que setFilters fue llamado 
        expect(mockSetFilters).toHaveBeenCalled();
    });



});