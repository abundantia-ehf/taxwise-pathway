
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireSubscription = false
}: ProtectedRouteProps) => {
  const { hasSubscription } = useAuth();
  const location = useLocation();

  // If subscription is required but user doesn't have one, redirect to subscription page
  if (requireSubscription && !hasSubscription) {
    return <Navigate to="/subscribe" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
