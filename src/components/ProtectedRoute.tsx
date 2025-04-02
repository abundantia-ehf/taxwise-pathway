
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
  
  // Development bypass flag - set to true while developing to skip auth checks
  const DEVELOPMENT_BYPASS = true;
  
  // Log authentication state to help debug routing issues
  console.log("Protected Route - Auth State:", { 
    isAuthenticated, 
    hasSubscription, 
    requireSubscription,
    path: location.pathname,
    bypassingForDevelopment: DEVELOPMENT_BYPASS
  });

  // In development mode, bypass authentication checks
  if (DEVELOPMENT_BYPASS) {
    console.log("Development mode: bypassing authentication checks");
    return <>{children}</>;
  }

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
