import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// Crea Contexto
const CartContext = createContext();

// Hook personalizado para acceder al carrito
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage cuando se monta el componente
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Añadir teléfono al carrito
  const addToCart = (phone, color, storage) => {
    const newItem = {
      id: nanoid(),
      name: phone.name,
      image: color?.imageUrl,
      brand: phone.brand,
      color,
      storage,
      price: storage?.price,
    };

    setCart((prevCart) => [...prevCart, newItem]);
  };

  // Eliminar teléfono del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vaciar carrito completamente
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
