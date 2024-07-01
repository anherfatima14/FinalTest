import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ currentPath = '' }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
  };

  const renderButtons = () => {
    if (currentPath === '/login') {
      return (
        <>
          <Button color="inherit" onClick={() => navigate('/home')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        </>
      );
    }
    if (currentPath.startsWith('/employee')) {
      return (
        <>
          <Button color="inherit" onClick={() => navigate('/home')}>
            Home
          </Button>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      );
    }
    if (currentPath.startsWith('/employer')) {
      return (
        <>
          <Button color="inherit" onClick={() => navigate('/home')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/employer/register-employee')}>
            Register Employee
          </Button>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      );
    }
    if (currentPath.startsWith('/admin')) {
      return (
        <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ADMIN VIEW
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {renderButtons()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
