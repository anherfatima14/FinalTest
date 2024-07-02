import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, AppBar, Toolbar, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [employers, setEmployers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get('https://localhost:7281/api/admin/employers');
        setEmployers(response.data);
      } catch (error) {
        console.error('There was an error fetching the employer data!', error);
      }
    };

    fetchEmployers();
  }, []);

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <Container>
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" component="div" gutterBottom>
        List of Employers
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employer ID</TableCell>
            <TableCell>Employer Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employers.map((employer) => (
            <TableRow key={employer.employerID}>
              <TableCell>{employer.employerID}</TableCell>
              <TableCell>{employer.employerName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Container>
  );
};

export default AdminDashboard;
