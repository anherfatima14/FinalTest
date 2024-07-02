import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';
import Navbar from './NavBar';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/Employee/data');
                setEmployee(response.data);
            } catch (error) {
                console.error("There was an error fetching the employee data!", error);
            }
        };

        fetchEmployeeData();
    }, []);

    const buttons = [
        { label: 'HOME', path: '/home' },
        { label: 'SIGN OUT', path: '/login' }
    ];

    if (!employee) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            
            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" component="div" gutterBottom>
                    THIS IS {employee.employeeName}
                </Typography>
                <Typography>
                    Description: {employee.employeeDescription}
                </Typography>
                <Typography>
                    Age: {employee.employeeAge}
                </Typography>
                <Typography>
                    Gender: {employee.employeeGender}
                </Typography>
                <img src={employee.imageURL} alt="Employee" style={{ marginTop: '20px', maxWidth: '100%' }} />
            </Box>
        </Container>
    );
};

export default EmployeeDashboard;
