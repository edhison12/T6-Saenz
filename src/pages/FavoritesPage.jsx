import React from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import products from '../data/Products.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoritos = products.filter(p => favorites.includes(p.id));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #181e29 70%, #232b3e 100%)',
        padding: '0 0 4rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          margin: '3rem auto 0 auto',
          background: 'rgba(24,30,41,0.98)',
          borderRadius: 28,
          boxShadow: '0 12px 40px #00000033, 0 2px 8px #FFD70022',
          padding: '2.5rem 2.5rem 2rem 2.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Banner de marketing */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 90,
            background: 'linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '2.1rem',
            color: '#181e29',
            letterSpacing: '2px',
            boxShadow: '0 2px 12px #FFD70044'
          }}
        >
          ⭐ Tus Favoritos: ¡No dejes que se agoten!
        </div>
        <div style={{ height: 90 }} />
        {/* Mensaje persuasivo */}
        <div
          style={{
            textAlign: 'center',
            color: '#FFD700',
            fontWeight: 700,
            fontSize: '1.35rem',
            marginBottom: '1.7rem',
            marginTop: '-0.7rem',
            letterSpacing: '1px',
            textShadow: '0 2px 8px #181e29'
          }}
        >
          ¡Estos productos vuelan! <span style={{ color: '#fff', fontWeight: 500 }}>Asegura tu descuento exclusivo antes que otro lo haga.</span>
        </div>
        {/* Si no hay favoritos */}
        {favoritos.length === 0 ? (
          <div
            style={{
              color: '#fff',
              fontSize: '1.25rem',
              textAlign: 'center',
              margin: '3rem 0 2rem 0',
              fontWeight: 500,
              background: 'rgba(35,43,62,0.85)',
              borderRadius: 16,
              padding: '2.5rem 1.5rem'
            }}
          >
            <span style={{ fontSize: '2.5rem', color: '#FFD700' }}>☆</span>
            <br />
            ¡Aún no tienes favoritos! Haz clic en <span style={{ color: '#FFD700', fontWeight: 700 }}>☆ Favorito</span> en cualquier producto para guardarlo aquí y recibir alertas de ofertas exclusivas.
          </div>
        ) : (
          <>
            {/* Urgencia y marketing */}
            <div
              style={{
                background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
                color: '#181e29',
                borderRadius: 14,
                padding: '1.1rem 1.5rem',
                fontWeight: 700,
                fontSize: '1.18rem',
                textAlign: 'center',
                marginBottom: '2.2rem',
                boxShadow: '0 2px 8px #FFD70033',
                letterSpacing: '1px'
              }}
            >
              <span style={{ fontWeight: 900, fontSize: '1.25rem' }}>⚡ Oferta Relámpago:</span> 
              &nbsp;¡Tus favoritos tienen <span style={{ color: '#d32f2f', fontWeight: 900 }}>descuento extra</span> solo por hoy! <span style={{ color: '#232b3e', fontWeight: 700 }}>¡No pierdas tu oportunidad!</span>
            </div>
            {/* Grid de productos favoritos */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                gap: '2.2rem',
                marginBottom: '2.5rem'
              }}
            >
              {favoritos.map(product => (
                <div key={product.id} style={{ position: 'relative' }}>
                  {/* Badge de urgencia */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
                      color: '#d32f2f',
                      fontWeight: 900,
                      fontSize: '1.01rem',
                      borderRadius: 8,
                      padding: '0.3rem 0.9rem',
                      boxShadow: '0 2px 8px #FFD70033',
                      zIndex: 2,
                      letterSpacing: '1px'
                    }}
                  >
                    ¡Quedan {product.stock}!
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {/* CTA final */}
            <div
              style={{
                background: '#232b3e',
                borderRadius: 14,
                padding: '1.5rem 1.5rem 1.2rem 1.5rem',
                color: '#FFD700',
                fontWeight: 700,
                fontSize: '1.18rem',
                textAlign: 'center',
                boxShadow: '0 2px 8px #FFD70022',
                marginTop: '1.5rem'
              }}
            >
              <span style={{ color: '#fff', fontWeight: 400 }}>
                ¿Listo para asegurar el mejor precio? <br />
                <span style={{ color: '#FFD700', fontWeight: 700 }}>¡Agrega tus favoritos al carrito y compra ahora!</span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}