import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setDeliveryDetailToggle, setShoppingCart, setShoppingCartToggle } from '../storeSlice';
import ToastNotification from './toast-notification';

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
        show: false,
        message: '',
        background: 'success',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setToast({
                show: true,
                message: "Order confirmed! A confirmation email has been sent.",
                background: 'success',
            });
            dispatch(setShoppingCart([])); // Clear the shopping cart
            dispatch(setDeliveryDetailToggle(false)); // Close the modal
        } else {
            setToast({
                show: true,
                message: "Order submission failed! Please check your details.",
                background: 'danger',
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

            <ToastNotification
                message={toast.message}
                showToast={toast.show}
                background={toast.background}
                position="bottom-end"
                onClose={() => setShowToast(false)}
            />
        </Modal>
    );
};

export default DeliveryDetail;
