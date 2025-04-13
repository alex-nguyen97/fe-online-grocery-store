import React from "react";
import MenuBar from "../containers/menu-bar";
import ProductCardList from "../containers/product-card-list";
import ShoppingCart from "../containers/shopping-cart";
import DeliveryDetail from "../containers/delivery-detail";
function ProductPage() {
    return (
        <div>
            <MenuBar />
            <ProductCardList />
            <ShoppingCart />
            <DeliveryDetail />
        </div>
    );
}
export default ProductPage;