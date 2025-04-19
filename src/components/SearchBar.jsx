import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Buscar productos..."
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      padding: '0.6rem 1rem',
      borderRadius: '8px',
      border: 'none',
      background: '#232b3e',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none',
      boxShadow: value ? '0 0 0 2px #FFD700' : undefined,
      transition: 'box-shadow 0.2s'
    }}
  />
);

export default SearchBar;