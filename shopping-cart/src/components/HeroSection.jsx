import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  hero: {
    width: '100%',
    padding: '1.2rem 2rem 2rem 2rem',
    marginTop: '-2rem',
    background: 'linear-gradient(135deg, #232b3e 80%, #111827 100%)',
    borderRadius: '18px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.10)',
    color: '#fff',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    minHeight: '370px',
    animation: 'fadeInHero 1.1s cubic-bezier(.23,1.01,.32,1) both'
  },
  badge: {
    background: 'linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)',
    color: '#232b3e',
    fontWeight: 'bold',
    fontSize: '1rem',
    borderRadius: '20px',
    padding: '0.3rem 1.2rem',
    marginBottom: '1.1rem',
    letterSpacing: '1px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    display: 'inline-block',
    textTransform: 'uppercase',
    animation: 'badgePulse 1.5s infinite'
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#FFD700',
    textShadow: '0 2px 12px #181e29',
    letterSpacing: '1px',
    lineHeight: 1.1,
    background: 'linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'shine 2.5s linear infinite'
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: '#e5e7eb',
    maxWidth: 600,
    lineHeight: 1.5,
    animation: 'fadeInUp 1.2s 0.3s both'
  },
  ctaGroup: {
    display: 'flex',
    gap: '1.2rem',
    marginBottom: '1.2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    animation: 'fadeInUp 1.2s 0.5s both'
  },
  button: {
    backgroundColor: '#FFD700',
    color: '#181e29',
    padding: '1rem 2.3rem',
    borderRadius: '12px',
    fontWeight: 'bold',
    border: 'none',
    fontSize: '1.22rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    transition: 'background 0.22s, color 0.22s, transform 0.18s, box-shadow 0.18s',
    outline: 'none',
    marginBottom: '0.2rem',
    animation: 'bounceIn 0.8s 0.7s both'
  },
  buttonHover: {
    backgroundColor: '#232b3e',
    color: '#FFD700',
    border: '2px solid #FFD700',
    transform: 'scale(1.07)',
    boxShadow: '0 4px 16px #FFD70055'
  },
  buttonSecondary: {
    backgroundColor: '#232b3e',
    color: '#FFD700',
    border: '2px solid #FFD700',
    fontWeight: 'bold',
    animation: 'fadeInUp 1.2s 0.8s both'
  },
  promo: {
    marginTop: '0.5rem',
    fontSize: '1.18rem',
    color: '#FFD700',
    fontWeight: 'bold',
    background: 'rgba(24,30,41,0.85)',
    borderRadius: '8px',
    padding: '0.5rem 1.2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    letterSpacing: '0.5px',
    display: 'inline-block',
    animation: 'fadeInUp 1.2s 1s both'
  },
  timer: {
    marginTop: '0.7rem',
    fontSize: '1.1rem',
    color: '#fff',
    background: 'linear-gradient(90deg, #FFD700 60%, #d32f2f 100%)',
    borderRadius: '8px',
    padding: '0.3rem 1.1rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    display: 'inline-block',
    boxShadow: '0 2px 8px #FFD70033',
    animation: 'fadeInUp 1.2s 1.2s both'
  },
  trust: {
    marginTop: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    fontSize: '1.05rem',
    color: '#e5e7eb',
    opacity: 0.92,
    justifyContent: 'center',
    animation: 'fadeInUp 1.2s 1.4s both'
  },
  trustIcon: {
    fontSize: '1.5rem',
    color: '#FFD700',
  },
  bgPhone: {
    position: 'absolute',
    right: '-60px',
    bottom: '-30px',
    width: '220px',
    opacity: 0.13,
    pointerEvents: 'none',
    zIndex: 0,
    filter: 'blur(0.5px)',
  },
  bgPattern: {
    position: 'absolute',
    left: '-80px',
    top: '-60px',
    width: '320px',
    height: '320px',
    background: 'radial-gradient(circle, #FFD70022 0%, transparent 70%)',
    zIndex: 0,
    pointerEvents: 'none',
  }
};

// Animaciones globales
if (typeof window !== 'undefined' && !window.__hero_animations__) {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeInHero {
      0% { opacity: 0; transform: scale(0.97) translateY(40px);}
      100% { opacity: 1; transform: scale(1) translateY(0);}
    }
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(30px);}
      100% { opacity: 1; transform: translateY(0);}
    }
    @keyframes badgePulse {
      0% { box-shadow: 0 0 0 0 #FFD70077; }
      70% { box-shadow: 0 0 0 10px #FFD70000; }
      100% { box-shadow: 0 0 0 0 #FFD70000; }
    }
    @keyframes shine {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
    @keyframes bounceIn {
      0% { transform: scale(0.8);}
      60% { transform: scale(1.08);}
      100% { transform: scale(1);}
    }
  `;
  document.head.appendChild(style);
  window.__hero_animations__ = true;
}

const HeroSection = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [timer, setTimer] = useState(3600); // 1 hora

  // Temporizador de urgencia
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section style={styles.hero} aria-label="Sección principal de ofertas">
      <div style={styles.bgPattern}></div>
      <span style={styles.badge} aria-label="Oferta exclusiva online">Oferta exclusiva online</span>
      <h1 style={styles.title}>
        ¡Estrena el <span style={{ color: '#fff', WebkitTextFillColor: '#fff', WebkitBackgroundClip: 'unset' }}>mejor celular</span> hoy!
      </h1>
      <p style={styles.subtitle}>
        Aprovecha descuentos únicos y recibe tu smartphone en 24h. Compra seguro, recibe rápido y disfruta tecnología de punta con garantía extendida.<br />
        <span style={{ color: '#FFD700', fontWeight: 600 }}>¡Solo por tiempo limitado!</span>
      </p>
      <div style={styles.ctaGroup}>
        <button
          style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => navigate('/')}
          aria-label="Explorar catálogo"
        >
          Explorar Catálogo
        </button>
        <button
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={() => navigate('/favorites')}
          aria-label="Ver favoritos"
        >
          ❤️ Favoritos
        </button>
        <button
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={() => navigate('/cart')}
          aria-label="Ir al carrito"
        >
          🛒 Ir al Carrito
        </button>
      </div>
      <div style={styles.promo}>
        🔥 ¡Hasta 50% de descuento y envío gratis 24h!
      </div>
      <div style={styles.timer}>
        ⏰ Oferta termina en: <b>{formatTime(timer)}</b>
      </div>
      <div style={styles.trust}>
        <span style={styles.trustIcon}>🔒</span> Compra protegida
        <span style={styles.trustIcon}>🚚</span> Entrega rápida
        <span style={styles.trustIcon}>⭐</span> 98% clientes felices
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
        alt="Celular decorativo"
        style={styles.bgPhone}
        draggable={false}
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;