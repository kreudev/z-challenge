import { render, screen, within, fireEvent } from '@testing-library/react';
import Cart from '@/pages/cart';
import { useCart } from '@/context/CartContext';
import '@testing-library/jest-dom';

jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/components/Loader', () => ({
  __esModule: true,
  default: ({ onFinish }) => {
    onFinish();
    return null;
  },
}));

const mockCart = [
  {
    id: 'APL-IP13-128',
    name: 'iPhone 13',
    price: 619,
    image:
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-IP13-128-medianoche.png',
    storage: { capacity: '128GB' },
    color: { name: 'Midnight' },
  },
  {
    id: 'APL-I15PM',
    name: 'iPhone 15 Pro Max',
    price: 1319,
    image:
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-titanio-negro.png',
    storage: { capacity: '256GB' },
    color: { name: 'Titanium Black' },
  },
];

describe('Cart Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe renderizar el carrito correctamente con productos', () => {
    useCart.mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    const totalElements = screen.queryAllByText(/^TOTAL$/);
    expect(totalElements.length).toBeGreaterThan(0);
    expect(totalElements[0]).toBeInTheDocument();

    const priceElements = screen.queryAllByText('1938 EUR');
    expect(priceElements.length).toBeGreaterThan(0);
    expect(priceElements[0]).toBeInTheDocument();
  });

  test('Debe mostrar un carrito vacío si no hay productos', () => {
    useCart.mockReturnValue({
      cart: [],
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByText('CART (0)')).toBeInTheDocument();
    expect(screen.queryByText('TOTAL')).not.toBeInTheDocument();
    expect(screen.queryByText('PAY')).not.toBeInTheDocument();
  });

  test('Debe eliminar un producto al hacer clic en el botón "Eliminar"', () => {
    const removeFromCartMock = jest.fn();

    useCart.mockReturnValue({
      cart: mockCart,
      removeFromCart: removeFromCartMock,
    });

    render(<Cart />);

    const removeButton = screen.getAllByText('Eliminar')[0];
    fireEvent.click(removeButton);

    expect(removeFromCartMock).toHaveBeenCalledWith('APL-IP13-128');
  });

  test('Debe navegar a la página principal al hacer clic en "CONTINUE SHOPPING"', () => {
    useCart.mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    const continueShoppingButton = screen.getByText('CONTINUE SHOPPING');
    expect(continueShoppingButton.closest('a')).toHaveAttribute('href', '/');
  });
});
