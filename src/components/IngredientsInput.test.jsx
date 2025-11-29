import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IngredientsInput } from './IngredientsInput';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

// Componente reutilizable para tests que maneja el estado
const StatefulIngredientsInput = ({ initialIngredients = [] }) => {
    const [ingredients, setIngredients] = useState(initialIngredients);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIngredients([...ingredients, inputValue]);
            setInputValue('');
        }
    };

    return (
        <IngredientsInput
            ingredients={ingredients}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onKeyDown={handleKeyDown}
            onRemove={(indexToRemove) => {
                setIngredients(ingredients.filter((_, index) => index !== indexToRemove))
            }}
        />
    );
};

let user;

describe('IngredientsInput', () => {

    beforeEach(() => {
        // Inicializamos el usuario para utilizarlo en los tests
        user = userEvent.setup();
    });

    it('should render an input and a list of ingredients', () => {
        render(
            <MemoryRouter>
                <StatefulIngredientsInput />
            </MemoryRouter>
        );
    });

    it('should add an ingredient when the enter key is pressed', async () => {



        render(
            <MemoryRouter>
                <StatefulIngredientsInput />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox', { placeholder: 'Escriba un ingrediente y pulse Enter' });
        // Simulamos la escritura de un ingrediente y la pulsación de Enter
        await user.type(input, 'Ingredient');
        await user.keyboard('{enter}');

        expect(screen.getByText(/Ingredient/i)).toBeInTheDocument();
    });

    it('should remove an ingredient when the delete button is clicked', async () => {


        render(
            <MemoryRouter>
                <StatefulIngredientsInput initialIngredients={['Ingredient']} />
            </MemoryRouter>
        );
        // Obtenemos el botón de eliminar
        const deleteButton = screen.getByRole('button', { type: 'button' });
        // Simulamos el clic en el botón de eliminar
        await user.click(deleteButton);
        // Verificamos que el ingrediente no esté en la lista
        expect(screen.queryByText(/Ingredient/i)).not.toBeInTheDocument();
    });

});
