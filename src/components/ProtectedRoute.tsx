
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
  const { isAuthenticated, hasSubscription } = useAuth();
  const location = useLocation();
  
  // Log authentication state to help debug routing issues
  console.log("Protected Route - Auth State:", { 
    isAuthenticated, 
    hasSubscription, 
    requireSubscription,
    path: location.pathname 
  });

  // If not authenticated, redirect to start page
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to /start");
    return <Navigate to="/start" state={{ from: location }} replace />;
  }

  // If subscription is required but user doesn't have one, redirect to subscription page
  if (requireSubscription && !hasSubscription) {
    console.log("No subscription, redirecting to paywall");
    return <Navigate to="/questionnaire/paywall" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
