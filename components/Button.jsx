import React from 'react';
import styles from '@/styles/Button.module.css';

const Button = ({ children, variant = 'default' }) => {
  const VARIANTS = {
    default: 'default',
    outline: 'outline',
  };

  return (
    <button className={`${styles.button} ${styles?.[VARIANTS?.[variant]]}`}>
      {children}
    </button>
  );
};

export default Button;
