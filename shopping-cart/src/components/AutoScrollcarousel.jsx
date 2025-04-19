import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.jsx';

const AutoScrollCarousel = ({ title, products }) => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const speed = 0.7;
    let animationId;

    const scroll = () => {
      if (!isPaused) {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += speed;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const duplicatedProducts = [...products, ...products];

  const styles = {
    wrapper: {
      maxWidth: '1280px',
      margin: '3rem auto',
      padding: '0 30px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#1F2937',
      borderLeft: '4px solid #3B82F6',
      paddingLeft: '12px',
    },
    scrollContainer: {
      display: 'flex',
      overflowX: 'hidden',
      gap: '1.5rem',
      paddingBottom: '1rem',
    },
    item: {
      flex: '0 0 auto',
      scrollSnapAlign: 'start',
    },
  };

  return (
    <section style={styles.wrapper}>
      <h2 style={styles.title}>{title}</h2>
      <div
        ref={carouselRef}
        style={styles.scrollContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedProducts.map((product, idx) => (
          <div key={idx} style={styles.item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AutoScrollCarousel;
