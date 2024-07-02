import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const RegisterEmployee = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeDescription, setEmployeeDescription] = useState('');
  const [employeeAge, setEmployeeAge] = useState('');
  const [employeeGender, setEmployeeGender] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const employee = {
      employeeID: 0,
      employeeName,
      employeeDescription,
      employeeAge: parseInt(employeeAge),
      employeeGender,
      imageURL,
      password,
    };

    try {
      const response = await axios.post('https://localhost:7281/api/auth/register', employee);
      alert(response.data.message);
    } catch (error) {
      console.error('There was an error registering the employee!', error);
      alert('Error registering employee');
    }
  };

  const handleClear = () => {
    setEmployeeName('');
    setEmployeeDescription('');
    setEmployeeAge('');
    setEmployeeGender('');
    setImageURL('');
    setPassword('');
  };

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Register Employee
        </Typography>
        <TextField
          label="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Employee Description"
          value={employeeDescription}
          onChange={(e) => setEmployeeDescription(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Employee Age"
          value={employeeAge}
          onChange={(e) => setEmployeeAge(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Employee Gender"
          value={employeeGender}
          onChange={(e) => setEmployeeGender(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
         <TextField
          label="Password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          sx={{ mt: 2 }}
        />
        <TextField
          label="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterEmployee;
