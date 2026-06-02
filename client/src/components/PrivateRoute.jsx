import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  
  if (!token) {
    console.log('No token, redirecting to /admin/login');
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log('Token found, rendering admin component');
  return children;
};

export default PrivateRoute;