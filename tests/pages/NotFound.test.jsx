import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '../../src/pages/NotFound';

describe('NotFound', () => {
    /**
     * Test 1: Verificar que se renderiza el mensaje de error
     */
    it('should render not found message', () => {
        render(<NotFound />);
        expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
        expect(screen.getByText('Lo sentimos, la página que buscas no existe.')).toBeInTheDocument();
    });
});
