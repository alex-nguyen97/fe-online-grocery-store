import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = () => {
    return (
        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
            <InputGroup style={{ width: '60%', borderRadius: '50px', overflow: 'hidden' }}>
                <Form.Control
                    placeholder="Search..."
                    aria-label="Search"
                    style={{ borderRadius: '50px' }}
                />
            </InputGroup>
        </div>
    );
};

export default SearchBar;
