import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addFav, removeFav, isFav } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const fav = isFav(product.id);
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <h4>{product.name}</h4>
        <p>${product.price}</p>
      </Link>
      <div className="card-actions">
        <button onClick={() => fav ? removeFav(product.id) : addFav(product)}>
          {fav ? '💔' : '❤️'}
        </button>
        <button onClick={() => addToCart(product)}>🛒</button>
      </div>
    </div>
  );
}