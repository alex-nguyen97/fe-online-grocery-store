import React from 'react';
import './app.css'
import MenuBar from './pages/menu-bar';
import CategoriesList from './pages/category-list';
import ProductCardList from './pages/product-card-list';
import ShoppingCart from './pages/shopping-cart';
import DeliveryDetail from './pages/delivery-detail';

function App() {
  return (
    <div>
      <MenuBar />
      <CategoriesList />
      <ProductCardList />
      <ShoppingCart />
      <DeliveryDetail
        showModal={false}
        handleClose={() => { }}
        handleSubmitOrder={() => { }}
      />
    </div>

  )
}

export default App
