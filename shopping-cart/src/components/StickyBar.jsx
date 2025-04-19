import React from 'react';
import SearchBar from './SearchBar.jsx';
import ShareDiscountButton from './ShareDiscountButton.jsx';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export default function StickyBar() {
  const { totalItems } = useContext(CartContext);
  return (
    <div className="sticky-bar">
      <SearchBar small />
      <Link to="/cart"><button>🛒 ({totalItems()})</button></Link>
      <Link to="/favorites"><button>❤️</button></Link>
      <ShareDiscountButton />
    </div>
  );
}