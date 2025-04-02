
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Loading component for Suspense fallback
import { Skeleton } from "@/components/ui/skeleton";

// Eager loading for critical paths
import LoadingPage from "./pages/LoadingPage";
import Welcome from "./pages/Welcome";
import Start from "./pages/Start";
import Learn from "./pages/Learn"; // Eagerly load the Learn component
import Paywall from "./pages/Paywall"; // Eagerly load the Paywall component
import SubscriptionPlan from "./pages/SubscriptionPlan"; // Eagerly load the new Subscription Plan page
import HomePage from "./pages/HomePage"; // Eagerly load HomePage for direct access
import Method from "./pages/Method"; // Eagerly load the new Method page

// Lazy loading for other routes
const OnboardingFeatures = React.lazy(() => import("./pages/OnboardingFeatures"));
const Proof = React.lazy(() => import("./pages/Proof"));
const PrePaywall = React.lazy(() => import("./pages/PrePaywall"));
const Questionnaire = React.lazy(() => import("./pages/Questionnaire"));
const ConfirmationScreen = React.lazy(() => import("./pages/questionnaire/ConfirmationScreen"));
const TaxRateScreen = React.lazy(() => import("./pages/questionnaire/TaxRateScreen"));
const PaywallScreen = React.lazy(() => import("./pages/questionnaire/PaywallScreen"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Onboarding = React.lazy(() => import("./pages/Onboarding"));
const Subscribe = React.lazy(() => import("./pages/Subscribe"));
const VideoPlayer = React.lazy(() => import("./pages/VideoPlayer"));
const Data = React.lazy(() => import("./pages/Data"));
const Advice = React.lazy(() => import("./pages/Advice"));
const Settings = React.lazy(() => import("./pages/Settings"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen p-6 flex flex-col">
    <Skeleton className="h-8 w-3/4 mb-4" />
    <Skeleton className="h-32 w-full mb-4" />
    <Skeleton className="h-4 w-5/6 mb-2" />
    <Skeleton className="h-4 w-4/6 mb-2" />
    <Skeleton className="h-4 w-3/6 mb-8" />
    <Skeleton className="h-40 w-full mb-4" />
    <Skeleton className="h-12 w-full mt-auto" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Initial route now redirects to home for development */}
                <Route path="/" element={<Navigate to="/home" />} />
                
                {/* Auth routes - still available but not enforced */}
                <Route path="/start" element={<Start />} />
                <Route path="/loading" element={<LoadingPage />} />
                
                {/* Public routes */}
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/onboarding-features" element={<OnboardingFeatures />} />
                <Route path="/method" element={<Method />} />
                <Route path="/proof" element={<Proof />} />
                <Route path="/prepaywall" element={<PrePaywall />} />
                <Route path="/paywall" element={<Paywall />} />
                <Route path="/subscription-plan" element={<SubscriptionPlan />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/questionnaire/confirmation" element={<ConfirmationScreen />} />
                <Route path="/questionnaire/tax-rate" element={<TaxRateScreen />} />
                <Route path="/questionnaire/paywall" element={<PaywallScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/subscribe" element={<Subscribe />} />
                
                {/* Make all routes accessible without protection during development */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/home-protected" element={<HomePage />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/video/:moduleId/:videoId" element={<VideoPlayer />} />
                <Route path="/data" element={<Data />} />
                <Route path="/advice" element={<Advice />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
