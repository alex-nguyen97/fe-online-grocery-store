import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setShoppingCartToggle } from "../storeSlice";

const ShoppingCart = () => {
    const [cart, setCart] = useState([]);
    const isShoppingCartOpen = useSelector((state) => { return state.store.isShoppingCartOpen });
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        const timeout = setTimeout(() => {
            localStorage.removeItem("shoppingCart");
        }, 20 * 60 * 1000); // 20 minutes
        return () => clearTimeout(timeout);
    }, [cart]);

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

    const clearCart = () => setCart([]);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const dispatch = useDispatch();
    const handleCloseShoppingCart = () => {
        dispatch(setShoppingCartToggle(false));
    }

    return (
        <div>
            <Modal show={isShoppingCartOpen} onHide={handleCloseShoppingCart}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.length > 0 ? (
                        <Table striped bordered hover>
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
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                                min="1"
                                            />
                                        </td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => removeItem(index)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseShoppingCart}>Close</Button>
                    <Button variant="warning" onClick={clearCart} disabled={cart.length === 0}>Clear Cart</Button>
                    <Button variant="success" disabled={cart.length === 0}>Order (${totalPrice.toFixed(2)})</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShoppingCart;
