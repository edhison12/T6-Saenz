import React, { useContext } from 'react';
import products from '../data/Products.jsx';
import ProductCard from './ProductCard.jsx';
import { CartContext } from '../context/CartContext.jsx';

export default function ProductGrid() {
  const { searchQuery } = useContext(CartContext);
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}