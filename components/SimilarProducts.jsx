import React from 'react';
import Link from 'next/link';
import styles from '@/styles/SimilarProducts.module.css';
import PhoneCard from './PhoneCard';

export default function SimilarProducts({ similarProducts }) {
  if (!similarProducts || similarProducts.length === 0) return null;

  return (
    <div className={styles.similarProducts}>
      <h2>SIMILAR ITEMS</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.productGrid}>
          {similarProducts.map((product) => (
            <Link
              href={`/phone/${product.id}`}
              key={product.id}
              className={styles.productCard}
            >
              <PhoneCard phone={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
