import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const LoadingModal = ({ show }) => {
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Body className="text-center">
                <Spinner animation="border" variant="primary" role="status" />
                <div className="mt-3">Loading, please wait...</div>
            </Modal.Body>
        </Modal>
    );
};

export default LoadingModal;
