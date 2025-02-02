import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const { cart = [] } = useCart();

  return (
    <nav>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <img src="/logo.png" />
      </Link>
      <Link
        href="/cart"
        style={{
          textDecoration: 'none',
          color: 'black',
          alignItems: 'center',
          display: 'flex',
          fontSize: '16px',
        }}
      >
        <ShoppingBag size="16" />
        <span style={{ marginLeft: '5px' }}>{cart.length}</span>
      </Link>
    </nav>
  );
}
