import React from 'react';

export default function CartItem({ item, removeFromCart }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: '1px solid #ddd',
      }}
    >
      <img src={item.image} alt={item.name} width="50" />
      <p>
        {item.name} - {item.color} - {item.storage}GB
      </p>
      <p>${item.price}</p>
      <button onClick={() => removeFromCart(item.id)}>❌</button>
    </div>
  );
}
