import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

// Dark mode hook
function useDarkMode() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    document.body.style.background = dark
      ? 'linear-gradient(135deg, #181e29 70%, #232b3e 100%)'
      : 'linear-gradient(135deg, #fffbe6 70%, #FFD700 100%)';
  }, [dark]);
  return [dark, setDark];
}

export default function Header() {
  const { cart, setSearchQuery } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState('');
  const [dark, setDark] = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  // Calcula el total de productos en el carrito (sumando cantidades)
  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
    : typeof cart === 'object'
      ? Object.values(cart).reduce((acc, qty) => acc + (typeof qty === 'number' ? qty : 1), 0)
      : 0;

  // Limpia búsqueda al cambiar de página
  useEffect(() => {
    setSearch('');
    setSearchQuery('');
  }, [location.pathname, setSearchQuery]);

  // Animación de badge
  const [cartBump, setCartBump] = useState(false);
  useEffect(() => {
    if (cartCount > 0) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const styles = {
    header: {
      background: dark
        ? 'linear-gradient(90deg, #232b3e 70%, #111827 100%)'
        : 'linear-gradient(90deg, #fffbe6 70%, #FFD700 100%)',
      boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
      padding: '0.7rem 2.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: dark ? '#fff' : '#232b3e',
      borderRadius: '0 0 18px 18px',
      minHeight: '80px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: `2px solid ${dark ? '#FFD700' : '#232b3e'}`,
      gap: '2rem',
      transition: 'background 0.3s, color 0.3s'
    },
    logo: {
      fontSize: '2.1rem',
      fontWeight: 'bold',
      color: '#FFD700',
      letterSpacing: '1px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textShadow: '0 2px 8px #181e29',
      userSelect: 'none',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    nav: {
      display: 'flex',
      gap: '2.2rem',
      alignItems: 'center',
      fontSize: '1.08rem',
    },
    link: {
      color: dark ? '#fff' : '#232b3e',
      textDecoration: 'none',
      position: 'relative',
      fontWeight: 500,
      padding: '6px 14px',
      borderRadius: '8px',
      transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      outline: 'none'
    },
    linkHover: {
      background: '#FFD700',
      color: '#232b3e',
      boxShadow: '0 2px 8px #FFD70055'
    },
    badge: {
      position: 'absolute',
      top: '-7px',
      right: '-7px',
      backgroundColor: '#FFD700',
      borderRadius: '50%',
      fontSize: '0.8rem',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#232b3e',
      fontWeight: 'bold',
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
      border: '2px solid #fff',
      animation: cartBump ? 'bump 0.4s' : 'none'
    },
    searchBox: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      margin: '0 2rem',
      maxWidth: 420,
      background: dark ? '#232b3e' : '#fffbe6',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
      padding: '0.2rem 1rem',
      border: `2px solid #FFD700`,
      transition: 'border 0.2s, background 0.3s'
    },
    searchInput: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      color: dark ? '#fff' : '#232b3e',
      fontSize: '1.1rem',
      padding: '0.7rem 0.5rem',
      outline: 'none',
    },
    darkToggle: {
      marginLeft: 18,
      cursor: 'pointer',
      fontSize: '1.3rem',
      background: 'none',
      border: 'none',
      color: dark ? '#FFD700' : '#232b3e',
      transition: 'color 0.3s'
    }
  };

  // Animación bump para badge
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bump {
        0% { transform: scale(1); }
        10% { transform: scale(1.2); }
        30% { transform: scale(0.95); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Accesibilidad: enter para buscar
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header style={styles.header} aria-label="Barra de navegación principal">
      <Link to="/" style={styles.logo} tabIndex={0} aria-label="Ir a inicio">
        <span role="img" aria-label="logo">📱</span>
        Celular<span style={{ color: dark ? '#fff' : '#232b3e', fontWeight: 300 }}>Store</span>
      </Link>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setSearchQuery(e.target.value);
          }}
          style={styles.searchInput}
          aria-label="Buscar productos"
          onKeyDown={handleKeyDown}
        />
      </div>
      <nav style={styles.nav} aria-label="Navegación">
        <Link
          to="/favorites"
          style={{
            ...styles.link,
            ...(hovered === 'fav' ? styles.linkHover : {})
          }}
          onMouseEnter={() => setHovered('fav')}
          onMouseLeave={() => setHovered('')}
          tabIndex={0}
          aria-label={`Favoritos (${favorites.length})`}
        >
          ❤️ Favoritos
          {favorites.length > 0 && <span style={styles.badge}>{favorites.length}</span>}
        </Link>
        <Link
          to="/cart"
          style={{
            ...styles.link,
            ...(hovered === 'cart' ? styles.linkHover : {})
          }}
          onMouseEnter={() => setHovered('cart')}
          onMouseLeave={() => setHovered('')}
          tabIndex={0}
          aria-label={`Carrito (${cartCount})`}
        >
          🛒 Carrito
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
        <button
          style={styles.darkToggle}
          onClick={() => setDark(d => !d)}
          aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          title={dark ? 'Modo claro' : 'Modo oscuro'}
        >
          {dark ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
}
