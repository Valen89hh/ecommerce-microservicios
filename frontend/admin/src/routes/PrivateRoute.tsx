import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import type { Role } from '../providers/AuthProvider';

interface PrivateRouteProps {
  allowedRoles?: Role[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // o un spinner elegante

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && (!user || !allowedRoles.includes(user.status))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
