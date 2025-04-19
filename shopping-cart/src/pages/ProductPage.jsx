import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/Products.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  if (!product) return <div style={{ color: '#fff', padding: 40 }}>Producto no encontrado</div>;

  const isFav = favorites.includes(product.id);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #232b3e 70%, #111827 100%)',
      minHeight: '100vh',
      padding: '3rem 0',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#181e29',
        borderRadius: 24,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.10)',
        color: '#fff',
        display: 'flex',
        gap: '3rem',
        padding: '2.5rem 3rem',
        maxWidth: 1100,
        width: '100%'
      }}>
        {/* Imagen principal */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={product.image} alt={product.name} style={{
            width: 320, height: 320, objectFit: 'contain', borderRadius: 18, background: '#232b3e', marginBottom: 16
          }} />
        </div>
        {/* Info principal */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{
              background: 'linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)',
              color: '#232b3e',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '20px',
              padding: '0.3rem 1.2rem',
              marginRight: 12,
              letterSpacing: '1px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}>
              {product.discount > 0 ? `-${Math.round(product.discount * 100)}% OFF` : '¡Nuevo!'}
            </span>
            <span style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              color: '#FFD700',
              textShadow: '0 2px 12px #181e29',
              letterSpacing: '1px'
            }}>{product.name}</span>
          </div>
          <div style={{ fontSize: '1.2rem', color: '#e5e7eb', marginBottom: 8 }}>
            {product.description}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#FFD700'
            }}>
              S/ {(product.price - (product.price * product.discount)).toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span style={{
                textDecoration: 'line-through',
                color: '#e5e7eb',
                fontSize: '1.2rem'
              }}>
                S/ {product.price}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: 8 }}>
            <button
              onClick={() => addToCart(product)}
              style={{
                background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
                color: '#181e29',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2.3rem',
                fontWeight: 'bold',
                fontSize: '1.22rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                marginBottom: 12,
                transition: 'background 0.22s, color 0.22s, transform 0.18s'
              }}
            >Comprar ahora</button>
            <button
              onClick={() => isFav ? removeFavorite(product.id) : addFavorite(product.id)}
              style={{
                background: isFav
                  ? 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)'
                  : 'linear-gradient(90deg, #232b3e 80%, #181e29 100%)',
                color: isFav ? '#181e29' : '#FFD700',
                border: '2px solid #FFD700',
                borderRadius: '12px',
                padding: '1rem 2.3rem',
                fontWeight: 'bold',
                fontSize: '1.22rem',
                cursor: 'pointer',
                boxShadow: isFav ? '0 2px 8px #FFD70055' : '0 2px 8px rgba(0,0,0,0.10)',
                marginBottom: 12,
                transition: 'background 0.22s, color 0.22s, transform 0.18s'
              }}
            >
              {isFav ? '★ Favorito' : '☆ Favorito'}
            </button>
          </div>
          {/* Beneficios rápidos */}
          <div style={{
            display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginTop: 8
          }}>
            <span style={{ background: '#232b3e', borderRadius: 8, padding: '0.5rem 1rem', color: '#FFD700', fontWeight: 600 }}>🚚 Envío gratis 24h</span>
            <span style={{ background: '#232b3e', borderRadius: 8, padding: '0.5rem 1rem', color: '#FFD700', fontWeight: 600 }}>🔒 Pago seguro</span>
            <span style={{ background: '#232b3e', borderRadius: 8, padding: '0.5rem 1rem', color: '#FFD700', fontWeight: 600 }}>🎁 Garantía 12 meses</span>
            <span style={{ background: '#232b3e', borderRadius: 8, padding: '0.5rem 1rem', color: '#FFD700', fontWeight: 600 }}>✅ Compra verificada</span>
          </div>
          {/* Testimonio */}
          <div style={{
            marginTop: 24,
            background: '#232b3e',
            borderRadius: 10,
            padding: '1rem',
            color: '#FFD700',
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
          }}>
            <span>⭐️⭐️⭐️⭐️⭐️ “Excelente atención y producto, llegó en menos de 24h.”</span>
            <span style={{ color: '#fff', fontWeight: 400, marginLeft: 8 }}>- Cliente verificado</span>
          </div>
        </div>
      </div>
    </div>
  );
}