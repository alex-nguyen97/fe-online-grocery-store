import React, { useState } from 'react';
import { Modal, Form, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setDeliveryDetailToggle, setProducts, setShoppingCart, setShoppingCartToggle } from '../storeSlice';
import ToastNotification from './toast-notification';
import api from '../../api';
import LoadingModal from './loading-modal';

const DeliveryDetail = () => {
    const [formData, setFormData] = useState({
        recipientName: '',
        address: '',
        city: '',
        state: '',
        mobileNumber: '',
        email: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        // Validate required fields
        Object.keys(formData).forEach((key) => {
            const formattedKey = key
                .replace(/([A-Z])/g, ' $1')   // Add space before capital letters
                .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
            if (!formData[key]) {
                formErrors[key] = `${formattedKey} is required`;
                isValid = false;
            }
        });

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailPattern.test(formData.email)) {
            formErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Mobile number validation (for 10 digit number)
        const mobilePattern = /^\d{10}$/;
        if (formData.mobileNumber && !mobilePattern.test(formData.mobileNumber)) {
            formErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const [toast, setToast] = useState({
        showToast: false,
        message: '',
        background: 'success',
    });

    const shoppingCart = useSelector((state) => {
        return state.store.shoppingCart;
    });

    const allProducts = useSelector((state) => {
        return state.store.products;
    });

    const [showLoading, setShowLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { recipientName, address, city, state, mobileNumber, email } = formData;

        const totalPrice = shoppingCart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
        const cartProducts = shoppingCart.map(item => ({
            product_id: item.product_id,
            quantity: item.cartQuantity,
        }));
        const orderData = {
            delivery: {
                recipient_name: recipientName,
                address_street: address,
                city_suburb: city,
                state_territory: state,
                mobile_number: mobileNumber,
                email: email,
            },
            order: {
                user_id: 1, // Set this default as we don't have user authentication yet
                status: 'pending', // Default status
                payment_method: 'credit_card',  // Default payment method
                total_price: totalPrice,
            },
            products: cartProducts,
        };
        if (validateForm()) {
            setShowLoading(true);
            api.post('/orders/create', orderData)
                .then((response) => {
                    setShowLoading(false);
                    setToast({
                        showToast: true,
                        message: "Order confirmed! A confirmation email has been sent.",
                        background: 'success',
                    });
                    dispatch(setShoppingCart([])); // Clear the shopping cart
                    dispatch(setDeliveryDetailToggle(false)); // Close the modal
                    const updatedProducts = response.data.data.products;
                    // Create a map for quick lookup
                    const updatedMap = new Map(updatedProducts.map(p => [p.product_id, p]));

                    // Create a new list with updates applied
                    const newProducts = allProducts.map(product =>
                        updatedMap.has(product.product_id)
                            ? { ...product, ...updatedMap.get(product.product_id) } // merge updates
                            : product
                    );
                    dispatch(setProducts(newProducts));
                })
                .catch((error) => {
                    if (error.response) {
                        setShowLoading(false);
                        setToast({
                            showToast: true,
                            message: "Error: " + error.response.data.message,
                            background: 'danger',
                        });
                    }
                });
        }
    };

    const showModal = useSelector((state) => {
        return state.store.isDeliveryDetailOpen;
    });

    const dispatch = useDispatch();
    const handleCloseModal = () => {
        dispatch(setDeliveryDetailToggle(false));
    }
    const handleBackToCart = () => {
        handleCloseModal();
        dispatch(setShoppingCartToggle(true));
    }

    const states = [
        { value: "", label: "Select a state" },
        { value: "NSW", label: "New South Wales" },
        { value: "VIC", label: "Victoria" },
        { value: "QLD", label: "Queensland" },
        { value: "WA", label: "Western Australia" },
        { value: "SA", label: "South Australia" },
        { value: "TAS", label: "Tasmania" },
        { value: "ACT", label: "Australian Capital Territory" },
        { value: "NT", label: "Northern Territory" },
        { value: "Other", label: "Other" },
    ];

    return (
        <Container>


            <Modal show={showModal} onHide={handleCloseModal}>
                <Form onSubmit={handleSubmit} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title>Delivery Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="recipientName">
                            <Form.Label>Recipient's Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="recipientName"
                                value={formData.recipientName}
                                onChange={handleChange}
                                isInvalid={!!errors.recipientName}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.recipientName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="address">
                            <Form.Label>Street Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                isInvalid={!!errors.address}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Label>City/Suburb</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                isInvalid={!!errors.city}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="state">
                            <Form.Label>State/Territory</Form.Label>
                            <Form.Control
                                as="select"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                isInvalid={!!errors.state}
                                required
                            >
                                {states.map((state) => (
                                    <option key={state.value} value={state.value}>
                                        {state.label}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.state}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="mobileNumber">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                isInvalid={!!errors.mobileNumber}
                                required
                                placeholder="e.g. 0412345678"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.mobileNumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { }}>Close</Button>
                        <Button variant="warning" onClick={() => handleBackToCart()}>Back to Cart</Button>
                        <Button variant="success" type="submit">
                            Submit Order
                        </Button>
                    </Modal.Footer>
                </Form>


            </Modal>
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
            <LoadingModal show={showLoading} />
        </Container>
    );
};

export default DeliveryDetail;
