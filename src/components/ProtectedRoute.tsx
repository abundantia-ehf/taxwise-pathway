
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  requireOnboarding?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireSubscription = false,
  requireOnboarding = false
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasSubscription, user } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If onboarding is required but not completed, redirect to onboarding
  if (requireOnboarding && user && !user.onboardingCompleted) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  // If subscription is required but user doesn't have one, redirect to subscription page
  if (requireSubscription && !hasSubscription) {
    return <Navigate to="/subscribe" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
