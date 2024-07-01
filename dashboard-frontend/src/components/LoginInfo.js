import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Navbar from './NavBar';

const LoginInfo = () => {
  const [loginInfos, setLoginInfos] = useState([]);

  useEffect(() => {
    const fetchLoginInfos = async () => {
      try {
        const response = await axios.get('https://localhost:7281/api/Auth/employee-login-infos');
        console.log('Login Info Data:', response.data); // Debug log
        setLoginInfos(response.data);
      } catch (error) {
        console.error('There was an error fetching the login infos!', error);
      }
    };

    fetchLoginInfos();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Employee Login Information
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Login Date</TableCell>
              <TableCell>Logout Date</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loginInfos.map((info) => (
              <TableRow key={info.logID}>
                <TableCell>{info.employeeID}</TableCell>
                <TableCell>{info.loginDate}</TableCell>
                <TableCell>{info.logoutDate}</TableCell>
                <TableCell>{info.employeeName}</TableCell>
                <TableCell>{info.employeeDescription}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default LoginInfo;
