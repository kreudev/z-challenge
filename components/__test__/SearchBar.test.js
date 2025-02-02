import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';

describe('SearchBar Component', () => {
  test('Debe actualizar el input cuando el usuario escribe', () => {
    const setSearchMock = jest.fn(); // Mock de la función setSearch
    render(<SearchBar search="" setSearch={setSearchMock} />);

    const input = screen.getByPlaceholderText('Search for a smartphone...');
    fireEvent.change(input, { target: { value: 'iPhone' } });

    expect(setSearchMock).toHaveBeenCalledWith('iPhone');
  });

  test('Debe limpiar el input cuando se hace clic en el botón de limpiar', () => {
    const setSearchMock = jest.fn();
    render(<SearchBar search="Samsung" setSearch={setSearchMock} />);

    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(setSearchMock).toHaveBeenCalledWith('');
  });
});
