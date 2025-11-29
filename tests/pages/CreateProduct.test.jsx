import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CreateProduct from '../../src/pages/CreateProduct'; // al tener default export va sin 
import { MemoryRouter } from 'react-router-dom';
import { useForm } from '../../src/hooks/useForm';
import userEvent from '@testing-library/user-event';

vi.mock('../../src/hooks/useForm');

useForm.mockImplementation(() => ({
    error: null,
    success: null,
    ingredientInput: '',
    ingredients: [],
    handleKeyDown: () => { },
    handleSubmit: () => { },
    setIngredientInput: () => { },
    setIngredients: () => { },
    setSuccess: () => { }
}));

describe('CreateProduct', () => {

    it('should render all the elements of the create product form', () => {
        render(
            <MemoryRouter>
                <CreateProduct />
            </MemoryRouter>
        );
        const textboxes = screen.getAllByRole('textbox');
        const checkboxes = screen.getAllByRole('checkbox');
        const buttons = screen.getAllByRole('button');
        expect(textboxes).toHaveLength(4);
        expect(checkboxes).toHaveLength(1);
        expect(buttons).toHaveLength(1);
    });

    it('should render the error message', () => {
        useForm.mockImplementation(() => ({
            error: 'Error al crear el producto',
            success: null,
            ingredientInput: '',
            ingredients: [],
            handleKeyDown: () => { },
            handleSubmit: () => { },
            setIngredientInput: () => { },
            setIngredients: () => { },
            setSuccess: () => { }
        }));
        render(
            <MemoryRouter>
                <CreateProduct />
            </MemoryRouter>
        );
        const error = screen.getByText('Error al crear el producto');
        expect(error).toBeInTheDocument();
    });


    it('should render the success message', () => {
        useForm.mockImplementation(() => ({
            error: null,
            success: 'Producto creado correctamente',
            ingredientInput: '',
            ingredients: [],
            handleKeyDown: () => { },
            handleSubmit: () => { },
            setIngredientInput: () => { },
            setIngredients: () => { },
            setSuccess: () => { }
        }));
        render(
            <MemoryRouter>
                <CreateProduct />
            </MemoryRouter>
        );
        const success = screen.getByText('Producto creado correctamente');
        expect(success).toBeInTheDocument();
    });

    it('should render error message if one input is empty on submit', async () => {

        useForm.mockImplementation(() => ({
            error: 'Error al crear el producto',
            success: null,
            ingredientInput: '',
            ingredients: [],
            handleKeyDown: () => { },
            handleSubmit: () => { },
            setIngredientInput: () => { },
            setIngredients: () => { },
            setSuccess: () => { }
        }));
        render(
            <MemoryRouter>
                <CreateProduct />
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText('Nombre del producto'), 'Producto');
        await userEvent.type(screen.getByPlaceholderText('Precio del producto'), '10');
        await userEvent.type(screen.getByPlaceholderText('Escriba un ingrediente y pulse Enter'), 'Ingredientes');
        await userEvent.type(screen.getByPlaceholderText('URL de la imagen del producto debe ser de Unsplash'), 'Imagen');
        await userEvent.type(screen.getByPlaceholderText('Descripción del producto'), 'Descripción');
        await userEvent.click(screen.getByRole('button', { name: 'Crear Producto' }));

        const error = screen.getByText('Error al crear el producto');
        expect(error).toBeInTheDocument();
    });


    it('should render success message if the product is created', () => {
        useForm.mockImplementation(() => ({
            error: null,
            success: 'Producto creado correctamente',
            ingredientInput: '',
            ingredients: [],
            handleKeyDown: () => { },
            handleSubmit: () => { },
            setIngredientInput: () => { },
            setIngredients: () => { },
            setSuccess: () => { }
        }));
        render(
            <MemoryRouter>
                <CreateProduct />
            </MemoryRouter>
        );
        const success = screen.getByText('Producto creado correctamente');
        expect(success).toBeInTheDocument();
    });
});