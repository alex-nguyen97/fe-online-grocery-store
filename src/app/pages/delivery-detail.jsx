import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const DeliveryDetail = ({ showModal, handleClose, handleSubmitOrder }) => {
    const [formData, setFormData] = useState({
        recipientName: '',
        address: '',
        city: '',
        state: '',
        mobileNumber: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

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
            if (!formData[key]) {
                formErrors[key] = `${key} is required`;
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Assuming there's a function to handle order submission
            handleSubmitOrder(formData);
        } else {
            setErrorMessage('Please fill out all fields correctly');
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delivery Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form onSubmit={handleSubmit}>
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
                            <option value="">Select a state</option>
                            <option value="NSW">New South Wales</option>
                            <option value="VIC">Victoria</option>
                            <option value="QLD">Queensland</option>
                            <option value="WA">Western Australia</option>
                            <option value="SA">South Australia</option>
                            <option value="TAS">Tasmania</option>
                            <option value="ACT">Australian Capital Territory</option>
                            <option value="NT">Northern Territory</option>
                            <option value="Other">Other</option>
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
                            pattern="^\d{10}$"
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
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => { }}>Close</Button>
                <Button variant="warning" onClick={() => { }}>Back to Cart</Button>
                <Button variant="success" type='submit'>Submit Order</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeliveryDetail;
