import React from 'react';
import styles from '@/styles/Specifications.module.css';

export default function Specifications({ specs, brand, name, description }) {
  return (
    <div className={styles.container}>
      <h2>SPECIFICATIONS</h2>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.cell}>BRAND</div>
          <div className={styles.cell}>{brand}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>NAME</div>
          <div className={styles.cell}>{name}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>DESCRIPTION</div>
          <div className={styles.cell}>{description}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>SCREEN</div>
          <div className={styles.cell}>{specs.screen}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>RESOLUTION</div>
          <div className={styles.cell}>{specs.resolution}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>PROCESSOR</div>
          <div className={styles.cell}>{specs.processor}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>MAIN CAMERA</div>
          <div className={styles.cell}>{specs.mainCamera}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>SELFIE CAMERA</div>
          <div className={styles.cell}>{specs.selfieCamera}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>BATTERY</div>
          <div className={styles.cell}>{specs.battery}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>OS</div>
          <div className={styles.cell}>{specs.os}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>SCREEN REFRESH RATE</div>
          <div className={styles.cell}>{specs.screenRefreshRate}</div>
        </div>
      </div>
    </div>
  );
}
