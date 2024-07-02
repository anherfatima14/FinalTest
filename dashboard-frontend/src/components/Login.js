import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7281/api/auth/login', { username, password });
      const { role, message } = response.data;
      alert(message);
      if (role === 'Employee') navigate('/employee');
      if (role === 'Employer') navigate('/employer');
      if (role === 'Admin') navigate('/admin');
    } catch (error) {
      alert('Invalid credentials');
      console.error(error);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="div" gutterBottom>Login</Typography>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
        <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
      </Box>
    </Container>
  );
};

export default Login;
