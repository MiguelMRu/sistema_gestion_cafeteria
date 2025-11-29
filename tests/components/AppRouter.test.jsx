import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppRouter from '../../src/components/AppRouter';

// Mock pages
vi.mock('../../src/pages/Dashboard', () => ({ default: () => <div data-testid="dashboard">Dashboard</div> }));
vi.mock('../../src/pages/DetailProduct', () => ({ default: () => <div data-testid="detail-product">DetailProduct</div> }));
vi.mock('../../src/pages/CreateProduct', () => ({ default: () => <div data-testid="create-product">CreateProduct</div> }));
vi.mock('../../src/pages/NotFound', () => ({ default: () => <div data-testid="not-found">NotFound</div> }));

describe('AppRouter', () => {
    /**
     * Test 1: Verificar que la ruta inicial renderiza el Dashboard
     */
    it('should render Dashboard on default route', () => {
        render(<AppRouter />);
        expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });
});
