import { React, useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { defaultSubCategory, setProducts, setSelectedSubCategory, setShoppingCart } from "../storeSlice";
import ToastNotification from "./toast-notification";
import api from "../../api";

const ProductCardList = () => {

    // Add all as a default subcategory

    const selectedCategory = useSelector((state) => {
        return state.store.selectedCategory;
    });

    const subCategoryList = selectedCategory ? selectedCategory.subcategories : [];
    const subCategories = subCategoryList ? [defaultSubCategory, ...subCategoryList] : [defaultSubCategory];

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

    const [toast, setToast] = useState({
        message: "Product added to cart!",
        showToast: false,
        background: "success",
    });

    useEffect(() => {
        // Make the API call using the global api instance
        let params = {}
        if (selectedSubCategory === defaultSubCategory) {
            params = {
                category: selectedCategory.category_id,
            }
        }
        else {
            params = {
                sub_category: selectedSubCategory.sub_category_id,
            }
        }
        api.get('/products', {
            params: params
        })
            .then((response) => {
                dispatch(setProducts(response.data));
            })
            .catch((error) => {
                // setError('Error fetching products.');
            });
    }, [selectedCategory, selectedSubCategory]);

    const products = useSelector((state) => {
        return state.store.products;
    });

    const handleAddToCart = (product) => {
        if (product.quantity === 0) return; // Prevent adding out-of-stock items

        // Check if the product is already in the cart
        const existingProduct = shoppingCart.find((item) => item.id === product.id);

        if (existingProduct) {
            if (existingProduct.cartQuantity < product.quantity) {
                // Increment quantity if product is already in cart
                dispatch(setShoppingCart(shoppingCart.map(item =>
                    item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
                )));
                setToast({
                    message: "Product quantity updated in cart!",
                    showToast: true,
                    background: "success",
                });
            } else {
                // Prevent adding more than available quantity
                setToast({
                    message: "You have reached the maximum quantity for this product!",
                    showToast: true,
                    background: "danger",
                });
            }
        } else {
            // Add product to cart with initial quantity 1
            dispatch(setShoppingCart([...shoppingCart, { ...product, cartQuantity: 1 }]));
            setToast({
                message: "Product added to cart!",
                showToast: true,
                background: "success",
            });
        }
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
                                key={subCategory.sub_category_name}
                                onClick={() => handleSelectSubCategory(subCategory)}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "15px",
                                    fontSize: "16px",
                                    color: selectedSubCategory?.sub_category_name === subCategory.sub_category_name ? "green" : "black",
                                }}
                            >
                                {subCategory.sub_category_name}
                            </span>
                        )
                    })}
                </div>
            </div>
            <Row xs={2} md={3} lg={5} className="g-3">
                {products.map((product) => (
                    <Col key={product.id} className="d-flex justify-content-center">
                        <Card className="card-hover" style={{ width: "100%", maxWidth: "350px" }}>
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{ height: "350px", objectFit: "cover", padding: "30px" }}
                            />
                            <Card.Body className="p-2">
                                <Card.Title style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>{product.name}</Card.Title>
                                <Card.Text style={{ marginBottom: '5px' }}>Price: {product.price}$</Card.Text>
                                {product.quantity === 0 ? (
                                    <Card.Text style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</Card.Text>
                                ) : (
                                    <Card.Text>Quantity: {product.stock}</Card.Text>
                                )}
                                <Button
                                    variant={product.quantity === 0 ? "secondary" : "primary"}
                                    size="sm"
                                    disabled={product.quantity === 0}
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
                message={toast.message}
                showToast={toast.showToast}
                background={toast.background}
                position="bottom-end"
                onClose={() => setToast(
                    {
                        ...toast,
                        showToast: false
                    }
                )}
            />
        </div >
    );
};

export default ProductCardList;
