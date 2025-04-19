import React, { useState } from 'react';

export default function ShareDiscountButton() {
  const [code, setCode] = useState(null);
  const handleShare = async () => {
    const coupon = 'SHARE5-' + Math.random().toString(36).slice(2,7).toUpperCase();
    setCode(coupon);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Obtén 5% OFF',
          text: 'Usa este código para 5% de descuento: ' + coupon,
          url: window.location.href
        });
      } catch {};
    } else {
      navigator.clipboard.writeText(coupon);
      alert('Código copiado: ' + coupon);
    }
  };

  return (
    <button onClick={handleShare} style={{ cursor: 'pointer', padding: '6px', background: 'none', border: '1px dashed #1976d2', borderRadius: '6px' }}>
      📤 Compartir y 5% OFF
      {code && <div style={{ marginTop: '4px' }}>Código: <strong>{code}</strong></div>}
    </button>
  );
}