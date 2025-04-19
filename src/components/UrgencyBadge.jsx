import React, { useEffect, useState } from 'react';

export default function UrgencyBadge({ initialStock = 3, durationSec = 7200 }) {
  const [stock, setStock] = useState(initialStock);
  const [timeLeft, setTimeLeft] = useState(durationSec);

  // Cuenta regresiva
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Reducir stock aleatoriamente
  useEffect(() => {
    const iv = setInterval(() => {
      setStock(s => Math.max(1, s - Math.floor(Math.random() * 2)));
    }, 15000);
    return () => clearInterval(iv);
  }, []);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  return (
    <div style={{ color: '#d32f2f', fontWeight: 'bold', margin: '10px 0' }}>
      🔥 Sólo {stock} unidades • Oferta termina en {mm}:{ss}
    </div>
  );
}