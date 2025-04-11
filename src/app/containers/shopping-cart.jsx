import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setDeliveryDetailToggle, setShoppingCart, setShoppingCartToggle } from "../storeSlice";
import ToastNotification from "./toast-notification";
import ConfirmModal from "./confirm-modal";

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
        const currentProduct = shoppingCart[index];
        // Check if the quantity is greater than the stock
        if (quantity > currentProduct.stock) {
            setToast({
                show: true,
                message: `There is no ${currentProduct.name} left in stock`,
                background: 'danger',
            });
            return;
        }
        // Check if the quantity is equal 0 = remove product
        if (quantity == 0) {
            removeItem(index)
            return;
        }
        // Check if the quantity is less than 0
        else if (quantity < 0) {
            return;
        }
        //Else update the quantity
        else {
            const newCart = shoppingCart.map((item, i) => {
                if (i === index) {
                    return { ...item, cartQuantity: quantity };
                }
                return item;
            }
            );
            dispatch(setShoppingCart(newCart));
            setToast({
                show: true,
                message: `${currentProduct.name} quantity updated to ${quantity}`,
                background: 'success',
            });
        }
    };

    const removeItem = (index) => {
        const newCart = shoppingCart.filter((_, i) => i !== index);
        setConfirmModal({
            show: true,
            title: "Remove Item",
            message: "Are you sure you want to remove this item from the cart?",
            onConfirm: () => {
                setConfirmModal({ ...confirmModal, show: false });
                dispatch(setShoppingCart(newCart));
            },
            onCancel: () => {
                setConfirmModal({ ...confirmModal, show: false });
            }
        });
    };

    const totalPrice = shoppingCart.reduce((acc, item) => {
        return acc + parseFloat(item.price) * item.cartQuantity;
    }, 0);

    const dispatch = useDispatch();
    const handleCloseShoppingCart = () => {
        dispatch(setShoppingCartToggle(false));
    }

    const clearCart = () => {
        setConfirmModal({
            show: true,
            title: "Remove Cart",
            message: "Are you sure you want to remove ALL items from the cart?",
            onConfirm: () => {
                setToast({
                    show: true,
                    message: "Cart cleared successfully!",
                    background: 'success',
                });
                dispatch(setShoppingCart([]))
                setConfirmModal({ ...confirmModal, show: false });
            },
            onCancel: () => {
                setConfirmModal({ ...confirmModal, show: false });
            }
        });

    };

    const isCartEmpty = shoppingCart.length === 0;
    const [toast, setToast] = useState({
        show: false,
        message: '',
        background: 'success',
    });

    const handleOrderProducts = () => {
        dispatch(setShoppingCartToggle(false));
        dispatch(setDeliveryDetailToggle(true));
    }

    const [confirmModal, setConfirmModal] = useState({
        show: false,
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null
    });

    return (
        <div>
            <Modal show={isShoppingCartOpen} onHide={handleCloseShoppingCart} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {shoppingCart.length > 0 ? (
                        <Table striped bordered hover responsive="sm" style={{ maxWidth: '100%', width: '100%', tableLayout: 'fixed', overflowX: 'auto' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '200px' }}>Item</th>
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
                                            <td style={{ width: '200px' }}>{item.name}</td>
                                            <td>${item.price}</td>
                                            <td>
                                                <input
                                                    style={{ width: '60px', textAlign: 'center' }}
                                                    type="number"
                                                    value={item.cartQuantity}
                                                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                                    min="0"
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
                message={toast.message}
                showToast={toast.show}
                position="bottom-end"
                background={toast.background}
                onClose={() => setToast({ ...toast, show: false })} // Close toast notification
            />
            <ConfirmModal
                show={confirmModal.show}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={confirmModal.onConfirm}
                onCancel={confirmModal.onCancel}
            />
        </div>
    );
};

export default ShoppingCart;
