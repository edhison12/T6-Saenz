import React from 'react';

const Footer = () => {
  const style = {
    container: {
      backgroundColor: '#111827',
      color: '#d1d5db',
      textAlign: 'center',
      padding: '1.5rem 0',
      fontSize: '0.9rem',
      marginTop: 'auto',
      borderTop: '1px solid #374151',
    },
    links: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
    },
    link: {
      color: '#ffd700',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <footer style={style.container}>
      <p>© {new Date().getFullYear()} CelularStore. Todos los derechos reservados.</p>
      <div style={style.links}>
        <a href="#about" style={style.link}>Sobre Nosotros</a>
        <a href="#contact" style={style.link}>Contacto</a>
        <a href="#terms" style={style.link}>Términos y Condiciones</a>
      </div>
    </footer>
  );
};

export default Footer;
