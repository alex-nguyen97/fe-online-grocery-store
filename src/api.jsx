// src/api.js
import axios from 'axios';

// Access the API URL globally from the .env file
const apiUrl = import.meta.env.VITE_API_URL;
// Create an axios instance to handle requests
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Export the api instance for use in other parts of the app
export default api;
