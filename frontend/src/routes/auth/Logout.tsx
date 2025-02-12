import { useAuth } from '../../component/AuthProvider';

const Logout = () => {
  useAuth().signout();
  return null; // This component doesn't render anything
};

export default Logout;
