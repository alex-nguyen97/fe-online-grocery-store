import React from "react";
import MenuBar from "../containers/menu-bar";
import ProductCardList from "../containers/product-card-list";
function ProductPage() {
    return (
        <div>
            <MenuBar />
            <ProductCardList />
        </div>
    );
}
export default ProductPage;