import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import type React from 'react';

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PublicRoute;
