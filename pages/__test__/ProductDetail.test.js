import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductDetail, { getServerSideProps } from '@/pages/phone/[id]';
import { getProductById } from '@/services/api';
import { useCart } from '@/context/CartContext';
import Router from 'next/router';

jest.mock('@/services/api', () => ({
  getProductById: jest.fn(),
}));

jest.mock('@/components/Loader', () => ({
  __esModule: true,
  default: ({ onFinish }) => {
    onFinish();
    return null;
  },
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
  back: jest.fn(),
}));

const mockProduct = {
  id: 'APL-IP13-128',
  name: 'iPhone 13',
  brand: 'Apple',
  description: 'A great phone',
  colorOptions: [
    {
      name: 'Midnight',
      hexCode: '#1c1c1e',
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-IP13-128-medianoche.png',
    },
    { name: 'Red', hexCode: '#ff3b30', imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/red.png' },
  ],
  storageOptions: [
    { capacity: '128GB', price: 619 },
    { capacity: '256GB', price: 699 },
  ],
  similarProducts: [],
  specs: { battery: '3000mAh', camera: '12MP' },
};

describe('ProductDetail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useCart.mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    });

    getProductById.mockResolvedValue(mockProduct);
  });

  test('Debe renderizar el producto correctamente', async () => {
    render(<ProductDetail product={mockProduct} />);

    const productNames = await screen.findAllByText('iPhone 13');

    expect(productNames.length).toBeGreaterThan(0);
  });

  test('Debe cambiar el almacenamiento al hacer clic en un botón', async () => {
    render(<ProductDetail product={mockProduct} />);

    const storageButton = screen.getByText('256GB');
    fireEvent.click(storageButton);

    await waitFor(() => {
      expect(screen.getByText('699 EUR')).toBeInTheDocument();
    });
  });

  test('El botón "AÑADIR" debe estar deshabilitado si no se ha seleccionado almacenamiento', async () => {
    render(<ProductDetail product={mockProduct} />);

    const addToCartButton = screen.getByText('AÑADIR');
    expect(addToCartButton).toBeDisabled();
  });

  test('Debe agregar el producto al carrito y redirigir a "/cart"', async () => {
    const mockAddToCart = jest.fn();
    useCart.mockReturnValue({ addToCart: mockAddToCart });

    render(<ProductDetail product={mockProduct} />);

    // Seleccionar almacenamiento
    const storageButton = screen.getByText('128GB');
    fireEvent.click(storageButton);

    // Hacer clic en "AÑADIR"
    const addToCartButton = screen.getByText('AÑADIR');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(
        mockProduct,
        expect.any(Object),
        expect.any(Object)
      );
      expect(Router.push).toHaveBeenCalledWith('/cart');
    });
  });

  test('Debe volver atrás al hacer clic en el botón "BACK"', async () => {
    render(<ProductDetail product={mockProduct} />);

    const backButton = screen.getByText('BACK');
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(Router.back).toHaveBeenCalled();
    });
  });

  test('getServerSideProps debe devolver `notFound: true` si el producto no existe', async () => {
    getProductById.mockResolvedValue(null);

    const context = { params: { id: 'unknown' } };
    const result = await getServerSideProps(context);

    expect(result).toEqual({ notFound: true });
  });

  test('getServerSideProps debe devolver `props` con el producto si existe', async () => {
    getProductById.mockResolvedValue(mockProduct);

    const context = { params: { id: 'APL-IP13-128' } };
    const result = await getServerSideProps(context);

    expect(result).toEqual({ props: { product: mockProduct } });
  });
});
