import React, { useState, useEffect, useRef } from 'react';

const HEADER_HEIGHT = 72; // px
const SEPARACION = -31

const testimonials = [
  {
    text: "¡El mejor lugar para comprar mi nuevo celular! Llegó rápido y el soporte fue excelente.",
    author: "Ana G.",
    stars: 5
  },
  {
    text: "Precios increíbles y atención personalizada. ¡Repetiré sin duda!",
    author: "Carlos M.",
    stars: 5
  },
  {
    text: "Me asesoraron por WhatsApp y recibí mi equipo en 24h. ¡Gracias!",
    author: "Lucía R.",
    stars: 5
  }
];

const testimonialsWithStars = testimonials.map(t => ({
  ...t,
  stars: Math.floor(Math.random() * 5) + 1, // Genera de 1 a 5 estrellas aleatorias
}));

// Logos de pago seguro
const paymentLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/PayPal_2014_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2a/MercadoPago_logo.png"
];

const SidePromo = () => {
  // Testimonio rotativo
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx(idx => (idx + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Temporizador de promoción flash
  const [flashTime, setFlashTime] = useState(3600);
  useEffect(() => {
    const timer = setInterval(() => setFlashTime(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = s => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  };

  // Animación para el cupón
  const [couponAnim, setCouponAnim] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setCouponAnim(a => !a), 1200);
    return () => clearInterval(interval);
  }, []);

  // Compartir link
  const [shareMsg, setShareMsg] = useState('');
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMsg('¡Enlace copiado! Tú y tu amigo obtienen 20% OFF 🎉');
      setTimeout(() => setShareMsg(''), 3000);
    } catch {
      setShareMsg('No se pudo copiar el enlace');
      setTimeout(() => setShareMsg(''), 3000);
    }
  };

  return (
    <aside
      style={{
        background: 'linear-gradient(160deg, #181e29 80%, #232b3e 100%)',
        borderRadius: '18px',
        padding: '2.2rem 1.3rem',
        marginBottom: '2rem',
        marginTop: `${SEPARACION}px`,
        marginLeft: '-1.7rem',
        color: '#fff',
        minWidth: '260px',
        maxWidth: '320px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.7rem',
        position: 'sticky',
        top: `${HEADER_HEIGHT + SEPARACION}px`,
        zIndex: 20,
        transition: 'box-shadow 0.2s, top 0.2s'
      }}
    >
      {/* Promoción flash */}
      <div style={{
        background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
        color: '#181e29',
        borderRadius: '10px',
        padding: '0.8rem 1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        border: '2px solid #FFD700',
        fontSize: '1.13rem',
        letterSpacing: '0.5px'
      }}>
        <span style={{ fontWeight: 700, fontSize: '1.18rem' }}>⚡ Oferta Flash</span>: <span style={{ color: '#d32f2f', fontWeight: 700 }}>Hasta 90% OFF</span>
        <div style={{
          fontSize: '1.1rem',
          marginTop: '0.3rem',
          color: '#181e29',
          fontWeight: 700,
          letterSpacing: '1px'
        }}>
          ⏳ {formatTime(flashTime)} min
        </div>
      </div>

      {/* Compartir y referidos */}
      <div style={{
        background: '#232b3e',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '0.2rem',
        border: '1px solid #FFD70033',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.7rem'
      }}>
        <button
          onClick={handleShare}
          style={{
            background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
            color: '#181e29',
            border: 'none',
            borderRadius: '8px',
            padding: '0.7rem 1.2rem',
            fontWeight: 'bold',
            fontSize: '1.08rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            transition: 'background 0.2s, color 0.2s, transform 0.18s'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>🔗</span>
          Compartir y ganar 20% OFF
        </button>
        <div style={{
          color: '#FFD700',
          fontWeight: 600,
          fontSize: '1rem',
          minHeight: '1.2em',
          textAlign: 'center'
        }}>
          {shareMsg || '¡Invita a un amigo y ambos obtienen 20% de descuento en todos los productos!'}
        </div>
      </div>

      {/* Ventajas exclusivas */}
      <div style={{
        background: '#232b3e',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '0.2rem',
        border: '1px solid #FFD70033',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
      }}>
        <h3 style={{
          color: '#FFD700',
          marginBottom: '0.7rem',
          fontWeight: 700,
          fontSize: '1.15rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>Ventajas exclusivas</h3>
        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          lineHeight: '1.8',
          fontSize: '1.08rem',
          fontWeight: 500
        }}>
          <li>🚚 <b>Envío gratis 24h</b> a todo Perú</li>
          <li>🔒 <b>Pago seguro</b> con protección antifraude</li>
          <li>🎁 <b>Garantía extendida</b> hasta 12 meses</li>
          <li>✅ <b>Compra verificada</b> por MercadoPago</li>
        </ul>
      </div>

      {/* Testimonio rotativo con estrellas animadas */}
      <div style={{
        background: '#232b3e',
        borderRadius: '10px',
        padding: '1rem',
        fontSize: '0.97rem',
        fontStyle: 'italic',
        color: '#e5e7eb',
        minHeight: '90px',
        position: 'relative',
        border: '1px solid #FFD70033'
      }}>
        <button
          onClick={() => setTestimonialIdx(idx => (idx - 1 + testimonials.length) % testimonials.length)}
          style={{
            position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: '#FFD700', fontSize: '1.2rem', cursor: 'pointer'
          }}
          aria-label="Anterior"
        >‹</button>
        <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: '#FFD700', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px' }}>
          {'★'.repeat(testimonials[testimonialIdx].stars)}
        </div>
        <div style={{ textAlign: 'center' }}>
          “{testimonials[testimonialIdx].text}”
        </div>
        <div style={{ marginTop: '0.5rem', fontWeight: 500, color: '#FFD700', textAlign: 'center' }}>
          - {testimonials[testimonialIdx].author}
        </div>
        <button
          onClick={() => setTestimonialIdx(idx => (idx + 1) % testimonials.length)}
          style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: '#FFD700', fontSize: '1.2rem', cursor: 'pointer'
          }}
          aria-label="Siguiente"
        >›</button>
      </div>

      {/* Banner cupón animado */}
      <div style={{
        background: couponAnim
          ? 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)'
          : 'linear-gradient(90deg, #fffbe6 80%, #FFD700 100%)',
        color: '#181e29',
        borderRadius: '8px',
        padding: '0.7rem',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.13rem',
        boxShadow: couponAnim ? '0 4px 16px #FFD70055' : '0 2px 8px rgba(0,0,0,0.10)',
        border: '2px dashed #FFD700',
        letterSpacing: '0.5px',
        transition: 'background 0.5s, box-shadow 0.5s'
      }}>
        🎟️ Usa el cupón <span style={{ color: '#d32f2f', fontWeight: 700 }}>CELULARES5</span> y obtén <span style={{ color: '#d32f2f', fontWeight: 700 }}>5% OFF extra</span> <span style={{ fontSize: '1.2rem' }}>🔥</span>
      </div>

      {/* Compra protegida y satisfacción */}
      <div style={{
        background: '#232b3e',
        borderRadius: '8px',
        padding: '0.7rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        fontWeight: 'bold',
        fontSize: '1.08rem',
        border: '1px solid #FFD70033',
        justifyContent: 'center'
      }}>
        <span style={{ fontSize: '1.3rem' }}>🛡️</span>
        Compra protegida &nbsp;|&nbsp; <span style={{ color: '#FFD700' }}>98% clientes felices</span>
      </div>

      {/* Sellos de confianza */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '0.5rem',
        margin: '0.5rem 0'
      }}>
        {paymentLogos.map((logo, i) => (
          <img key={i} src={logo} alt="Pago seguro" style={{ height: 24, background: '#fff', borderRadius: 4, padding: 2 }} />
        ))}
      </div>

      {/* Botón WhatsApp */}
      <a
        href="https://wa.me/51999999999"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(90deg, #25D366 80%, #128C7E 100%)',
          color: '#fff',
          borderRadius: '8px',
          padding: '1rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          fontSize: '1.15rem',
          transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10), 0 0 0 #25D366'
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = 'linear-gradient(90deg, #128C7E 80%, #25D366 100%)';
          e.currentTarget.style.transform = 'scale(1.07)';
          e.currentTarget.style.boxShadow = '0 4px 16px #25D36655';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'linear-gradient(90deg, #25D366 80%, #128C7E 100%)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10), 0 0 0 #25D366';
        }}
      >
        <span style={{ fontSize: '1.3rem' }}>💬</span> Soporte WhatsApp <span style={{ fontSize: '1.1rem', marginLeft: 4, color: '#FFD700' }}>¡Responde en minutos!</span>
      </a>

      {/* NUEVO: Preguntas frecuentes */}
      <div style={{
        background: '#232b3e',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '0.2rem',
        border: '1px solid #FFD70033',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
      }}>
        <h3 style={{
          color: '#FFD700',
          marginBottom: '0.7rem',
          fontWeight: 700,
          fontSize: '1.08rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>Preguntas frecuentes</h3>
        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          lineHeight: '1.7',
          fontSize: '1.01rem',
          fontWeight: 500
        }}>
          <li>📦 ¿Cuánto tarda el envío?<br /><span style={{ color: '#FFD700' }}>24h a Lima y 48h provincias</span></li>
          <li>💳 ¿Qué métodos de pago aceptan?<br /><span style={{ color: '#FFD700' }}>Tarjeta, Yape, Plin, PagoEfectivo</span></li>
          <li>🔄 ¿Puedo cambiar/devolver?<br /><span style={{ color: '#FFD700' }}>Sí, hasta 7 días después de recibir</span></li>
        </ul>
      </div>

      {/* NUEVO: Garantía y soporte */}
      <div style={{
        background: '#232b3e',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '0.2rem',
        border: '1px solid #FFD70033',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
      }}>
        <h3 style={{
          color: '#FFD700',
          marginBottom: '0.7rem',
          fontWeight: 700,
          fontSize: '1.08rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>Garantía y soporte</h3>
        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          lineHeight: '1.7',
          fontSize: '1.01rem',
          fontWeight: 500
        }}>
          <li>🛠️ <b>Soporte técnico</b> gratuito 12 meses</li>
          <li>📱 <b>Celulares 100% originales</b></li>
          <li>🏆 <b>Más de 10,000 ventas verificadas</b></li>
        </ul>
      </div>

      {/* NUEVO: Contacto directo */}
      <div style={{
        background: '#232b3e',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '0.2rem',
        border: '1px solid #FFD70033',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        textAlign: 'center'
      }}>
        <div style={{ color: '#FFD700', fontWeight: 700, marginBottom: 6 }}>¿Dudas? ¡Contáctanos!</div>
        <div style={{ color: '#e5e7eb', fontSize: '1.05rem', marginBottom: 4 }}>
          <span style={{ fontWeight: 600 }}>Correo:</span> ventas@tucelular.pe
        </div>
        <div style={{ color: '#e5e7eb', fontSize: '1.05rem' }}>
          <span style={{ fontWeight: 600 }}>Teléfono:</span> (01) 234-5678
        </div>
      </div>

      {/* NUEVO: Sello de confianza */}
      <div style={{
        background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
        color: '#181e29',
        borderRadius: '10px',
        padding: '0.8rem 1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        border: '2px solid #FFD700',
        fontSize: '1.13rem',
        letterSpacing: '0.5px'
      }}>
        <span style={{ fontWeight: 700, fontSize: '1.18rem' }}>🏅 Tienda verificada en Perú</span>
      </div>
    </aside>
  );
};

export default SidePromo;