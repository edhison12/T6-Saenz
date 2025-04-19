import React, { useContext } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import HorizontalSection from '../components/HorizontalSection.jsx';
import SidePromo from '../components/SidePromo.jsx';
import { ViewedContext } from '../context/ViewedContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import products from '../data/Products.jsx';

export default function HomePage() {
  const ofertas = products.filter(p => p.discount > 0);
  const destacados = products.slice(0, 10);
  const viewedContext = useContext(ViewedContext);
  const viewed = viewedContext ? viewedContext.viewed : [];
  const vistos = products.filter(p => viewed.includes(p.id));
  const { searchQuery } = useContext(CartContext);

  // Solo filtra por nombre
  const productosFiltrados = searchQuery && searchQuery.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : null;

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '2rem',
      padding: '2rem',
      backgroundColor: '#1f2937',
      color: '#f9fafb',
      minHeight: '100vh',
      alignItems: 'start', // <-- Añadido para sticky en grid
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    sidePromo: {
      alignSelf: 'start', // <-- Añadido para sticky en grid
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidePromo}>
        <SidePromo />
      </div>
      <main style={styles.main}>
        <HeroSection />
        {/* Si hay búsqueda, muestra solo los resultados filtrados */}
        {productosFiltrados
          ? (
            <HorizontalSection
              title={`Resultados de búsqueda (${productosFiltrados.length})`}
              products={productosFiltrados}
            />
          )
          : (
            <>
              <HorizontalSection
                title="🔥 Ofertas Limitadas"
                products={ofertas}
              />
              <HorizontalSection
                title="⭐ Destacados"
                products={destacados}
              />
              {vistos.length > 0 && (
                <HorizontalSection
                  title="👀 Vistos recientemente"
                  products={vistos}
                />
              )}
            </>
          )
        }
      </main>
    </div>
  );
}
