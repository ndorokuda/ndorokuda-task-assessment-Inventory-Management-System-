import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ProtectedRoutes = () => {
  // User Context
  const { token } = useContext(AppContext);
  return token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoutes;
