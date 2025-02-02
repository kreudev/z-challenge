import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import { getProducts, searchProducts } from '@/services/api';
import Router from 'next/router';

jest.mock('@/services/api', () => ({
  getProducts: jest.fn(),
  searchProducts: jest.fn(),
}));

jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(() => ({
    cart: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
  })),
}));

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

jest.mock('@/components/Loader', () => ({
  __esModule: true,
  default: ({ onFinish }) => {
    onFinish();
    return null;
  },
}));

const mockPhones = [
  {
    id: 'APL-IP13-128',
    brand: 'Apple',
    name: 'iPhone 13',
    basePrice: 619,
    imageUrl:
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-IP13-128-medianoche.png',
  },
  {
    id: 'APL-I15PM',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    basePrice: 1319,
    imageUrl:
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-medianoche.png',
  },
];

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getProducts.mockResolvedValue(mockPhones); // Simula la respuesta de la API
    searchProducts.mockResolvedValue([mockPhones[0]]);
  });

  test('Debe renderizar correctamente', async () => {
    render(<Home initialPhones={mockPhones} />);

    // Esperamos hasta que el texto "results" aparezca en la pantalla
    await waitFor(() => {
      expect(screen.getByText(/results/i)).toBeInTheDocument();
    });
  });

  test('Debe mostrar los productos en la pantalla', async () => {
    render(<Home initialPhones={mockPhones} />);

    await waitFor(() => {
      expect(screen.getByText('iPhone 13')).toBeInTheDocument();
      expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument();
    });
  });

  test('Debe filtrar productos cuando se realiza una búsqueda', async () => {
    render(<Home initialPhones={mockPhones} />);

    const input = screen.getByPlaceholderText('Search for a smartphone...');
    fireEvent.change(input, { target: { value: 'iPhone 13' } });

    await waitFor(() =>
      expect(searchProducts).toHaveBeenCalledWith('iPhone 13')
    );

    await waitFor(() =>
      expect(screen.getByText('iPhone 13')).toBeInTheDocument()
    );

    expect(screen.queryByText('iPhone 15 Pro Max')).not.toBeInTheDocument();
  });

  test('Debe navegar a la página de detalles del producto al hacer click', async () => {
    render(<Home initialPhones={mockPhones} />);

    const product = await screen.findByText('iPhone 13');
    fireEvent.click(product);

    expect(Router.push).toHaveBeenCalledWith('/phone/APL-IP13-128');
  });
});
