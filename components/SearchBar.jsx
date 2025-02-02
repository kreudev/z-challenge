import React from 'react';
import styles from '@/styles/SearchBar.module.css';

export default function SearchBar({ search, setSearch }) {
  return (
    <div className={styles.searchBar__input_wrapper}>
      <input
        className={styles.searchBar__input}
        type="text"
        placeholder="Search for a smartphone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          style={{
            all: 'unset',
            right: '5px',
            position: 'absolute',
            cursor: 'pointer',
          }}
          size="14"
        >
          x
        </button>
      )}
    </div>
  );
}
