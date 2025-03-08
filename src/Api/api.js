import axios from 'axios';

const DEPLOYED = 'http://3.108.65.7';
const LOCALHOST = 'http://localhost:5454';

// Switch between deployed and localhost based on environment
export const API_BASE_URL = DEPLOYED; // Change to LOCALHOST if testing locally

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Retrieve token from local storage
const token = localStorage.getItem('jwt');

// ✅ Fix: Correct syntax for Authorization header
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Set default Content-Type for POST requests
api.defaults.headers.post['Content-Type'] = 'application/json';

// ✅ Fix: Correct variable name for export
export default api;
