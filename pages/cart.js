import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from '@/styles/Cart.module.css';
import Layout from '@/components/Layout';
import Button from '@/components/Button';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Layout>
      <div className={styles.cartContainer}>
        <h2>CART ({cart.length})</h2>
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemImage}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cartImage}
                  />
                </div>
                <div className={styles.itemDetails}>
                  <div>{item.name}</div>
                  <div className={styles.itemDetailsDesc}>
                    {item.storage?.capacity} | {item.color?.name}
                  </div>
                  <div className={styles.itemDetailsPrice}>
                    {item.price} EUR
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.cartSummary__wrapper}>
          {cart?.length > 0 && (
            <div>
              <span
                data-testid="cart-total-mobile"
                className={styles.cartTotalMobile}
              >
                <span>TOTAL</span>
                <span>{totalPrice} EUR</span>
              </span>
            </div>
          )}
          <div className={styles.cartSummary}>
            <Link href="/">
              <Button variant="outline">CONTINUE SHOPPING</Button>
            </Link>
            {cart?.length > 0 && (
              <div className={styles.cartSummaryRigth}>
                <span
                  data-testid="cart-total-desktop"
                  className={styles.cartTotalDesktop}
                >
                  <span>TOTAL</span>
                  <span>{totalPrice} EUR</span>
                </span>
                <Button>PAY</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
