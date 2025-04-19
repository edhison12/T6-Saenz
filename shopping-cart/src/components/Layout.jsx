import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    minHeight: '100vh',
  }
};

const Layout = () => (
  <>
    <Header />
    <div style={styles.container}>
      <Outlet />
    </div>
    <Footer />
  </>
);

export default Layout;