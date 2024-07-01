import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://localhost:7281/api/Employee/data');
        console.log('Employee Data:', response.data); // Debug log
        setEmployees(response.data);
      } catch (error) {
        console.error('There was an error fetching the employee data!', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Employee List
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="employee table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: '8px' }}>Employee ID</TableCell>
                <TableCell sx={{ padding: '8px' }} align="right">Employee Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.employeeID}>
                  <TableCell sx={{ padding: '8px' }} component="th" scope="row">
                    {employee.employeeID}
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }} align="right">{employee.employeeName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default EmployeeList;
