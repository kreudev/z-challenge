import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { ChevronLeft } from 'lucide-react';
import styles from '@/styles/ProductDetail.module.css';
import Layout from '@/components/Layout';
import Specifications from '@/components/Specifications';
import SimilarProducts from '@/components/SimilarProducts';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/services/api';

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [minimumPrice, setMinimumPrice] = useState('');

  function getMinimumPrice(storageOptions) {
    if (!storageOptions || storageOptions.length === 0) return null;

    return Math.min(...storageOptions.map((option) => option.price));
  }

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colorOptions[0]);
      setMinimumPrice(getMinimumPrice(product.storageOptions));
    }
  }, [product]);

  const handleAddCart = () => {
    addToCart(product, selectedColor, selectedStorage);
    Router.push('/cart');
  };

  const ProductDetailComponent = () => {
    return (
      <div className={styles.containerSpecification__wrapper}>
        <div className={styles.containerSpecification}>
          <div className={styles.productImage}>
            <img src={selectedColor.imageUrl} alt={product.name} />
          </div>

          <div className={styles.productDetails}>
            <div>
              <h1>{product.name}</h1>
              {!selectedStorage ? (
                <div className={styles.price}>From {minimumPrice} EUR</div>
              ) : (
                <div className={styles.price}>{selectedStorage.price} EUR</div>
              )}
            </div>

            <div className={styles.storageSection}>
              <h3>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</h3>
              <div className={styles.storageOptions}>
                {product.storageOptions.map((option) => (
                  <button
                    key={option.capacity}
                    className={
                      selectedStorage.capacity === option.capacity
                        ? styles.selected
                        : ''
                    }
                    onClick={() => setSelectedStorage(option)}
                  >
                    {option.capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.colorSection}>
              <h3>COLOR. PICK YOUR FAVOURITE.</h3>
              <div className={styles.colorOptions}>
                {product.colorOptions.map((color) => (
                  <button
                    key={color.name}
                    className={`${styles.colorCircle} ${
                      selectedColor.name === color.name
                        ? styles.selectedColor
                        : ''
                    }`}
                    style={{ backgroundColor: color.hexCode }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
              <div className={styles.colorSectionName}>
                {selectedColor.name}
              </div>
            </div>

            <button
              onClick={handleAddCart}
              className={styles.addToCart}
              disabled={!selectedStorage}
            >
              AÑADIR
            </button>
          </div>
          <Specifications
            specs={product.specs}
            brand={product.brand}
            name={product.name}
            description={product.description}
          />
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div
        onClick={() => Router.back() || Router.push('/')}
        className={styles.backButton}
      >
        <ChevronLeft size="12" />
        <span>BACK</span>
      </div>
      <ProductDetailComponent />
      <SimilarProducts similarProducts={product.similarProducts} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const product = await getProductById(params.id);

    if (!product) {
      return { notFound: true }; // Página 404 si el producto no existe
    }

    return { props: { product } };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { notFound: true }; // Página 404 en caso de error
  }
}
