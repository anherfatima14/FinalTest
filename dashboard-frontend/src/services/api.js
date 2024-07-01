import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7281/api'
});

export const login = (credentials) => api.post('/Auth/login', credentials);
export const fetchEmployees = () => api.get('/employee/data');
export const fetchLoginInfo = () => api.get('/logininfo');
export const registerEmployee = (employeeData) => api.post('/employee/register', employeeData);

export default api;
