import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({ message, showToast, onClose, delay = 1500, position = "top-center", background = "success" }) => {
    return (
        <ToastContainer position={position} className="position-fixed p-3">
            <Toast show={showToast} onClose={onClose} delay={delay} autohide bg={background}>
                <Toast.Body className={'text-white'}>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastNotification;
// Usage Example:
// <ToastNotification 
//     message="This is a toast notification!"
//     showToast={true}
//     onClose={() => console.log("Toast closed")}
//     delay={3000}
//     position="top-end"
// />   