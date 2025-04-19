import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import products from '../data/Products.jsx';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const productosEnCarrito = products.filter(p => cart[p.id]);
  const total = productosEnCarrito.reduce((acc, p) => acc + (p.price - (p.price * p.discount / 100)) * cart[p.id], 0);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #232b3e 70%, #111827 100%)',
      minHeight: '100vh',
      padding: '3rem 0'
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        background: '#181e29',
        borderRadius: 24,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.10)',
        padding: '2.5rem 3rem'
      }}>
        <h2 style={{ color: '#FFD700', fontSize: '2.2rem', marginBottom: 24 }}>🛒 Tu carrito</h2>
        {productosEnCarrito.length === 0 ? (
          <div style={{ color: '#fff', fontSize: '1.2rem' }}>Tu carrito está vacío.</div>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {productosEnCarrito.map(product => (
                <li key={product.id} style={{
                  display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 18, background: '#232b3e', borderRadius: 12, padding: '1rem 1.5rem'
                }}>
                  <img src={product.image} alt={product.name} style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8, background: '#181e29' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#FFD700', fontWeight: 700, fontSize: '1.15rem' }}>{product.name}</div>
                    <div style={{ color: '#fff', fontSize: '1.05rem' }}>Cantidad: {cart[product.id]}</div>
                  </div>
                  <div style={{ color: '#FFD700', fontWeight: 700, fontSize: '1.15rem' }}>
                    S/ {(product.price - (product.price * product.discount / 100)) * cart[product.id]}
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    style={{
                      background: '#d32f2f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.5rem 1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >Eliminar</button>
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: 32,
              fontSize: '1.5rem',
              color: '#FFD700',
              fontWeight: 700,
              textAlign: 'right'
            }}>
              Total: S/ {total.toFixed(2)}
            </div>
            <button
              onClick={clearCart}
              style={{
                marginTop: 18,
                background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
                color: '#181e29',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2.3rem',
                fontWeight: 'bold',
                fontSize: '1.22rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                transition: 'background 0.22s, color 0.22s, transform 0.18s'
              }}
            >Finalizar compra</button>
          </>
        )}
      </div>
    </div>
  );
}