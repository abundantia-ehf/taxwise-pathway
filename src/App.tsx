
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import LoadingPage from "./pages/LoadingPage";
import Welcome from "./pages/Welcome";
import OnboardingFeatures from "./pages/OnboardingFeatures";
import Questionnaire from "./pages/Questionnaire";
import ConfirmationScreen from "./pages/questionnaire/ConfirmationScreen";
import TaxRateScreen from "./pages/questionnaire/TaxRateScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Subscribe from "./pages/Subscribe";
import Learn from "./pages/Learn";
import VideoPlayer from "./pages/VideoPlayer";
import AIHelp from "./pages/AIHelp";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/subscribe" element={<Subscribe />} />
              
              {/* Protected routes requiring subscription */}
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
                path="/support" 
                element={
                  <ProtectedRoute requireSubscription>
                    <Support />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
