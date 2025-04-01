import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setDeliveryDetailToggle, setShoppingCart, setShoppingCartToggle } from "../storeSlice";
import ToastNotification from "./toast-notification";

const ShoppingCart = () => {
    const shoppingCart = useSelector((state) => { return state.store.shoppingCart });
    const isShoppingCartOpen = useSelector((state) => { return state.store.isShoppingCartOpen });
    // useEffect(() => {
    //     const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
    //     if (savedCart) {
    //         setCart(savedCart);
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem("shoppingCart", JSON.stringify(cart));
    //     const timeout = setTimeout(() => {
    //         localStorage.removeItem("shoppingCart");
    //     }, 20 * 60 * 1000); // 20 minutes
    //     return () => clearTimeout(timeout);
    // }, [cart]);

    const updateQuantity = (index, quantity) => {
        if (quantity < 1) return;
        const newCart = [...cart];
        newCart[index].quantity = quantity;
        setCart(newCart);
    };

    const removeItem = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const totalPrice = shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const dispatch = useDispatch();
    const handleCloseShoppingCart = () => {
        dispatch(setShoppingCartToggle(false));
    }

    const clearCart = () => {
        setToastMessage("Cart cleared successfully!");
        setShowToast(true);
        dispatch(setShoppingCart([]))
    };

    const isCartEmpty = shoppingCart.length === 0;
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleOrderProducts = () => {
        dispatch(setShoppingCartToggle(false));
        dispatch(setDeliveryDetailToggle(true));
    }

    return (
        <div>
            <Modal show={isShoppingCartOpen} onHide={handleCloseShoppingCart} style={{ width: '100%', minWidth: '1000px' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowX: 'auto' }}>
                    {shoppingCart.length > 0 ? (
                        <Table striped bordered hover responsive="sm" style={{ maxWidth: '100%', width: '100%', tableLayout: 'fixed', overflowX: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shoppingCart?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>
                                                <input
                                                    style={{ width: '60px', textAlign: 'center' }}
                                                    type="number"
                                                    value={item.cartQuantity}
                                                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                                    min="1"
                                                />
                                            </td>
                                            <td>${(item.price * item.cartQuantity).toFixed(2)}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Button variant="danger" onClick={() => removeItem(index)} style={{ width: '100%', padding: '5px' }}>
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="warning"
                        onClick={clearCart}
                        disabled={isCartEmpty}>
                        Clear Cart
                    </Button>

                    <Button
                        variant="success"
                        disabled={isCartEmpty}
                        onClick={handleOrderProducts}>
                        Order (${totalPrice.toFixed(2)})
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastNotification
                message={toastMessage}
                showToast={showToast}
                position="bottom-end"
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default ShoppingCart;
