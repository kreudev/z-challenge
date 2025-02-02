import { render, screen, fireEvent } from '@testing-library/react';
import PhoneCard from '@/components/PhoneCard';

const mockPhone = {
  id: 'APL-IP13-128',
  brand: 'Apple',
  name: 'iPhone 13',
  basePrice: 619,
  imageUrl:
    'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-IP13-128-medianoche.png',
};

describe('PhoneCard Component', () => {
  test('Debe mostrar la información del teléfono correctamente', () => {
    render(<PhoneCard phone={mockPhone} handleAction={() => {}} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('619 EUR')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockPhone.imageUrl);
  });

  test('Debe llamar a handleAction cuando se hace clic en la tarjeta', () => {
    const handleActionMock = jest.fn();
    render(<PhoneCard phone={mockPhone} handleAction={handleActionMock} />);

    const card = screen.getByText('iPhone 13');
    fireEvent.click(card);

    expect(handleActionMock).toHaveBeenCalledTimes(1);
  });
});
