import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;