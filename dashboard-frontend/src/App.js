import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import EmployeeDashboard from './components/EmployeeDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import AdminDashboard from './components/AdminDashboard';
import EmployeeList from './components/EmployeeList';
import RegisterEmployee from './components/RegisterEmployee';
import Navbar from './components/NavBar';
import LoginInfo from './components/LoginInfo';


const App = () => {
  const NavbarWithPath = () => {
    const location = useLocation();
    return <Navbar currentPath={location.pathname} />;
  };

  return (
    <Router>
      <NavbarWithPath />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employer/show-employees" element={<EmployeeList />} />
        <Route path="/employer/register-employee" element={<RegisterEmployee />} />
        <Route path="/employer/show-employee-login-infos" element={<LoginInfo />} />

        
        
      </Routes>
    </Router>
  );
};

export default App;
