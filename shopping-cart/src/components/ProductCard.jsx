import React from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isFav = favorites.includes(product.id);

  return (
    <div
      style={{
        background: '#232b3e',
        borderRadius: 18,
        boxShadow: '0 4px 16px rgba(0,0,0,0.13)',
        padding: '1.7rem 1.2rem 1.3rem 1.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.13s, box-shadow 0.13s',
        border: isFav ? '2px solid #FFD700' : '2px solid transparent'
      }}
      onClick={e => {
        // Evita que el click en los botones dispare el navigate
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'svg') return;
        navigate(`/producto/${product.id}`);
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 32px #FFD70033';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)';
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: 120,
          height: 120,
          objectFit: 'contain',
          marginBottom: 14,
          borderRadius: 12,
          background: '#181e29'
        }}
      />
      <div style={{ fontWeight: 700, color: '#FFD700', fontSize: '1.13rem', marginBottom: 8, textAlign: 'center' }}>
        {product.name}
      </div>
      <div style={{ color: '#fff', marginBottom: 8, textAlign: 'center', fontSize: '1.01rem' }}>
        {product.description}
      </div>
      <div style={{ color: '#FFD700', fontWeight: 700, fontSize: '1.22rem', marginBottom: 8 }}>
        S/ {(product.price - (product.price * product.discount)).toFixed(2)}
      </div>
      <div style={{ display: 'flex', gap: '0.7rem', marginTop: 8 }}>
        <button
          onClick={e => {
            e.stopPropagation();
            addToCart(product);
          }}
          style={{
            background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
            color: '#181e29',
            border: 'none',
            borderRadius: '8px',
            padding: '0.7rem 1.3rem',
            fontWeight: 'bold',
            fontSize: '1.08rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            transition: 'background 0.2s, color 0.2s, transform 0.18s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #fffbe6 80%, #FFD700 100%)';
            e.currentTarget.style.transform = 'scale(1.07)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🛒 Añadir
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            isFav ? removeFavorite(product.id) : addFavorite(product.id);
          }}
          style={{
            background: isFav
              ? 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)'
              : 'linear-gradient(90deg, #232b3e 80%, #181e29 100%)',
            color: isFav ? '#181e29' : '#FFD700',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            padding: '0.7rem 1.3rem',
            fontWeight: 'bold',
            fontSize: '1.08rem',
            cursor: 'pointer',
            boxShadow: isFav ? '0 2px 8px #FFD70055' : '0 2px 8px rgba(0,0,0,0.10)',
            transition: 'background 0.2s, color 0.2s, transform 0.18s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = isFav
              ? 'linear-gradient(90deg, #fffbe6 80%, #FFD700 100%)'
              : 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)';
            e.currentTarget.style.color = '#181e29';
            e.currentTarget.style.transform = 'scale(1.07)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = isFav
              ? 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)'
              : 'linear-gradient(90deg, #232b3e 80%, #181e29 100%)';
            e.currentTarget.style.color = isFav ? '#181e29' : '#FFD700';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isFav ? '★ Favorito' : '☆ Favorito'}
        </button>
      </div>
    </div>
  );
}