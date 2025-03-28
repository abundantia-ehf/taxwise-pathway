
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

// Lazy loading for other routes
const OnboardingFeatures = React.lazy(() => import("./pages/OnboardingFeatures"));
const Questionnaire = React.lazy(() => import("./pages/Questionnaire"));
const ConfirmationScreen = React.lazy(() => import("./pages/questionnaire/ConfirmationScreen"));
const TaxRateScreen = React.lazy(() => import("./pages/questionnaire/TaxRateScreen"));
const PaywallScreen = React.lazy(() => import("./pages/questionnaire/PaywallScreen"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Onboarding = React.lazy(() => import("./pages/Onboarding"));
const Subscribe = React.lazy(() => import("./pages/Subscribe"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const Learn = React.lazy(() => import("./pages/Learn"));
const VideoPlayer = React.lazy(() => import("./pages/VideoPlayer"));
const AIHelp = React.lazy(() => import("./pages/AIHelp"));
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
                {/* Initial route redirects to loading */}
                <Route path="/" element={<Navigate to="/loading" />} />
                
                {/* Loading page */}
                <Route path="/loading" element={<LoadingPage />} />
                
                {/* Public routes */}
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/onboarding-features" element={<OnboardingFeatures />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/questionnaire/confirmation" element={<ConfirmationScreen />} />
                <Route path="/questionnaire/tax-rate" element={<TaxRateScreen />} />
                <Route path="/questionnaire/paywall" element={<PaywallScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/subscribe" element={<Subscribe />} />
                
                {/* Protected routes requiring subscription */}
                <Route 
                  path="/home" 
                  element={
                    <ProtectedRoute requireSubscription>
                      <HomePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/learn" 
                  element={
                    <ProtectedRoute requireSubscription>
                      <Learn />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/video/:moduleId/:videoId" 
                  element={
                    <ProtectedRoute requireSubscription>
                      <VideoPlayer />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/ai-help" 
                  element={
                    <ProtectedRoute requireSubscription>
                      <AIHelp />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advice" 
                  element={
                    <ProtectedRoute requireSubscription>
                      <Advice />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                
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
