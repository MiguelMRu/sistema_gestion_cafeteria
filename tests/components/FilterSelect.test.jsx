import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterSelect } from '../../src/components/FilterSelect';

describe('FilterSelect', () => {
    const mockOptions = [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' }
    ];
    const mockOnChange = vi.fn();

    /**
     * Test 1: Verificar que se renderizan las opciones correctamente
     */
    it('should render options correctly', () => {
        render(<FilterSelect options={mockOptions} value="all" onChange={mockOnChange} />);
        expect(screen.getByText('Todos')).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    /**
     * Test 2: Verificar el cambio de selección
     */
    it('should call onChange when selection changes', () => {
        render(<FilterSelect options={mockOptions} value="all" onChange={mockOnChange} />);
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'opt1' } });
        expect(mockOnChange).toHaveBeenCalled();
    });
});
