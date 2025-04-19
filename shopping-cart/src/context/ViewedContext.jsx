import React, { createContext, useState } from 'react';
export const ViewedContext = createContext();

export function ViewedProvider({ children }) {
  const [viewed, setViewed] = useState([]);
  const addViewed = (id) => {
    setViewed(prev => prev.includes(id) ? prev : [...prev, id]);
  };
  return (
    <ViewedContext.Provider value={{ viewed, addViewed }}>
      {children}
    </ViewedContext.Provider>
  );
}