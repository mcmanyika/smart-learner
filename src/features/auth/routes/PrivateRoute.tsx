import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Store the attempted URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}