import React from 'react';
import { CartProvider } from '@/context/CartContext';
import '@/styles/globals.css';
import '@/styles/loader.css';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
