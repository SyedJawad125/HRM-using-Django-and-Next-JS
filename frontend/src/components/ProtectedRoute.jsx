import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthCon } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useContext(AuthCon);

  if (token) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;


};

export default ProtectedRoute;