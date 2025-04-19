import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/Products';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';

export default function ProductPage() {
  const { productId } = useParams();
  const product = products.find(p=>p.id===productId);
  const { addFav, removeFav, isFav } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  if(!product) return <p>Producto no encontrado.</p>;
  const fav = isFav(product.id);
  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <button onClick={()=> addToCart(product)}>🛒 Agregar al Carrito</button>
        <button onClick={()=> fav ? removeFav(product.id) : addFav(product)}>
          {fav? '💔 Quitar Favorito':'❤️ Favorito'}
        </button>
      </div>
    </div>
  );
}