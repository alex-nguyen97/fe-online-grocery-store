import React from 'react';
import './app.css'

import HomePage from './pages/homepage';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/product-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
    </Routes>
  );
}

export default App;