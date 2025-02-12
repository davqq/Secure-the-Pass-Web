import { Navigate } from 'react-router-dom';
import { useAuth } from '../component/AuthProvider';

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/accounts" /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
