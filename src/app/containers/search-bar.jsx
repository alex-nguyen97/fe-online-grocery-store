import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
            <InputGroup style={{ width: '60%', borderRadius: '50px', overflow: 'hidden' }}>
                <Form.Control
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                    placeholder="Search by product name..."
                    aria-label="Search"
                    style={{ borderRadius: '50px' }}
                    onKeyDown={handleKeyDown}
                />
            </InputGroup>
        </div>
    );
}

export default SearchBar;
