import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  console.log('[PrivateRoute] token exists:', !!token);
  return token ? children : <Navigate to="/admin/login" />;
};
export default PrivateRoute;