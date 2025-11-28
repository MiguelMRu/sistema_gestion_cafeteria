import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('Header', () => {

    const pageTitle = 'Dashboard';

    it('should render the header with the correct title', () => {
        render(
            <MemoryRouter>
                <Header page={pageTitle} />
            </MemoryRouter>
        );

        //comprobamos que el titulo se renderiza correctamente
        const title = screen.getByText(/Dashboard/);
        expect(title).toBeInTheDocument();

    });

    it('should render the link with the correct name', () => {
        render(
            <MemoryRouter>
                <Header page={pageTitle} />
            </MemoryRouter>
        );

        //comprobamos que el enlace se renderiza correctamente
        const link = screen.getByText(/Añadir producto/);
        expect(link).toBeInTheDocument();
    });


    it('should link to the correct page', () => {
        render(
            <MemoryRouter>
                <Header page={pageTitle} />
            </MemoryRouter>
        );

        //comprobamos que el enlace se renderiza correctamente
        const link = screen.getByText(/Añadir producto/);
        expect(link).toBeInTheDocument();
    });
});
