import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useContext(CartContext);
  if (!cart.length) return <p>El carrito está vacío.</p>;
  return (
    <div>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <Link to={`/product/${item.id}`}>{item.name}</Link>
              <p>Qty: {item.qty}</p>
              <p>Subtotal: ${item.qty*item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total items: {totalItems()}</p>
      <p>Total: ${totalPrice()}</p>
      <button onClick={clearCart}>Vaciar Carrito</button>
    </div>
  );
}