import { React, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import VegetablesImage from '../../assets/vegetables.jpg';
import { defaultSubCategory, setSelectedSubCategory, setShoppingCart } from "../storeSlice";
import ToastNotification from "./toast-notification";

const products = [
    { id: 1, name: "Product 1", price: 10, image: VegetablesImage, quantity: 5 },
    { id: 2, name: "Product 2", price: 20, image: VegetablesImage, quantity: 8 },
    { id: 3, name: "Product 3", price: 30, image: VegetablesImage, quantity: 2 },
    { id: 4, name: "Product 4", price: 40, image: VegetablesImage, quantity: 7 },
    { id: 5, name: "Product 5", price: 50, image: VegetablesImage, quantity: 3 },
    { id: 6, name: "Product 6", price: 60, image: VegetablesImage, quantity: 9 },
    { id: 7, name: "Product 7", price: 70, image: VegetablesImage, quantity: 4 },
    { id: 8, name: "Product 8", price: 80, image: VegetablesImage, quantity: 0 }, // Out of stock product
];

const ProductCardList = () => {

    // Add all as a default subcategory
    const subCategories = useSelector((state) => {
        const selectedCategory = state.store.selectedCategory;
        const subCategoryList = selectedCategory ? selectedCategory.subcategories : [];
        return selectedCategory ? [defaultSubCategory, ...subCategoryList] : [defaultSubCategory];
    });

    const selectedSubCategory = useSelector((state) => {
        return state.store.selectedSubcategory;
    });

    const dispatch = useDispatch();

    const handleSelectSubCategory = (subCategory) => {
        dispatch(setSelectedSubCategory(subCategory));
    };

    const shoppingCart = useSelector((state) => {
        return state.store.shoppingCart;
    });

    const [showToast, setShowToast] = useState(false);
    const handleAddToCart = (product) => {
        if (product.quantity === 0) return; // Prevent adding out-of-stock items

        // Check if the product is already in the cart
        const existingProduct = shoppingCart.find((item) => item.id === product.id);

        if (existingProduct) {
            // Increment quantity if product is already in cart
            dispatch(setShoppingCart(shoppingCart.map(item =>
                item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
            )));
        } else {
            // Add product to cart with initial quantity 1
            dispatch(setShoppingCart([...shoppingCart, { ...product, cartQuantity: 1 }]));
        }
        setShowToast(true);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ textAlign: 'left', textTransform: 'uppercase', fontSize: '24px', margin: 0 }}>
                    Products
                </h2>
                <div>
                    {subCategories?.map((subCategory) => {
                        return (
                            <span
                                key={subCategory.name}
                                onClick={() => handleSelectSubCategory(subCategory)}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "15px",
                                    fontSize: "16px",
                                    color: selectedSubCategory?.name === subCategory.name ? "green" : "black",
                                }}
                            >
                                {subCategory.name}
                            </span>
                        )
                    })}
                </div>
            </div>
            <Row xs={2} md={3} lg={5} className="g-3">
                {products.map((product) => (
                    <Col key={product.id} className="d-flex justify-content-center">
                        <Card style={{ width: "100%", maxWidth: "350px" }}>
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{ height: "350px", objectFit: "cover" }}
                            />
                            <Card.Body className="p-2">
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text style={{ marginBottom: '5px' }}>Price: {product.price}</Card.Text>
                                {product.quantity === 0 ? (
                                    <Card.Text style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</Card.Text>
                                ) : (
                                    <Card.Text>Quantity: {product.quantity}</Card.Text>
                                )}
                                <Button
                                    variant={product.quantity === 0 ? "secondary" : "primary"}
                                    size="sm"
                                    disabled={product.quantity === 0}
                                    style={{
                                        backgroundColor: product.quantity === 0 ? "#d3d3d3" : "", // Light gray when disabled
                                        borderColor: product.quantity === 0 ? "#a9a9a9" : "", // Darker border for contrast
                                        color: product.quantity === 0 ? "#6c757d" : "", // Muted text color
                                        cursor: product.quantity === 0 ? "not-allowed" : "pointer", // Show "not-allowed" cursor when disabled
                                    }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ToastNotification
                message="Product added to cart!"
                showToast={showToast}
                position="top-end"
                onClose={() => setShowToast(false)}
            />
        </div >
    );
};

export default ProductCardList;
