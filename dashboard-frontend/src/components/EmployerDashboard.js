import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import Navbar from './NavBar';

const EmployerDashboard = () => {
  return (
    <Container>
      
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Employer Dashboard
        </Typography>
        <nav>
          <Link to="/employer/show-employees">Show List of Employees</Link> <br />
          <Link to="/employer/show-employee-login-infos">Show Login Info</Link>

        </nav>
      </Box>
    </Container>
  );
};

export default EmployerDashboard;
