import React from 'react';
import './app.css'
import MenuBar from './pages/menu-bar';
import CategoriesList from './pages/category-list';
import ProductCardList from './pages/product-card-list';

function App() {
  return (
    <div>
      <MenuBar />
      <CategoriesList />
      <ProductCardList />
    </div>

  )
}

export default App
