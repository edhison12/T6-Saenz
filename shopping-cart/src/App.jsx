import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ViewedProvider } from './context/ViewedContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import CartPage from './pages/CartPage.jsx';

export default function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <BrowserRouter>
          <ViewedProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="category/:categoryId" element={<CategoryPage />} />              
                <Route path="producto/:id" element={<ProductPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="cart" element={<CartPage />} />
              </Route>
            </Routes>
          </ViewedProvider>
        </BrowserRouter>
      </CartProvider>
    </FavoritesProvider>
  );
}