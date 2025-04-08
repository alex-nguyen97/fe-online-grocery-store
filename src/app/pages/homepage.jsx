import MenuBar from '../containers/menu-bar';
import CategoriesList from '../containers/category-list';
import ProductCardList from '../containers/product-card-list';
import ShoppingCart from '../containers/shopping-cart';
import DeliveryDetail from '../containers/delivery-detail';
import React from 'react';

function HomePage() {
    return (
        <div>
            <MenuBar />
            <CategoriesList />
            <ProductCardList />
            <ShoppingCart />
            <DeliveryDetail />
        </div>
    );
}

export default HomePage;