import { useState, useEffect } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import api from '../../api';
import { useDispatch } from 'react-redux';
import { setProducts } from '../storeSlice';// Replace with your actual action

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchQuery.trim()) {
                // Make an API call to search products by name
                api.get('/products', {
                    params: {
                        search: searchQuery,  // Send the search query to the backend
                    }
                })
                    .then((response) => {
                        dispatch(setProducts(response.data)); // Store the products in the Redux state
                    })
                    .catch((error) => {
                        console.error('Error fetching products:', error);
                    });
            } else {
                // Optionally, you can reset the products list or fetch all products
                api.get('/products')
                    .then((response) => {
                        dispatch(setProducts(response.data)); // Fetch all products if search is empty
                    })
                    .catch((error) => {
                        console.error('Error fetching products:', error);
                    });
            }
        }, 300); // 500ms debounce duration

        return () => {
            clearTimeout(debounceTimer); // Clear the previous timeout if the user types again
        };
    }, [searchQuery, dispatch]); // Effect will run whenever searchQuery changes

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
                />
            </InputGroup>
        </div>
    );
};

export default SearchBar;
