import React from 'react';
import './app.css'
import MenuBar from './pages/menu-bar';
import CategoriesList from './pages/category-list';
import ProductCardList from './pages/product-card-list';
import SubCategoriesList from './pages/sub-category-list';

function App() {
  return (
    <div>
      <MenuBar />
      <CategoriesList />
      <SubCategoriesList />
      <ProductCardList />
    </div>

  )
}

export default App
