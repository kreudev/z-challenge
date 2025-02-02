import React from 'react';
import styles from '@/styles/PhoneCard.module.css';

export default function PhoneCard({ phone, handleAction }) {
  return (
    <div onClick={handleAction} className={styles.phoneCard}>
      <div className={styles.phoneCard_image_wrapper}>
        <img
          className={styles.phoneCard__image}
          src={phone.imageUrl}
          alt={phone.name}
        />
      </div>
      <div className={styles.phoneCard_description_wrapper}>
        <div className={styles.phoneCard_description_item_left}>
          <div className={styles.phoneCard_description_brand}>
            {phone.brand}
          </div>
          <div className={styles.phoneCard_description_name}>{phone.name}</div>
        </div>
        <div className={styles.phoneCard_description_item_right}>
          <div>{phone.basePrice} EUR</div>
        </div>
      </div>
    </div>
  );
}
