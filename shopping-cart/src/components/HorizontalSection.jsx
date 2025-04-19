import React, { useEffect, useRef, useState, useMemo } from 'react';
import ProductCard from './ProductCard.jsx';

// Fisher-Yates shuffle
function shuffleProducts(products) {
  const arr = [...products];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function assignDiscounts(products) {
  let prods = products.map(p => ({ ...p }));
  const ninetyIndexes = [];
  while (prods.length > 0 && ninetyIndexes.length < 4) {
    const idx = Math.floor(Math.random() * prods.length);
    if (!ninetyIndexes.includes(idx)) ninetyIndexes.push(idx);
  }
  prods = prods.map((p, i) =>
    ninetyIndexes.includes(i)
      ? { ...p, discount: 0.9 }
      : { ...p, discount: p.discount ?? (Math.random() * 0.35 + 0.05).toFixed(2) * 1 }
  );
  return prods;
}

const MAX_PRODUCTS = 12;

const HorizontalSection = ({ title, products }) => {
  if (!products || products.length === 0) return null;

  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 horas
  const [showNinety, setShowNinety] = useState(false);

  const isBusqueda = title && title.toLowerCase().includes('búsqueda');

  // Solo mezcla y asigna descuentos una vez al montar, y solo si NO es búsqueda
  const preparedProducts = useMemo(() => {
    if (isBusqueda) return products.slice(0, MAX_PRODUCTS);
    const withDiscounts = assignDiscounts(products);
    return shuffleProducts(withDiscounts).slice(0, MAX_PRODUCTS);
    // eslint-disable-next-line
  }, [products, isBusqueda]);

  const filteredProducts = useMemo(() => {
    let arr = showNinety
      ? preparedProducts.filter(p => p.discount === 0.9)
      : preparedProducts;
    return arr.slice(0, MAX_PRODUCTS);
  }, [preparedProducts, showNinety]);

  if (!filteredProducts || filteredProducts.length === 0) return null;

  // Temporizador global
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Carrusel automático solo si hay más de 2 productos y no es búsqueda
  useEffect(() => {
    if (!carouselRef.current || filteredProducts.length <= 2 || isBusqueda) return;
    const carousel = carouselRef.current;
    const scrollSpeed = 2;
    let requestId;
    const autoScroll = () => {
      if (!isPaused) {
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += scrollSpeed;
        }
      }
      requestId = requestAnimationFrame(autoScroll);
    };
    requestId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(requestId);
  }, [isPaused, filteredProducts, isBusqueda]);

  // Animación de entrada para los productos
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(30px);}
        100% { opacity: 1; transform: translateY(0);}
      }
      @keyframes badgePulse {
        0% { box-shadow: 0 0 0 0 #FFD70077; }
        70% { box-shadow: 0 0 0 10px #FFD70000; }
        100% { box-shadow: 0 0 0 0 #FFD70000; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const styles = {
    section: {
      maxWidth: '1200px',
      margin: '1rem auto 0 auto',
      padding: '0 10px',
    },
    titleBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '0.2rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#FFD700',
      textAlign: 'center',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      margin: 0,
    },
    ninetyBtn: {
      background: showNinety ? '#FFD700' : '#222',
      color: showNinety ? '#222' : '#FFD700',
      border: '1.5px solid #FFD700',
      borderRadius: '8px',
      padding: '4px 14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s',
      boxShadow: showNinety ? '0 2px 8px #FFD70055' : 'none',
      outline: showNinety ? '2px solid #FFD700' : 'none'
    },
    carousel: {
      display: 'flex',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      gap: '1rem',
      position: 'relative',
      marginBottom: '0.2rem',
    },
    item: {
      flex: '0 0 auto',
      width: '320px',
      position: 'relative',
      marginBottom: '0.2rem',
      animation: 'fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both',
    },
    timer: {
      position: 'absolute',
      left: '50%',
      bottom: '10px',
      transform: 'translateX(-50%)',
      background: '#FFD700',
      color: '#222',
      padding: '4px 12px',
      borderRadius: '12px',
      fontWeight: 'bold',
      fontSize: '0.95rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      zIndex: 2,
      letterSpacing: '1px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    timerBar: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      height: 5,
      width: `${(timeLeft / 7200) * 100}%`,
      background: 'linear-gradient(90deg, #FFD700 60%, #d32f2f 100%)',
      borderRadius: '0 0 10px 10px',
      transition: 'width 1s linear',
      zIndex: 1
    },
    discountBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: '#FFD700',
      color: '#d32f2f',
      fontWeight: 'bold',
      borderRadius: '10px',
      padding: '3px 12px 3px 10px',
      fontSize: '1.05rem',
      zIndex: 3,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      animation: 'badgePulse 1.5s infinite'
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.titleBar}>
        <h2 style={styles.title}>{title}</h2>
        {!isBusqueda && (
          <button
            style={styles.ninetyBtn}
            onClick={() => setShowNinety(v => !v)}
            aria-pressed={showNinety}
            title="Ver solo productos con 90% OFF"
          >
            🔥 Ver solo 90% OFF
          </button>
        )}
      </div>
      <div
        ref={carouselRef}
        style={styles.carousel}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Carrusel de productos"
      >
        {filteredProducts.map((product, index) => (
          <div key={product.id || index} style={styles.item} tabIndex={0} aria-label={product.name}>
            {product.discount > 0 && (
              <div style={styles.discountBadge} title={`Descuento del ${Math.round(product.discount * 100)}%`}>
                🔥 -{Math.round(product.discount * 100)}%
              </div>
            )}
            <ProductCard product={product} />
            <div style={styles.timer}>
              ⏳ {formatTime(timeLeft)}
              <div style={styles.timerBar} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalSection;